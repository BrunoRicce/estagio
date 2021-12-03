const logout = async (req, res) => {
    try {
        if (req.session.Acesso != undefined) 
        {
            req.session.destroy();
            return res.status(200).render('Login', { mensagem: 'logout' });
        }
        return res.status(200).render('login', { mensagem: '' });
    }
    catch (error) {
        return res.status(500).render('errors/error', { error: error });
    }
};


module.exports = {
    logout
};