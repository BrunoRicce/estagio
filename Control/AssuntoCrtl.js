const asu = require('../Model/Assunto');

let list= null;

const getAll = async (req, res) => {
    //try {
    list = await asu.getAll();
    return res.status(200).render('BAssunto/BAssunto', {list});
    //} 
    // catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

  const create = async (req, res) => {
    //try {
    if (req.body.Assunto == '') {
      console.log("inf obrigatória invalida");
    }
    else {
      console.log("Create");
      await asu.create(req.body);
      return res.status(200).redirect("/assuntos/");
    }
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

  const getById = async (req, res) => {
    //try {
    const assunto = await asu.getById(req.params.id);
    return res.status(200).render('BAssunto/BAssuntoALT', { assunto, list });
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

  const alter = async (req, res) => {
    //try {
    if (req.body.Nome == '' ) {
      console.log("inf obrigatória invalida");
    }
    else {
      await asu.alter(req.body, req.params.id);
      return res.status(200).redirect("/assuntos/");
    }
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

  const delById = async (req, res) => {
    //try {
    await asu.delById(req.params.id);
    return res.status(200).redirect("/assuntos/");
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

  const pesq = async(req,res) => {
    console.log("Pesq: "+req.query.Pesq);
    list = await asu.pesq(req.query.Pesq);
    return res.status(200).render('BAssunto/BAssunto', { list });
  }
  

  module.exports = {
    getAll,
    pesq,
    getById,
    delById,
    alter,
    create
};