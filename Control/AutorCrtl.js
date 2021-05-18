const aut = require('../Model/Autor');

let list= null;

const getAll = async (req, res) => {
    //try {
        console.log("getAll");
    list = await aut.getAll();
    return res.status(200).render('BAutor/BAutor', {list});
    //} 
    // catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

  const create = async (req, res) => {
    //try {
    if (req.body.Autor == '') {
      console.log("inf obrigatória invalida");
    }
    else {
      await aut.create(req.body);
      return res.status(200).redirect("/autores/");
    }
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

//   const getById = async (req, res) => {
//     //try {
//         console.log("--------------getById----------------------------------")
//     const autor = await aut.getById(req.params.id);
//     console.log(autor[0].Id_Autor);
//     return res.status(200).render('BAutor/BAutorALT', { autor, list });
//     // } catch (error) {
//     //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
//     // }
//   };

//   const alter = async (req, res) => {
//     //try {
//     if (req.body.Nome == '' ) {
//       console.log("inf obrigatória invalida");
//     }
//     else {
//       await aut.alter(req.body, req.params.id);
//       return res.status(200).redirect("/autores/");
//     }
//     // } catch (error) {
//     //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
//     // }
//   };

//   const delById = async (req, res) => {
//     //try {
//     await aut.delById(req.params.id);
//     return res.status(200).redirect("/autores/");
//     // } catch (error) {
//     //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
//     // }
//   };
    // getById,
    // delById,
    // alter,
  module.exports = {
    getAll,
    create
};