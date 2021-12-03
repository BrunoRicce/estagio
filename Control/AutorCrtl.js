const aut = require('../Model/Autor');

let list = null;
let login;
const getAll = async (req, res) => {
  try {
    if (req.session.Acesso != undefined) {
      login = { Nome: req.session.Nome, Acesso: req.session.Acesso };
      list = await aut.getAll();
      return res.status(200).render('BAutor/BAutor', { list, login });
    }
    return res.status(200).render('login', { mensagem: '' });
  }
  catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 500' });
  }
};

const create = async (req, res) => {
  try {
    if (req.body.Autor == '') {
      console.log("inf obrigatória invalida");
    }
    else {
      await aut.create(req.body);
      return res.status(200).redirect("/autores/");
    }
  } catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 500' });
  }
};

const getById = async (req, res) => {
  try {
    if (req.session.Acesso != undefined) {
      let excluir = null;
      const autor = await aut.getById(req.params.id);
      console.log(autor[0].Id_Autor);
      excluir = await aut.getByIdAutorTitulo(autor[0].Id_Autor);
      console.log(excluir.length);
      return res.status(200).render('BAutor/BAutorALT', { autor, list, excluir: excluir.length, login });
    }
  } catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 500' });
  }
};

const alter = async (req, res) => {
  try {
    if (req.body.Autor == '') {
      console.log("inf obrigatória invalida");
    }
    else {
      await aut.alter(req.body, req.params.id);

      return res.status(200).redirect("/autores/");
    }
  } catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 500' });
  }
};

const delById = async (req, res) => {
  try {
    let teste = await aut.delById(req.params.id);
    console.log(teste);
    return res.status(200).redirect("/autores/");
  } catch (error) {
    return res.status(500).render('errors/error', { error: ' ERROR 500' });
  }
};

const pesq = async (req, res) => {
  console.log("Pesq: " + req.query.Pesq);
  list = await aut.pesq(req.query.Pesq);
  return res.status(200).render('BAutor/BAutor', { list, login });
}

module.exports = {
  getAll,
  getById,
  pesq,
  delById,
  alter,
  create
};