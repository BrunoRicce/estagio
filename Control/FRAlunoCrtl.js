const alu = require('../Model/Aluno');
const titu = require('../Model/Titulo');
const est = require('../Model/Estante');
const prof = require('../Model/Professor');
const anse = require('../Model/Anoserie');

const aut = require('../Model/Autor');
const edi = require('../Model/Editora');
const asu = require('../Model/Assunto');
const requi = require('../Model/Requisicao');

let login;
let list = null;
let hoje = null;

const getAll = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {
            if(req.session.Acesso == 0)
                login = {ID: req.session.ID, Nome: req.session.Nome, Acesso: req.session.Acesso };
            else
                return res.status(200).redirect("/Menu/");

            let alu_aux = await alu.getById(login.ID)
            list = await requi.getByAnoSerieId(alu_aux[0].Id_AnoSerie);
            list = await merge(list)
            await dataAtual();

            return res.status(200).render('FRAluno/FRAluno', { list, login });
        }
        return res.status(200).render('login', { mensagem: '' });
    }
    catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500, não foi possivel carregar exemplares' });
    }
};

async function merge(list) {//lista de tituloa
    let lista = [];
    for (let i = 0; i < list.length; i++) {

        let titulo = await titu.getById(list[i].Id_Titulo);
        let autor = await titu.getAutorById(list[i].Id_Titulo);
        autor = await aut.getById(autor[0].Id_Autor);
        let professor = await prof.getById(list[i].Id_Professor)
        let anoserie = await anse.getAnoSerieTurmaById(list[i].Id_AnoSerie)
        let dt = new Date(hoje);
        let dt2 = new Date(list[i].Dt_Encerramento);

        if(dt2>=dt)
        lista.push({ Id_Requisicao: list[i].Id_Requisicao, Id_Titulo: list[i].Id_Titulo, Id_Professor: list[i].Id_Professor, Id_AnoSerie: list[i].Id_AnoSerie, 
            Titulo: titulo[0].Titulo, Autor: autor[0].Nome, Professor: professor[0].Nome, Id_Autor: autor[0].Id_Autor, AnoSerie: anoserie[0].AnoSerie+"°"+anoserie[0].Turma.toUpperCase() ,
            DtReq: list[i].Dt_Requisicao.toLocaleDateString(), DtEnc: list[i].Dt_Encerramento.toLocaleDateString()});
    }
    return lista;//retorna a mege de ista de titulos com assuntos e autores
}

async function dataAtual() {
    hoje = new Date();
    let dd = String(hoje.getDate()).padStart(2, '0');
    let mm = String(hoje.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = hoje.getFullYear();

    hoje = yyyy + '-' + mm + '-' + dd;
}

module.exports = {
    getAll
};