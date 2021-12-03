const lgn = require('../Model/Login');
const alu = require('../Model/Aluno');
const ee = require('../Model/ExemplarEmpresado');

const getAll = async (req, res) => {
    try {
        return res.status(200).render('Login', { mensagem: '' });
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
        if (req.body.rblogin == "Rbprof") {
            let temp = await lgn.loginProf(req.body);
            if (temp != null)
                if (temp.length != 0) {
                    login = { Id_Professor: temp[0].Id_Professor, Nome: temp[0].Nome, Cpf: temp[0].Cpf, Senha: temp[0].Senha, Ativo: temp[0].Ativo, Tipo_Acesso: temp[0].Tipo_Acesso, Endereco: temp[0].Endereco, Telefone: temp[0].Telefone, Email: temp[0].Email };
                    if (temp[0].Ativo == 0)
                        login = [];
                }

        }
        else
            if (req.body.rblogin == "Rbaluno") {
                let temp = await lgn.loginAlu(req.body);
                if (temp != null)
                    if (temp.length != 0)
                        login = { Id_Aluno: temp[0].Id_Aluno, Nome: temp[0].Nome, Senha: temp[0].Senha, Telefone: temp[0].Telefone, Email: temp[0].Email, Endereco: temp[0].Endereco, RA: temp[0].RA, Estado: temp[0].Estado, Id_AnoSerie: temp[0].Id_AnoSerie, Acesso: 0 };
            }

        if (login.length != 0) {
            req.session.Nome = login.Nome;
            if (req.body.rblogin == "Rbaluno") {
                req.session.Acesso = 0;
                req.session.ID = login.Id_Aluno;
            }
            else {
                req.session.Acesso = login.Tipo_Acesso;
                req.session.ID = login.Id_Professor;
            }

            //att estado do aluno
            await attAluno();
            //estado da solicitação

            return res.status(200).redirect("/Menu/");
        }

        else
            return res.status(200).render('Login', { mensagem: 'Login ou Senha incorreto' });
    }
    // } catch (error) {
    //     return res.status(500).render('errors/error', { error: ' ERROR aqui' });
    // }
};

const attAluno = async () => {
    let lista = await ee.getExeAtrasado();
    let lista_aluno = await alu.getAll();
    let verify = [];

    for (let i = 0; i < lista_aluno.length; i++) {
        verify = await ee.getExeAtrasadoByAlunoId(lista_aluno[i].Id_Aluno)
        if (verify.length==0)
            await alu.alterEstado('0', lista[i].Id_Aluno)
        verify = []
    }

    for (let i = 0; i < lista.length; i++)
        await alu.alterEstado('1', lista[i].Id_Aluno)
}

module.exports = {
    getAll,
    login
};