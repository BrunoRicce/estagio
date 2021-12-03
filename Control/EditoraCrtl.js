const edi = require('../Model/Editora');

let list = null;
let login;

const getAll = async (req, res) => {
  try {
    if (req.session.Acesso != undefined) {
      login = { Nome: req.session.Nome, Acesso: req.session.Acesso };
      list = await edi.getAll();
      return res.status(200).render('BEditora/BEditora', { list, login });
    }
    return res.status(200).render('login', { mensagem: '' });
  }
  catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 500' });
  }
};

const create = async (req, res) => {
  try {
    if (req.body.Editora == '') {
      console.log("inf obrigatória invalida");
    }
    else {
      console.log("Create");
      await edi.create(req.body);
      return res.status(200).redirect("/editoras/");
    }
  } catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 500' });
  }
};

const getById = async (req, res) => {
  try {
    if (req.session.Acesso != undefined) {
      const editora = await edi.getById(req.params.id);
      return res.status(200).render('BEditora/BEditoraALT', { editora, list, login });
    }
  } catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 500' });
  }
};

const alter = async (req, res) => {
  try {
    if (req.body.Nome == '') {
      console.log("inf obrigatória invalida");
    }
    else {
      await edi.alter(req.body, req.params.id);
      return res.status(200).redirect("/editoras/");
    }
  } catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 500' });
  }
};

const delById = async (req, res) => {
  try {
    await edi.delById(req.params.id);
    return res.status(200).redirect("/editoras/");
  } catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 500' });
  }
};

const pesq = async (req, res) => {
  console.log("Pesq: " + req.query.Pesq);
  list = await edi.pesq(req.query.Pesq);
  return res.status(200).render('BEditora/BEditora', { list, login });
}

module.exports = {
  getAll,
  getById,
  pesq,
  delById,
  alter,
  create
};