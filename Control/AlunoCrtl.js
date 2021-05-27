const alu = require('../Model/Aluno');
const as = require('../Model/Anoserie');
let alunos = null;
let list = null;

const getAll = async (req, res) => {
  //try {
  list = await getAnoSerie();//lista de anoserie e turma com merge
  alunos = await alu.getAll();
  alunos = mergeAluAS(alunos, list);
  return res.status(200).render('BAluno/BAlunoINS', { alunos, list });
  //} 
  // catch (error) {
  //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
  // }
};

function mergeAluAS(list, list2) {
  let lista = [];
  for (let i = 0; i < list.length; i++) {
    lista.push({
      Id_Aluno: list[i].Id_Aluno, Nome: list[i].Nome, Senha: list[i].Senha,
      Telefone: list[i].Telefone, Email: list[i].Email, Endereco: list[i].Endereco,
      RA: list[i].RA, Estado: list[i].Estado, Id_AnoSerie: list[i].Id_AnoSerie, AnoSerie: '', Turma: ''
    });
    for (let y = 0; y < list2.length; y++) {
      if (list[i].Id_AnoSerie == list2[y].Id_AnoSerie) {
        lista[i].Turma = list2[y].Turma;
        lista[i].AnoSerie = list2[y].AnoSerie;
      }
    }
  }
  return lista;
}

function merge(list, list2) {
  let lista = [];
  for (let i = 0; i < list.length; i++) {
    lista.push({ Id_AnoSerie: list[i].Id_AnoSerie, AnoSerie: list[i].AnoSerie, Id_Turma: list[i].Id_Turma, Turma: '', Id_Aluno: list[i].Id_Aluno });
    for (let y = 0; y < list2.length; y++) {
      if (list[i].Id_Turma == list2[y].Id_Turma) {
        lista[i].Turma = list2[y].Turma;
      }
    }
  }
  return lista;
}

async function getAnoSerie() {
  list = await as.getAll();
  let list2 = await as.getAllTurma();
  list = merge(list, list2);
  return list;
}

const delById = async (req, res) => {
  //try {
  await alu.delById(req.params.id);
  return res.status(200).redirect("/alunos/");
  // } catch (error) {
  //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
  // }
};

const getById = async (req, res) => {
  //try {
  let aluno = await alu.getById(req.params.id);
  aluno = mergeAluAS(aluno,list);
  return res.status(200).render('BAluno/BAlunoALT', { aluno, alunos, list });
  // } catch (error) {
  //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
  // }
};

const create = async (req, res) => {
  //try {
  if (req.body.Nome == '' || req.body.RA == '' || req.body.Anoserie == '') {
    //alert("Os campos Nome, RA, Ano e Série são obrigatórios");
    // document.getElementById("baNome").innerHTML += " *obrigatório";
    // document.getElementById("baNome").setAttribute("style", "color:red");
    console.log("inf obrigatória invalida");
  }
  else {
    if (req.body.Senha == '')
      req.body.Senha = Math.floor(Math.random() * 100000) + 10000;
    await alu.create(req.body);
    return res.status(200).redirect("/alunos/");
  }
  // } catch (error) {
  //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
  // }
};

const alter = async (req, res) => {
  //try {
  if (req.body.Nome == '' || req.body.RA == '' || req.body.Senha == '') {
    //alert("Os campos Nome, RA, Ano e Série são obrigatórios");
    // document.getElementById("baNome").innerHTML += " *obrigatório";
    // document.getElementById("baNome").setAttribute("style", "color:red");
    console.log("inf obrigatória invalida");
  }
  else {
    await alu.alter(req.body, req.params.id);
    return res.status(200).redirect("/alunos/");
  }
  // } catch (error) {
  //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
  // }
};

const pesq = async (req, res) => {
  alunos = await alu.pesq(req.query.Pesq, req.query.rbpesq);
  list = await getAnoSerie();

  alunos = mergeAluAS(alunos, list);
  return res.status(200).render('BAluno/BAlunoINS', { alunos, list });
}

module.exports = {
  getAll,
  getById,
  delById,
  create,
  alter,
  pesq
};