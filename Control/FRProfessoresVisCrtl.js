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

const getAll = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {
            if (req.session.Acesso > 0)
                login = { ID: req.session.ID, Nome: req.session.Nome, Acesso: req.session.Acesso };
            else
                return res.status(200).redirect("/Menu/");

            await setList();

            return res.status(200).render('FRProfessoresVis/FRProfessoresVis', { list, login });
        }
        return res.status(200).render('login', { mensagem: '' });
    }
    catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500, não foi possivel carregar exemplares' });
    }
};

const getById = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) {
            await requi.delById(req.params.id);
            await setList();

            return res.status(200).render('FRProfessoresVis/FRProfessoresVis', { list, login });
        }
    } catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
};

async function setList() {

    let prof_aux = await prof.getById(login.ID)


    list = await requi.getByProfId(prof_aux[0].Id_Professor)
    list = await merge(list)
}

async function merge(list) {//lista de tituloa
    let lista = [];
    let titulo
    let autor
    let professor
    let anoserie

    for (let i = 0; i < list.length; i++) {

        titulo = await titu.getById(list[i].Id_Titulo);

        autor = await titu.getAutorById(list[i].Id_Titulo);

        console.log(autor)
        autor = await aut.getById(autor[0].Id_Autor);

        professor = await prof.getById(list[i].Id_Professor)

        anoserie = await anse.getAnoSerieTurmaById(list[i].Id_AnoSerie)


        lista.push({
            Id_Requisicao: list[i].Id_Requisicao, Id_Titulo: list[i].Id_Titulo, Id_Professor: list[i].Id_Professor, Id_AnoSerie: list[i].Id_AnoSerie,
            Titulo: titulo[0].Titulo, Autor: autor[0].Nome, Professor: professor[0].Nome, Id_Autor: autor[0].Id_Autor, AnoSerie: anoserie[0].AnoSerie + "°" + anoserie[0].Turma.toUpperCase(),
            DtReq: list[i].Dt_Requisicao.toLocaleDateString(), DtEnc: list[i].Dt_Encerramento.toLocaleDateString()
        });
    }
    return lista;//retorna a mege de ista de titulos com assuntos e autores
}

module.exports = {
    getAll,
    getById
};