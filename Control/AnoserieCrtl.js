const as = require('../Model/Anoserie');
let list = null;
const getAll = async (req, res) => {
    //try {
    list = await as.getAll();
    let list2 = await as.getAllTurma();
    list = merge(list, list2);
    return res.status(200).render('BAnoserie/BAnoserie', { list });
    //} 
    // catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
};

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

const create = async (req, res) => {
    //try {
    if (req.body.Anoserie == '' || req.body.Turma == '') {
        //alert("Os campos Nome, RA, Ano e Série são obrigatórios");
        // document.getElementById("baNome").innerHTML += " *obrigatório";
        // document.getElementById("baNome").setAttribute("style", "color:red");
        console.log("inf obrigatória invalida");
    }
    else {
        // console.log("Create")
        let idturma = null;
        let turmas = await as.getAllTurma();
        let series = await as.getAll();
        let lista = merge(series, turmas);
        if (!procura(lista, req.body.Anoserie, req.body.Turma)) {
            for (let i = 0; i < turmas.length; i++)
                if (turmas[i].Turma.toUpperCase() == req.body.Turma.toUpperCase())
                    idturma = turmas[i].Id_Turma;
            await as.create(req.body, idturma);
            return res.status(200).redirect("/anoseries/");
        }
        else
            console.log(req.body.Anoserie+""+ req.body.Turma+" já existe!");
    }
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
};

function procura(lista, anse, tur) {
    let flag = false;
    for (a of lista)
        if (a.AnoSerie == anse && a.Turma.toUpperCase() == tur.toUpperCase())
            flag = true;
    return flag;
}

function listPesq(list, pesq, info) {
    let lista = [];
    if (pesq == "rbanoserie") {
        for (let i = 0; i < list.length; i++)
            if (list[i].AnoSerie == info)
                lista.push(list[i]);
    }
    else {
        for (let i = 0; i < list.length; i++)
            if (list[i].Turma == info)
                lista.push(list[i]);
    }
    return lista;
}

const pesq = async (req, res) => {
    list = await as.getAll();
    let list2 = await as.getAllTurma();
    list = merge(list, list2);
    list = listPesq(list, req.query.rbpesq, req.query.Pesq);
    return res.status(200).render('BAnoserie/BAnoserie', { list });
}

const getById = async (req, res) => {
    //try {
    const anse = await as.getById(req.params.id);
    const tur = await as.getByIdTurma(anse[0].Id_Turma);
    return res.status(200).render('BAnoserie/BAnoserieALT', { anse, tur, list });
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
};

const delById = async (req, res) => {
    //try {
    await as.delById(req.params.id);
    return res.status(200).redirect("/anoseries/");
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
};

const alter = async (req, res) => {
    //try {
    if (req.body.Descricao == '' || req.body.Qtd == '') {
        console.log("inf obrigatória invalida");
    }
    else {
        let idturma = null;
        let turmas = await as.getAllTurma();
        let series = await as.getAll();
        let lista = merge(series, turmas);
        if (!procura(lista, req.body.Anoserie, req.body.Turma)) {
            for (let i = 0; i < turmas.length; i++)
                if (turmas[i].Turma.toUpperCase() == req.body.Turma.toUpperCase())
                    idturma = turmas[i].Id_Turma;
            await as.alter(req.body, idturma, req.params.id);
            return res.status(200).redirect("/anoseries/");
        }
        else
            console.log(req.body.Anoserie+""+ req.body.Turma+" já existe!"); 
    }
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
};
module.exports = {
    getAll,
    create,
    pesq,
    getById,
    delById,
    alter
};