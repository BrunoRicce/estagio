const prof = require('../Model/Professor');

let list = null;

const getAll = async (req, res) => {
    //try {
    list = await prof.getAll();
    return res.status(200).render('BProfessor/BProfessor', { list });
    //} 
    // catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
};
const create = async (req, res) => {
    //try {
    if (req.body.Nome == '' || req.body.CPF == '') {
        //alert("Os campos Nome, RA, Ano e Série são obrigatórios");
        // document.getElementById("baNome").innerHTML += " *obrigatório";
        // document.getElementById("baNome").setAttribute("style", "color:red");
        console.log("inf obrigatória invalida");
    }
    else {
        if (req.body.Senha == '')
            req.body.Senha = Math.floor(Math.random() * 100000) + 10000;
        await prof.create(req.body);
        return res.status(200).redirect("/professores/");
    }
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
}

const pesq = async (req, res) => {
    list = await prof.pesq(req.query.Pesq, req.query.rbpesq);
    return res.status(200).render('BProfessor/BProfessor', { list });
}

const getById = async (req, res) => {
    //try {
    let professor = await prof.getById(req.params.id);
    return res.status(200).render('BProfessor/BProfessorALT', { professor, list });
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

  const alter = async (req, res) => {
    //try {
    if (req.body.Nome == '' || req.body.Senha == '') {
      //alert("Os campos Nome, RA, Ano e Série são obrigatórios");
      // document.getElementById("baNome").innerHTML += " *obrigatório";
      // document.getElementById("baNome").setAttribute("style", "color:red");
      console.log("inf obrigatória invalida");
    }
    else {
      await prof.alter(req.body, req.params.id);
      return res.status(200).redirect("/professores/");
    }
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

  const delById = async (req, res) => {
    //try {
    await prof.delById(req.params.id);
    return res.status(200).redirect("/professores/");
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };
  
module.exports = {
    getAll,
    create,
    pesq,
    getById,
    alter,
    delById
};