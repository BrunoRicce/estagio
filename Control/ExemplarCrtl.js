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
let ledi = null;
let lasu = null;

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
            // console.log("--------exm------- ");
            // console.log(list);
            // console.log("--------titu------- ");
            // console.log(ltitu);
            // console.log("--------prat------- ");
            // console.log(lpratAll);
            //list = exmTituPrat(list, ltitu, lpratAll);

            return res.status(200).render('BExemplar/BExemplar', { list, lest, ltitu, login });
        }
        return res.status(200).render('login', { mensagem: '' });
    }
    catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500, não foi possivel carregar exemplares' });
    }
};

function exmTituPrat(exm, titu, prat) {
    let lista = [];
    for (let i = 0; i < exm.length; i++) {
        lista.push({ Id_Exemplar: exm[i].Id_Exemplar, Id_Titulo: exm[i].Id_Titulo, Id_Prateleira: exm[i].Id_Prateleira, Ano_compra: exm[i].Ano_compra, Titulo: '', Id_Estante: '', Estante: '', Pos: '', Emprestado: exm[i].Emprestado })
        for (let y = 0; y < titu.length; y++)
            if (titu[y].Id_Titulo == exm[i].Id_Titulo)
                lista[i].Titulo = titu[y].Titulo;

        for (let x = 0; x < prat.length; x++)
            if (prat[x].Id_Prateleira == exm[i].Id_Prateleira) {
                lista[i].Estante = prat[x].Descricao;
                lista[i].Id_Estante = prat[x].Id_Estante;
                lista[i].Pos = prat[x].Pos;
            }
    }
    return lista;
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

const create = async (req, res) => {
    try {
        if (req.body.Titulo == '' || req.body.Qtd == '' || req.body.Estante == '') {
            console.log("inf obrigatória invalida");
        }
        else {
            let str = req.body.Estante.split("/");//id estante/prateleira qtd ma
            let tit = await titu.getById(req.body.Titulo);
            let tru = await est.getByIdQtd2(str[0], req.body.Prateleira);//não é o id da prateleira, é a desc

            let qtdt = Number(tit[0].Qtd_total) + Number(req.body.Qtd);
            let qtdd = Number(tit[0].Qtd_Disponivel) + Number(req.body.Qtd);
            console.log("req.body.Titulo: " + req.body.Titulo + ", Id_Prateleira: " + tru[0].Id_Prateleira + ", qtdt: " + qtdt + ", qtdd: " + qtdd);
            await exm.create(req.body, tru[0].Id_Prateleira, qtdt, qtdd);
            return res.status(200).redirect("/exemplares/");
        }
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
}

async function inicializa() {
    list = await exm.getAll();//todos exemplares
    ltitu = await titu.getAll();
    lest = await est.getAll();
    list = exmTituPrat(list, ltitu, lpratAll);
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
        return res.status(200).render('BExemplar/BExemplar', { list, lest, ltitu, login });
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 404' });
    }
}

const getById = async (req, res) => {
    try {
        let exemplar = await exm.getById(req.params.id);
        exemplar = exmTituPrat(exemplar, ltitu, lpratAll);
        titulo_aux = await titu.getById(exemplar[0].Id_Titulo);
        console.log(titulo_aux[0]);
        return res.status(200).render('BExemplar/BExemplarALT', { list, lest, ltitu, exemplar, login });
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
};

const alter = async (req, res) => {// caso mude o titulo mudar a qtd
    try {
        if (req.body.Titulo == '' || req.body.Estante == '') {
            console.log("inf obrigatória invalida");
        }
        else {
            let qtdd = null;
            console.log("0");
            if (titulo_aux[0].Id_Titulo != req.body.Titulo) {
                console.log("1");
                let ntitu = await titu.getById(req.body.Titulo)
                console.log(ntitu);
                console.log("2");
                if (req.body.Est == 'Disponível')
                    qtdd = titulo_aux[0].Qtd_Disponivel - 1;
                console.log("3");
                await titu.alterQtd(titulo_aux[0].Qtd_total - 1, qtdd, titulo_aux[0].Id_Titulo);
                console.log("4");
                await titu.alterQtd(ntitu[0].Qtd_total + 1, ntitu[0].Qtd_Disponivel, req.body.Titulo);
            }

            let str = req.body.Estante.split("/");
            let prateleira = await est.getByIdQtd2(str[0], req.body.Prateleira);
            await exm.alter(req.body, prateleira[0].Id_Prateleira, req.params.id);
            return res.status(200).redirect("/exemplares/");
        }
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 404' });
    }
};

const delById = async (req, res) => {
    try {
        let qtdt = null;
        let qtdd = null;
        let exemplar = await exm.getById(req.params.id);
        let tit = await titu.getById(exemplar[0].Id_Titulo);
        qtdt = tit[0].Qtd_total - 1;

        if (exemplar[0].Emprestado == 0)
            qtdd = tit[0].Qtd_Disponivel - 1;
        else
            qtdd = tit[0].Qtd_Disponivel;
        await exm.delById(req.params.id, exemplar[0].Id_Titulo, qtdd, qtdt);
        return res.status(200).redirect("/exemplares/");
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