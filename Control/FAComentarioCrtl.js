const titu = require('../Model/Titulo');
const aut = require('../Model/Autor');
const edi = require('../Model/Editora');
const asu = require('../Model/Assunto');
const exm = require('../Model/Exemplar');
const as = require('../Model/Anoserie');
const prof = require('../Model/Professor');
const requi = require('../Model/Requisicao');
const comen = require('../Model/Comentario');
const alu = require('../Model/Aluno');

let list = null;
let laut = null;
let ledi = null;
let lasu = null;
let login = null;
let hoje = null;
let erro = "";
let erroEstado = "";
let anse = null;
let comentario;

const getAll = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {

            login = { ID: req.session.ID, Nome: req.session.Nome, Acesso: req.session.Acesso };
            list = await comen.getAllEmEspera();

            list = await merge(list)
            return res.status(200).render('FAComentario/FAComentario', { list, login });
        }
        return res.status(200).render('login', { mensagem: '' });
    }
    catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
};

const getById = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {
            let co = await comen.getById(req.params.id);
            comentario = await merge(co);
            await dataAtual();

            return res.status(200).render('FAComentario/FAComentarioInfo', { list, comentario, login, hoje, erro, erroEstado });
        }
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
};

async function dataAtual() {
    hoje = new Date();
    let dd = String(hoje.getDate()).padStart(2, '0');
    let mm = String(hoje.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = hoje.getFullYear();

    hoje = yyyy + '-' + mm + '-' + dd;
}

const create = async (req, res) => {
    erroEstado = "";
    if (req.body.Estado != "") {
        comen.setEstado(req.body.Estado, req.body.Observacao, req.body.dtAtu, comentario[0].Id_Comentario)
    }
    else {
        erroEstado = "*INFORME O ESTADO DO COMENTÁRIO*"
        return res.status(200).render('FAComentario/FAComentarioInfo', { list, comentario, login, hoje, erro, erroEstado });
    }
    list = await comen.getAllEmEspera();
    list = await merge(list)
    return res.status(200).render('FAComentario/FAComentario', { list, login });
}

async function merge(list) {
    let lista = [];
    for (let i = 0; i < list.length; i++) {
        let autor_comentario;
        let autor = await titu.getAutorById(list[i].Id_Titulo);
        let ti = await titu.getById(list[i].Id_Titulo)
        let assunto = await titu.getAssuntoById(list[i].Id_Titulo);
        let editora = await edi.getById(ti[0].Id_Editora);
        if (list[i].Id_Professor != null)
            autor_comentario = await prof.getById(list[i].Id_Professor)
        else
            autor_comentario = await alu.getById(list[i].Id_Aluno)
        autor = await aut.getById(autor[0].Id_Autor);
        assunto = await asu.getById(assunto[0].Id_Assunto);

        lista.push({ Id_Comentario: list[i].Id_Comentario, Titulo: ti[0].Titulo, Ano_Publicacao: ti[0].Ano_Publicacao, Dt_Publicacao: list[i].Dt_Publicacao.toLocaleDateString(), Comentario: list[i].Comentario, Id_Autor: autor[0].Id_Autor, Autor: autor[0].Nome, autor_comentario: autor_comentario[0].Nome, Id_Assunto: assunto[0].Id_Assunto, Assunto: assunto[0].Nome, Id_Editora: editora[0].Id_Editora, Editora: editora[0].Nome });
    }
    return lista;
}

const pesq = async (req, res) => {
    try {
        await inicializa();
        if (req.query.rbpesq == 'Rbtitulo') {
            list = list.filter(l => l.Titulo == req.query.Pesq);
        }
        else
            if (req.query.rbpesq == 'Rbtombo') {
                list = list.filter(l => l.Id_Exemplar == req.query.Pesq);
            }
        return res.status(200).render('FAComentario/FAComentario', { list, login });
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 404' });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    pesq
};