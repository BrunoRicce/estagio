const alu = require('../Model/Aluno');
const as = require('../Model/Anoserie');
const ee = require('../Model/ExemplarEmpresado');
const ex = require('../Model/Exemplar');
const titu = require('../Model/Titulo');
const est = require('../Model/Estante');
const aut = require('../Model/Autor');
const asu = require('../Model/Assunto');
let alunos = null;
let list = null;
let login = null
let lexem = null;
let exe_emp = null;
let aluno = null;
let exeSelec = [];
let hoje = null;
let erro = "";

const getAll = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {
            login = { Nome: req.session.Nome, Acesso: req.session.Acesso };
            exeSelec = [];
            list = await getAnoSerie();//lista de anoserie e turma com merge
            alunos = await alu.getAll();
            alunos = mergeAluAS(alunos, list);
            return res.status(200).render('REmprestimo/REmprestimo', { alunos, list, login, erro });
        }
        return res.status(200).render('login', { mensagem: '' });
    }
    catch (error) {
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

const getById = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {
            exeSelec = [];
            await dataAtual();
            aluno = await alu.getById(req.params.id);
            await listaExemplares();
            aluno = mergeAluAS(aluno, list);

            exe_emp = await ee.getByAlunoId(aluno[0].Id_Aluno)
            if (exe_emp.length != 0) {
                exe_emp = await listEmp(exe_emp);
            }
            //console.log(exe_emp)
            return res.status(200).render('REmprestimo/REmprestimoInfo', { aluno, alunos, list, login, exe_emp, lexem, exeSelec, hoje, erro });
        }
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
};

const setExe = async (req, res) => {
    try {
        let exe_selec = lexem.filter(l => l.Id_Exemplar == req.params.id);
        lexem = lexem.filter(l => l.Id_Exemplar != req.params.id);
        exeSelec.push({ Id_Exemplar: exe_selec[0].Id_Exemplar, Id_Titulo: exe_selec[0].Id_Titulo, Id_Prateleira: exe_selec[0].Id_Prateleira, Ano_compra: exe_selec[0].Ano_compra, Titulo: exe_selec[0].Titulo, Autor: exe_selec[0].Autor, Assunto: exe_selec[0].Assunto, Id_Estante: exe_selec[0].Id_Estante, Estante: exe_selec[0].Estante, Pos: exe_selec[0].Pos, Emprestado: exe_selec[0].Emprestado });
        return res.status(200).render('REmprestimo/REmprestimoInfo', { aluno, alunos, list, login, exe_emp, lexem, exeSelec, hoje, erro });
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
};

async function limpa_lexem()//acho que não vou precisar
{
    await listaExemplares();
    for (let i = 0; i < exeSelec.length; i++) {
        lexem = lexem.filter(l => l.Id_Exemplar != exeSelec[i].Id_Exemplar);
    }
}

const delExe = async (req, res) => {
    try {
        exeSelec = exeSelec.filter(l => l.Id_Exemplar != req.params.id);
        await limpa_lexem();
        //exeSelec.push({ Id_Exemplar: exe_selec[0].Id_Exemplar, Id_Titulo: exe_selec[0].Id_Titulo, Id_Prateleira: exe_selec[0].Id_Prateleira, Ano_compra: exe_selec[0].Ano_compra, Titulo: exe_selec[0].Titulo, Autor: exe_selec[0].Autor, Assunto: exe_selec[0].Assunto, Id_Estante: exe_selec[0].Id_Estante, Estante: exe_selec[0].Estante, Pos: exe_selec[0].Pos, Emprestado: exe_selec[0].Emprestado });
        return res.status(200).render('REmprestimo/REmprestimoInfo', { aluno, alunos, list, login, exe_emp, lexem, exeSelec, hoje, erro });
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
};

async function listEmp(exe_emp) {
    let lista = [];
    let exs = [];
    let titulo = [];
    for (let i = 0; i < exe_emp.length; i++) {
        exs = await ex.getById(exe_emp[i].Id_Exemplar)
        titulo = await titu.getById(exs[0].Id_Titulo);
        exe_emp[i].Dt_Emprestimo = exe_emp[i].Dt_Emprestimo.toLocaleDateString();
        exe_emp[i].Dt_Encerramento = exe_emp[i].Dt_Encerramento;
        let dt = new Date(hoje);
        let dt2 = new Date(exe_emp[i].Dt_Encerramento);
        console.log(exe_emp[i].Dt_Devolucao)
        if (exe_emp[i].Dt_Devolucao == null)
            lista.push({
                Id_Exemplar_Emprestado: exe_emp[i].Id_Exemplar_Emprestado, Id_Exemplar: exe_emp[i].Id_Exemplar, Titulo: titulo[0].Titulo, Id_Aluno: exe_emp[i].Id_Aluno,
                Id_Professor: exe_emp[i].Id_Professor, Dt_Emprestimo: exe_emp[i].Dt_Emprestimo, Dt_Encerramento: exe_emp[i].Dt_Encerramento.toLocaleDateString(), Observacao: exe_emp[i].Observacao, Atrasado: dt >= dt2
            })
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

const pesq = async (req, res) => {
    alunos = await alu.pesq(req.query.Pesq, req.query.rbpesq);
    list = await getAnoSerie();

    alunos = mergeAluAS(alunos, list);
    return res.status(200).render('REmprestimo/REmprestimo', { alunos, list, login, erro });
}

const create = async (req, res) => {
    erro = "";
    let dt = new Date(hoje);
    let dt2 = new Date(req.body.dtDevu);
    if (dt2 >= dt) {
        for (let i = 0; i < exeSelec.length; i++) {
            ee.create(exeSelec[i], aluno[0], req.body.dtAtu, req.body.dtDevu)
            ex.alterEstado(exeSelec[i], 1);
        }
    }
    else {
        erro = "Data inválida"
        return res.status(200).render('REmprestimo/REmprestimoInfo', { aluno, alunos, list, login, exe_emp, lexem, exeSelec, hoje, erro });
    }

    return res.status(200).render('REmprestimo/REmprestimo', { aluno, alunos, list, login, exe_emp, lexem, exeSelec, hoje, erro });
}

const pesqex = async (req, res) => {
    try {
        await limpa_lexem()
        if (req.query.rbpesq == 'Rbtitulo') {
            lexem = lexem.filter(l => l.Titulo == req.query.Pesq);
        }
        else
            if (req.query.rbpesq == 'Rbtombo') {
                lexem = lexem.filter(l => l.Id_Exemplar == req.query.Pesq);
            }
            else
                if (req.query.rbpesq == 'Rbautor') {
                    lexem = lexem.filter(l => l.Autor == req.query.Pesq);
                }
                else
                    if (req.query.rbpesq == 'Rbassunto') {
                        lexem = lexem.filter(l => l.Assunto == req.query.Pesq);
                    }
                    else
                        if (req.query.rbpesq == 'Rbest') {
                            let info;
                            if (req.query.Pesq == "Disponível")
                                info = 0;
                            else
                                info = 1;
                            lexem = lexem.filter(l => l.Emprestado == info);
                        }
                        else
                            if (req.query.rbpesq == 'Rbestan') {
                                lexem = lexem.filter(l => l.Estante == req.query.Pesq);
                            }
        return res.status(200).render('REmprestimo/REmprestimoInfo', { aluno, alunos, list, login, exe_emp, lexem, exeSelec, hoje, erro });
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 404' });
    }
}

module.exports = {
    getAll,
    getById,
    pesq,
    pesqex,
    setExe,
    delExe,
    create
};