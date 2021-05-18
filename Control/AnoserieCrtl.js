const as = require('../Model/Anoserie');

const getAll = async (req, res) => {
    //try {
    //alunos = await as.getAll();
    return res.status(200).render('BAnoserie/BAnoserie');
    //} 
    // catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
};

const create = async (req, res) => {
    //try {
    if (req.body.Anoserie == '' || req.body.Turma == '') {
        //alert("Os campos Nome, RA, Ano e Série são obrigatórios");
        // document.getElementById("baNome").innerHTML += " *obrigatório";
        // document.getElementById("baNome").setAttribute("style", "color:red");
        console.log("inf obrigatória invalida");
    }
    else {
        console.log("Create")
        await as.create(req.body);
        return res.status(200).redirect("/anoserie/");
    }
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
};

module.exports = {
    getAll,
    create
};