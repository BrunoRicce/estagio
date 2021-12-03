const exm = require('../Model/Exemplar');
const titu = require('../Model/Titulo');
const est = require('../Model/Estante');

const aut = require('../Model/Autor');
const edi = require('../Model/Editora');
const asu = require('../Model/Assunto');

let login;
let list = null;
let ltitu = null;
let lest = null;
let lprat = null;
let lpratAll = null;
let laut = null;
let lasu = null;

let ledi = null;

let titulo_aux = null;

const getAll = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {
            login = { Nome: req.session.Nome, Acesso: req.session.Acesso };
            list = await exm.getAll();//todos exemplares
            ltitu = await titu.getAll();
            lest = await est.getAll();
            lprat = await est.getMaiorQtd();
            lpratAll = await est.getQtd();


            lpratAll = estPratAll(lest, lpratAll);//lista de estantes e All(prateleiras)
            await inicializa();//Tem que ser nesta ordem, senão da chabu
            lest = estprat(lest, lprat);//lista de estantes e Max(prateleiras)


            return res.status(200).render('FPExemplar/FPExemplar', { list, lest, ltitu, login });
        }
        return res.status(200).render('login', { mensagem: '' });
    }
    catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500, não foi possivel carregar exemplares' });
    }
};

function estPratAll(list, list2)//merge de estante + prateleira
{
    let lista = [];
    for (let i = 0; i < list.length; i++) {
        for (let y = 0; y < list2.length; y++) {
            if (list[i].Id_Estante == list2[y].Id_Estante) {
                lista.push({ Id_Estante: list[i].Id_Estante, Id_Prateleira: list2[y].Id_Prateleira, Descricao: list[i].Descricao, Pos: list2[y].Descricao });
            }
        }
    }
    return lista;
}

async function inicializa() {
    list = await exm.getAll();//todos exemplares
    ltitu = await titu.getAll();
    lest = await est.getAll();
    let auti = await aut.getAutorTitulo(); //buscar autor do titulo
    let asti = await asu.getAssuntoTitulo(); //buscar assunto do titulo
    laut = await aut.getAll();
    lasu = await asu.getAll();
    list = await exmTituPrat(list, ltitu, lpratAll, auti, asti);
}

function estprat(list, list2) {
    let lista = [];
    for (let i = 0; i < list.length; i++) {
        lista.push({ Id_Estante: list[i].Id_Estante, Descricao: list[i].Descricao, Qtd: '', Max: '' });
        for (let y = 0; y < list2.length; y++) {
            if (list[i].Id_Estante == list2[y].Id_Estante) {
                lista[i].Qtd = list2[y].Descricao;
            }
        }
    }
    return lista;
}

async function exmTituPrat(exm, titu, prat, auti, asti) {
    let lista = [];
    for (let i = 0; i < exm.length; i++) {
        lista.push({ Id_Exemplar: exm[i].Id_Exemplar, Id_Titulo: exm[i].Id_Titulo, Id_Prateleira: exm[i].Id_Prateleira, Ano_compra: exm[i].Ano_compra, Titulo: '', Autor: '', Assunto: '', Id_Estante: '', Estante: '', Pos: '', Emprestado: exm[i].Emprestado })
        for (let y = 0; y < titu.length; y++)
            if (titu[y].Id_Titulo == exm[i].Id_Titulo)
                lista[i].Titulo = titu[y].Titulo;

        for (let x = 0; x < prat.length; x++)
            if (prat[x].Id_Prateleira == exm[i].Id_Prateleira) {
                lista[i].Estante = prat[x].Descricao;
                lista[i].Id_Estante = prat[x].Id_Estante;
                lista[i].Pos = prat[x].Pos;
            }


        for (let z = 0; z < auti.length; z++)
            if (auti[z].Id_Titulo == exm[i].Id_Titulo) {
                let autor = await aut.getById(auti[z].Id_Autor)
                lista[i].Autor = autor[0].Nome;
            }


        for (let a = 0; a < asti.length; a++)
            if (asti[a].Id_Titulo == exm[i].Id_Titulo) {
                let assunt = await asu.getById(asti[a].Id_Assunto);
                lista[i].Assunto = assunt[0].Nome;
            }
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
            else
                if (req.query.rbpesq == 'Rbautor') {
                    list = list.filter(l => l.Autor == req.query.Pesq);
                }
                else
                    if (req.query.rbpesq == 'Rbassunto') {
                        list = list.filter(l => l.Assunto == req.query.Pesq);
                    }
                    else
                        if (req.query.rbpesq == 'Rbest') {
                            let info;
                            if (req.query.Pesq == "Disponível")
                                info = 0;
                            else
                                info = 1;
                            list = list.filter(l => l.Emprestado == info);
                        }
                        else
                            if (req.query.rbpesq == 'Rbestan') {
                                list = list.filter(l => l.Estante == req.query.Pesq);
                            }
        return res.status(200).render('FPExemplar/FPExemplar', { list, lest, ltitu, login });
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 404' });
    }
}

const getById = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {
            let exemplar = await exm.getById(req.params.id);
            let auti = await aut.getAutorTitulo(); //buscar autor do titulo
            let asti = await asu.getAssuntoTitulo(); //buscar assunto do titulo
            exemplar = await exmTituPrat(exemplar, ltitu, lpratAll, auti, asti);

            // titulo_aux = await titu.getById(exemplar[0].Id_Titulo);
            // console.log(titulo_aux[0]);
            return res.status(200).render('FPExemplar/FPExemplarVIS', { list, lest, ltitu, exemplar, login });
        }
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
};

module.exports = {
    getAll,
    pesq,
    getById
};