const getAll = async (req, res) => {
    //try {
    return res.status(200).render('BMenu',);
    //} 
    // catch (error) {
    //   return res.status(500).render('errors/error', { error: 'FATAL ERROR 500' });
    // }
  };

  module.exports = {
    getAll,

  };