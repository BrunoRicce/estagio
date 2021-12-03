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
const { getById } = require('./AlunoCrtl');


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
let alunos = null;
let erro = null;
let aluno = null;
let qtd_lidos = 0;
let hoje;

const getAll = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {
            login = { Nome: req.session.Nome, Acesso: req.session.Acesso };
            link = false;
            await dataAtual();

            return res.status(200).render('SLivrosLidos/SLivrosLidos', { alunos, list, login, erro, hoje });
        }
        return res.status(200).render('login', { mensagem: '' });
    }
    catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500, não foi possivel carregar histórico de emprestimo' });
    }
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

async function getAnoSerie() {
    list = await as.getAll();
    let list2 = await as.getAllTurma();
    list = merge(list, list2);
    return list;
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

async function dataAtual() {
    hoje = new Date();
    let dd = String(hoje.getDate()).padStart(2, '0');
    let mm = String(hoje.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = hoje.getFullYear();

    hoje = yyyy + '-' + mm + '-' + dd;
}


async function listFinal(ex_emp) {
    let lista = [];
    let titulo, exe, mes_atu, mes_bd;
    mes_atu = Number(String(hoje.getMonth() + 1).padStart(2, '0'))
    for (let i = 0; i < ex_emp.length; i++) {
        exe = await ex.getById(ex_emp[i].Id_Exemplar)
        titulo = await titu.getById(exe[0].Id_Titulo)
        mes_bd = Number(ex_emp[i].Dt_Encerramento.getMonth() + 1)
        ex_emp[i].Dt_Emprestimo = ex_emp[i].Dt_Emprestimo.toLocaleDateString();
        ex_emp[i].Dt_Encerramento = ex_emp[i].Dt_Encerramento.toLocaleDateString();

        if (ex_emp[i].Dt_Devolucao == null)
            ex_emp[i].Dt_Devolucao = 'Não devolvido'
        else
            ex_emp[i].Dt_Devolucao = ex_emp[i].Dt_Devolucao.toLocaleDateString()

        if (mes_bd == mes_atu)
            lista.push({ Id_Exemplar: ex_emp[i].Id_Exemplar, Titulo: titulo[0].Titulo, Dt_Emprestimo: ex_emp[i].Dt_Emprestimo, Dt_Encerramento: ex_emp[i].Dt_Encerramento, Dt_Devolucao: ex_emp[i].Dt_Devolucao });
    }
    return lista;
}

async function count(titus, dtini, dtfim) {
    let lista = [], count, dti, dtf, dten, exeemp, exe;

    exeemp = await ee.getAll();

    dti = new Date(dtini);

    dtf = new Date(dtfim);
    for (let i = 0; i < titus.length; i++) {
        count = 0;
        for (let j = 0; j < exeemp.length; j++) {
            exe = await ex.getById(exeemp[j].Id_Exemplar)
            if (exe[0].Id_Titulo == titus[i].Id_Titulo) {
                if (exeemp[j].Dt_Devolucao != null) {
                    dten = new Date(exeemp[j].Dt_Devolucao)
                    if (dti.getTime() <= dten.getTime() && dten.getTime() <= dtf.getTime())
                        count++;
                }
            }
        }
        lista.push({ Titulo: titus[i].Titulo, Qtd: count, Dt_Ini: dti.toLocaleDateString(), Dt_Enc: dtf.toLocaleDateString() })
    }
    return lista;
}

const gerarPdf = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {
            let path = 'LivosMaisLidosDoPeriodo.pdf'
            let doc = new PDFDocument({ margin: 50 });

            // console.log(red.body.dtIni)
            console.log(req.body.dtDevu)

            console.log("1")
            list = await titu.getAll()
            list = await count(list, '2021-10-11', req.body.dtDevu)
            console.log("1")

            generateHeader(doc);
            generateTableRow(doc, 110, 'Titulo', '                 ', 'Leitores', 'Periodo');
            generateInvoiceTable(doc);

            doc.end();
            doc.pipe(fs.createWriteStream(path));
            return res.status(200).render('SLivrosLidos/SLivrosLidosLink', { login, exe_emp });
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
            item.Titulo,
            '                 ',
            item.Qtd,
            item.Dt_Ini + ' a ' + item.Dt_Enc,
        );
    }
}

module.exports = {
    getAll,
    gerarPdf
};