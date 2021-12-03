const alu = require('../Model/Aluno');
const as = require('../Model/Anoserie');
const ee = require('../Model/ExemplarEmpresado');
const ex = require('../Model/Exemplar');
const titu = require('../Model/Titulo');
const est = require('../Model/Estante');
const aut = require('../Model/Autor');
const asu = require('../Model/Assunto');

const fs = require("fs");
const PDFDocument = require("pdfkit");
const { Console } = require('console');


let login;
let list = null;
let ltitu = null;
let lest = null;
let lprat = null;
let lpratAll = null;
let link = false;
let exe_emp = null;
let exeSelec = [];
let exe = null;

const getAll = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {
            login = { Nome: req.session.Nome, Acesso: req.session.Acesso };
            link = false;

            return res.status(200).render('SDisponivel/SDisponivel', { link, login });
        }
        return res.status(200).render('login', { mensagem: '' });
    }
    catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500, não foi possivel carregar exemplares' });
    }
};

async function listaExemplares() {
    let lest = await est.getAll();
    let lpratAll = await est.getQtd();
    lpratAll = estPratAll(lest, lpratAll);
    lexem = await ex.getAll();//todos exemplares
    let ltitu = await titu.getAll();
    lest = await est.getAll();
    let auti = await aut.getAutorTitulo(); //buscar autor do titulo
    let asti = await asu.getAssuntoTitulo(); //buscar assunto do titulo
    let laut = await aut.getAll();
    let lasu = await asu.getAll();
    lexem = await exmTituPrat(lexem, ltitu, lpratAll, auti, asti);
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

async function gera_list(exe) {
    let lista = [];
    let exs = [];
    let titulo = [];
    for (let i = 0; i < exe.length; i++) {
        exs = await ex.getById(exe[i].Id_Exemplar)
        titulo = await titu.getById(exs[0].Id_Titulo);

        lista.push({
            Id_Exemplar: exe[i].Id_Exemplar, Titulo: titulo[0].Titulo, Observacao: exe[i].Observacao
        })
    }
    return lista;
}

async function dataAtual() {
    hoje = new Date();
    let dd = String(hoje.getDate()).padStart(2, '0');
    let mm = String(hoje.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = hoje.getFullYear();

    hoje = yyyy + '-' + mm + '-' + dd;
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

async function inicializa() {
    list = await ex.getDiponiveis();
    ltitu = await titu.getAll();
    lest = await est.getAll();
    let auti = await aut.getAutorTitulo(); //buscar autor do titulo
    let asti = await asu.getAssuntoTitulo(); //buscar assunto do titulo
    laut = await aut.getAll();
    lasu = await asu.getAll();
    list = await exmTituPrat(list, ltitu, lpratAll, auti, asti);
}

const gerarPdf = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {
            let path = 'ExemplarDisponiveis.pdf'
            let doc = new PDFDocument({ margin: 50 });
            await dataAtual();



            list = await ex.getDiponiveis();//todos exemplares
            ltitu = await titu.getAll();
            lest = await est.getAll();
            lprat = await est.getMaiorQtd();
            lpratAll = await est.getQtd();

            lpratAll = estPratAll(lest, lpratAll);//lista de estantes e All(prateleiras)
            await inicializa();//Tem que ser nesta ordem, senão da chabu
            lest = estprat(lest, lprat);//lista de estantes e Max(prateleiras)

            generateHeader(doc);
            generateTableRow(doc, 110, 'Tombo', 'Titulo', 'Autor', 'Estante', 'Prateleira');
            generateInvoiceTable(doc);

            doc.end();
            doc.pipe(fs.createWriteStream(path));
            link = true;

            return res.status(200).render('SDisponivel/SDisponivelLink', { login, exe_emp });
        }
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
}

function generateHeader(doc) {
    doc
        .image("imgs/Logo.png", 50, 45, { width: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .text("E.E. Dom Bosco", 110, 57)
        .fontSize(10)
        .text(login.Nome, 200, 65, { align: "right" })
        // .text("New York, NY, 10025", 200, 80, { align: "right" })
        .moveDown();
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(
            "Payment is due within 15 days. Thank you for your business.",
            50,
            780,
            { align: "center", width: 500 }
        );
}

function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
    doc
        .fontSize(10)
        .text(c1, 50, y)
        .text(c2, 150, y)
        .text(c3, 280, y, { width: 90, align: "right" })
        .text(c4, 370, y, { width: 90, align: "right" })
        .text(c5, 0, y, { align: "right" });
}

function generateInvoiceTable(doc) {// a cada 20 itens add uma page
    let i, invoiceTableTop = 110, rowcont = 0;
    let position;

    for (i = 0; i < list.length; i++) {
        const item = list[i];

        rowcont++;
        if (rowcont < 20)
            position = invoiceTableTop + (i + 1) * 30;
        else {
            rowcont = 0;
            doc.addPage()
            invoiceTableTop = 20
        }

        generateTableRow(
            doc,
            position,
            item.Id_Exemplar,
            item.Titulo,
            item.Autor,
            item.Estante,
            item.Pos
        );

    }
}

module.exports = {
    getAll,
    gerarPdf
};