const exm = require('../Model/Exemplar');
const titu = require('../Model/Titulo');
const est = require('../Model/Estante');

const aut = require('../Model/Autor');
const edi = require('../Model/Editora');
const asu = require('../Model/Assunto');
//tombo
let list = null;
let ltitu = null;
let lest = null;
let lprat = null;

let laut = null;
let ledi = null;
let lasu = null;

//let select = document.getElementById('titulo');

const getAll = async (req, res) => {
    try {
    ltitu = await titu.getAll();
    lest = await est.getAll();
    lprat = await est.getQtd();
    console.log(lprat);
    console.log(lest);
    lest = estPrat(lest, lprat);
    return res.status(200).render('BExemplar/BExemplar', { ltitu, lest });
    } 
    catch (error) {
      return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
};

function estPrat(list, list2)//merge de estante + prateleira
{
    let lista = [];
    for (let i = 0; i < list.length; i++) {
        lista.push({ Id_Estante: list[i].Id_Estante, Id_Prateleira: list[i].Id_Prateleira, Qtd: list[i].Descricao, Descricao: '' });
        for (let y = 0; y < list2.length; y++) {
            if (list[i].Id_Estante == list2[y].Id_Estante) {
                lista[i].Qtd = list2[y].Descricao;
            }
        }
    }
    return lista;
}

// select.addEventListener('change', function () {
//     var selecionada = this.options[this.selectedIndex];
//     console.log("selecionada: " + selecionada);
//     // var url = selecionada.getAttribute('data-url');
//     // if (url) window.location = url;
// });

async function merge(list) {//lista de tituloa
    let lista = [];
    for (let i = 0; i < list.length; i++) {
        let autor = await titu.getAutorById(list[i].Id_Titulo);
        let assunto = await titu.getAssuntoById(list[i].Id_Titulo);
        autor = await aut.getById(autor[0].Id_Autor);
        assunto = await asu.getById(assunto[0].Id_Assunto);
        let editora = await edi.getById(list[i].Id_Editora);

        lista.push({ Id_Titulo: list[i].Id_Titulo, Id_Editora: list[i].Id_Editora, Editora: editora[0].Nome, Titulo: list[i].Titulo, Ano_Publicacao: list[i].Ano_Publicacao, Qtd_total: list[i].Qtd_total, Qtd_Disponivel: list[i].Qtd_Disponivel, Id_Autor: autor[0].Id_Autor, Autor: autor[0].Nome, Id_Assunto: assunto[0].Id_Assunto, Assunto: assunto[0].Nome });
    }
    return lista;//retorna a mege de ista de titulos com assuntos e autores
}

async function merge2(list) {//lista de autores/assuntos do titulo
    let lista = [];
    for (let i = 0; i < list.length; i++) {
        let titulo = await titu.getById(list[i].Id_Titulo);
        lista.push({ Id_Titulo: titulo[i].Id_Titulo, Id_Editora: titulo[i].Id_Editora, Titulo: titulo[i].Titulo, Ano_Publicacao: titulo[i].Ano_Publicacao, Qtd_total: titulo[i].Qtd_total, Qtd_Disponivel: titulo[i].Qtd_Disponivel });
    }
    return lista;//returna lista de titulos do autor/assunto
}

const create = async (req, res) => {
    try {
    if (req.body.Titulo == '' || req.body.Anop == '' || req.body.Qtd == '' || req.body.Autor == '' || req.body.Assunto == '' || req.body.Editora == '') {
        //alert("Os campos Nome, RA, Ano e Série são obrigatórios");
        // document.getElementById("baNome").innerHTML += " *obrigatório";
        // document.getElementById("baNome").setAttribute("style", "color:red");
        console.log("inf obrigatória invalida");
    }
    else {
        await titu.create(req.body);
        return res.status(200).redirect("/titulos/");
    }
    } catch (error) {
      return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
}

const pesq = async (req, res) => {
try{
    if (req.query.rbpesq == 'Rbautor') {
        let autor = await aut.pesq(req.query.Pesq);
        autor = await titu.getAutor(autor[0].Id_Autor);
        list = await merge2(autor);
    }
    else
        if (req.query.rbpesq == 'Rbass') {
            let assunto = await asu.pesq(req.query.Pesq);
            assunto = await titu.getAssunto(assunto[0].Id_Assunto);
            list = await merge2(assunto);
        }
        else
            list = await titu.pesq(req.query.Pesq);

    list = await merge(list);

    return res.status(200).render('BTitulo/BTitulo', { list, laut, ledi, lasu });
} catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 404' });
  }
}

const getById = async (req, res) => {
    try {
    let titulo = await titu.getById(req.params.id);
    titulo = await merge(titulo);
    //var thedate = new Date(Date.parse("2011-07-14 11:23:00"));
    console.log(titulo);
    qtd_aux = Number(titulo[0].Qtd_total);
    return res.status(200).render('BTitulo/BTituloALT', { list, laut, ledi, lasu, titulo });
    } catch (error) {
      return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
};

const alter = async (req, res) => {
    try {
    let qtdd = Number(req.body.Qtd);
    let dis = Number(req.body.Qtddis);
    if (req.body.Titulo == '' || req.body.Anop == '' || req.body.Qtd == '' || req.body.Autor == '' || req.body.Assunto == '' || req.body.Editora == '' || qtdd < dis || qtdd < 0) {
        //alert("Os campos Nome, RA, Ano e Série são obrigatórios");
        // document.getElementById("baNome").innerHTML += " *obrigatório";
        // document.getElementById("baNome").setAttribute("style", "color:red");
        console.log("inf obrigatória invalida");
    }
    else {
        await titu.delAssuntoById(req.params.id);
        await titu.delAutorById(req.params.id);
        await titu.alter(req.body, req.params.id, qtd_aux);
        return res.status(200).redirect("/titulos/");
    }
    } catch (error) {
      return res.status(500).render('errors/error', { error: ' ERROR 404' });
    }
};

const delById = async (req, res) => {
    try {
    await titu.delAutorById(req.params.id);
    await titu.delAssuntoById(req.params.id);
    await titu.delById(req.params.id);
    return res.status(200).redirect("/titulos/");
    } catch (error) {
      return res.status(500).render('errors/error', { error: ' ERROR 404' });
    }
};

module.exports = {
    getAll,
    create,
    pesq,
    getById,
    alter,
    delById
};