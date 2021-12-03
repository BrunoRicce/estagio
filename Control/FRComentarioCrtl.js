const titu = require('../Model/Titulo');
const aut = require('../Model/Autor');
const edi = require('../Model/Editora');
const asu = require('../Model/Assunto');
const exm = require('../Model/Exemplar');
const as = require('../Model/Anoserie');
const prof = require('../Model/Professor');
const requi = require('../Model/Requisicao');
const comen = require('../Model/Comentario');

let list = null;
let laut = null;
let ledi = null;
let lasu = null;
let qtd_aux = null;
let login = null;
let hoje = null;
let erro = "";
let anse = null;
let titulo;

const getAll = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {

            login = { ID: req.session.ID, Nome: req.session.Nome, Acesso: req.session.Acesso };
            list = await titu.getAll();
            laut = await aut.getAll();
            ledi = await edi.getAll();
            lasu = await asu.getAll();
            list = await merge(list);
            anse = await getAnoSerie();
            return res.status(200).render('FRComentario/FRComentario', { list, laut, ledi, lasu, login, anse });
        }
        return res.status(200).render('login', { mensagem: '' });
    }
    catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
};

async function merge(list) {//lista de tituloa
    let lista = [];
    for (let i = 0; i < list.length; i++) {

        let autor = await titu.getAutorById(list[i].Id_Titulo);
        //console.log(autor[0]);
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
        console.log(titulo)
        lista.push({ Id_Titulo: titulo[0].Id_Titulo, Id_Editora: titulo[0].Id_Editora, Titulo: titulo[0].Titulo, Ano_Publicacao: titulo[0].Ano_Publicacao, Qtd_total: titulo[0].Qtd_total, Qtd_Disponivel: titulo[0].Qtd_Disponivel });
    }
    return lista;//returna lista de titulos do autor/assunto
}

const create = async (req, res) => {
    erro = "";
    if (req.body.Comentario != "") {
        if (req.session.Acesso > 0)
            comen.create(req.body.ID, null, login.ID, req.body.Visibilidade, req.body.Comentario, req.body.dtAtu)//Id_Titulo, Id_Aluno, Id_Professor, Visivel, Comentário, Dt_Publicacao
        else
            comen.create(req.body.ID, login.ID, null, req.body.Visibilidade, req.body.Comentario, req.body.dtAtu)
    }
    else {
        erro = "*INFORME UM COMENTÁRIO*"
        return res.status(200).render('FRComentario/FRComentarioInfo', { list, laut, ledi, lasu, titulo, login, hoje, erro, anse });
    }

    return res.status(200).render('FRComentario/FRComentario', { list, laut, ledi, lasu, login, anse });
}

const pesq = async (req, res) => {

    if (req.query.rbpesq == 'Rbautor') {
        let autor = await aut.pesq(req.query.Pesq);
        autor = await titu.getAutor(autor[0].Id_Autor);
        list = await merge2(autor);
    }
    else
        if (req.query.rbpesq == 'Rbass') {
            let assunto = await asu.pesq(req.query.Pesq);
            assunto = await titu.getAssunto(assunto[0].Id_Assunto);
            console.log(assunto)
            list = await merge2(assunto);
        }
        else
            list = await titu.pesq(req.query.Pesq);

    list = await merge(list);
    return res.status(200).render('FRComentario/FRComentario', { list, laut, ledi, lasu, login });
}

async function dataAtual() {
    hoje = new Date();
    let dd = String(hoje.getDate()).padStart(2, '0');
    let mm = String(hoje.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = hoje.getFullYear();

    hoje = yyyy + '-' + mm + '-' + dd;
}

const getById = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {
            let ti = await titu.getById(req.params.id);
            titulo = await merge(ti);
            await dataAtual();

            return res.status(200).render('FRComentario/FRComentarioInfo', { list, laut, ledi, lasu, titulo, login, hoje, erro, anse });
        }
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
};

const delById = async (req, res) => {
    try {

        await titu.delAutorById(req.params.id);
        await exm.delByTituloId(req.params.id);
        await titu.delAssuntoById(req.params.id);
        await titu.delById(req.params.id);
        return res.status(200).redirect("/titulos/");
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
};

async function getAnoSerie() {
    let list2 = await as.getAll();
    let list3 = await as.getAllTurma();
    list2 = mergeSerTur(list2, list3);
    return list2;
}

function mergeSerTur(list, list2) {
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

module.exports = {
    getAll,
    create,
    pesq,
    getById,
    delById
};