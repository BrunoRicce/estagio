const lgn = require('../Model/Login');

const getAll = async (req, res) => {
    try {
        return res.status(200).render('Login',{mensagem:''});
    }
    catch (error) {
        return res.status(500).render('errors/error', { error: ' ERROR 500' });
    }
};

const login = async (req, res) => {
    // try {
        if (req.body.Login == '' || req.body.Senha == '') {
            console.log("inf obrigatória invalida");
        }
        else {
            let login = [];
            console.log(req.body.rblogin);
            if (req.body.rblogin == "Rbprof")
                login = await lgn.loginProf(req.body);
            else
                if (req.body.rblogin == "Rbaluno")
                    login = await lgn.loginAlu(req.body);
            console.log(login);
            if (login.length!=0)
            {
                req.session.Nome = login[0].Nome;
                if(req.body.rblogin == "Rbaluno")
                    req.session.Acesso = 0;
                else
                req.session.Acesso = login[0].Tipo_Acesso;

                return res.status(200).redirect("/Menu/");
            }
                
            else
                return res.status(200).render('Login',{mensagem:'Login ou Senha incorreto'});
        }
    // } catch (error) {
    //     return res.status(500).render('errors/error', { error: ' ERROR aqui' });
    // }
};

module.exports = {
    getAll,
    login
};