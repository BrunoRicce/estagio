const getAll = async (req, res) => {
    try {
      if(req.session.Acesso != undefined)
      {
        let login = {Nome:req.session.Nome, Acesso: req.session.Acesso};
      return res.status(200).render('BMenu',{login});
      }
      return res.status(200).render('login',{mensagem:''});
    } 
    catch (error) {
      return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
  };

  module.exports = {
    getAll,
  };