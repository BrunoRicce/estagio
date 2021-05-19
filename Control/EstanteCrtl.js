const est = require('../Model/Estante');

let list= null;

const getAll = async (req, res) => {
    //try {
    list = await est.getAll();
    let list2 = await est.getQtd(); 
    list=merge(list,list2);
    return res.status(200).render('BEstante/BEstante', {list});
    //} 
    // catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

  function merge(list, list2)
  {
    let lista=[];
    for(let i=0; i< list.length; i++)
    {
        lista.push({Id_Estante: list[i].Id_Estante, Descricao: list[i].Descricao, Qtd: ''});
        for(let y=0; y< list2.length; y++)
        {
            if(list[i].Id_Estante==list2[y].Id_Estante)
            {
                flag=true;
                lista[i].Qtd=list2[y].Descricao;
            }
        }
    }
    return lista;
  }

  const create = async (req, res) => {
    //try {
    if (req.body.Descricao == '' || req.body.Qtd=='') {
      console.log("inf obrigatória invalida");
    }
    else {
      await est.create(req.body);
      return res.status(200).redirect("/estantes/");
    }
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

  const getById = async (req, res) => {
    //try {
    const estante = await est.getById(req.params.id);
    const qtd = await est.getByIdQtd(req.params.id);
    return res.status(200).render('BEstante/BEstanteALT', { estante,  qtd, list });
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

  const alter = async (req, res) => {
    //try {
    if (req.body.Descricao == '' || req.body.Qtd=='') {
      console.log("inf obrigatória invalida");
    }
    else {
      await est.alter(req.body, req.params.id);
      return res.status(200).redirect("/estantes/");
    }
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

  const delById = async (req, res) => {
    //try {
        console.log(req.params.id)
    await est.delById(req.params.id);
    return res.status(200).redirect("/estantes/");
    // } catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

  module.exports = {
    getAll,
    getById,
    delById,
    alter,
    create
};