const est = require('../Model/Estante');
const exm = require('../Model/Exemplar');

let list = null;
let qtd_aux = null;
let login;

const getAll = async (req, res) => {
  try {
    if (req.session.Acesso != undefined) {
      login = { Nome: req.session.Nome, Acesso: req.session.Acesso };
      list = await est.getAll();
      let list2 = await est.getMaiorQtd();
      list = merge(list, list2);
      let = flag = false;
      return res.status(200).render('BEstante/BEstante', { list, flag, login });
    }
    return res.status(200).render('login', { mensagem: '' });
  }
  catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 500' });
  }
};

function merge(list, list2) {
  let lista = [];
  for (let i = 0; i < list.length; i++) {
    lista.push({ Id_Estante: list[i].Id_Estante, Descricao: list[i].Descricao, Qtd: '' });
    for (let y = 0; y < list2.length; y++) {
      if (list[i].Id_Estante == list2[y].Id_Estante) {
        lista[i].Qtd = list2[y].Descricao;
      }
    }
  }
  return lista;
}

const create = async (req, res) => {
  try {
    if (req.body.Descricao == '' || req.body.Qtd == '') {
      console.log("inf obrigatória invalida");
      let flag = true;
      return res.status(200).render('BEstante/BEstante', { list, flag });
    }
    else {
      await est.create(req.body);
      return res.status(200).redirect("/estantes/");
    }
  } catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 500' });
  }
};

const getById = async (req, res) => {
  try {
    const estante = await est.getById(req.params.id);
    const qtd = await est.getByIdQtd(req.params.id);
    let pratmin = await est.getMinPrat();
    let min = [];

    for (let i = 0; i < pratmin.length; i++)
      if (pratmin[i].Id_Estante == estante[0].Id_Estante)
        min = pratmin[i];

    qtd_aux = Number(qtd[0].Descricao);//qtd maxima de prateleiras da estante
    return res.status(200).render('BEstante/BEstanteALT', { estante, qtd, list, excluir: min.length, min, login });
  } catch (error) {
    return res.status(500).render('errors/error', { error: 'ERROR 404' });
  }
};

const alter = async (req, res) => {
  try {
    if (req.body.Descricao == '' || req.body.Qtd == '' || req.body.Qtd == '0') {
      console.log("inf obrigatória invalida");
    }
    else {
      if (Number(req.body.Qtd) > qtd_aux)
        await est.alter(req.body, req.params.id, qtd_aux);
      else
        await est.alter2(req.body, req.params.id, qtd_aux);
      return res.status(200).redirect("/estantes/");
    }
  } catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 404' });
  }
};

const delById = async (req, res) => {
  try {
    console.log(req.params.id)
    await est.delById(req.params.id);
    return res.status(200).redirect("/estantes/");
  } catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 500' });
  }
};

const pesq = async (req, res) => {
  try {
    list = await est.pesq(req.query.Pesq, req.query.rbpesq);
    let list2 = await est.getQtd();
    list = merge(list, list2);
    return res.status(200).render('BEstante/BEstante', { list, login });
  }
  catch (error) {
    return res.status(500).render('errors/error', { error: 'ERROR 500' });
  }
}

module.exports = {
  getAll,
  getById,
  pesq,
  delById,
  alter,
  create
};