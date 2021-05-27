const connection = require('../database/connection');

const getAll = async () => {
    try {

        const result = await connection.execute('select * from professor');
        return result[0];
    } catch (error) {
        return null;
    }
};

const delById = async (id) => {
    try {
        const result = await connection.execute(
            "delete from professor where Id_Professor=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
}

const getById = async (id) => {
    try {
        const result = await connection.execute(
            "select * from professor where Id_Professor=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const create = async (professores) => {//{ Nome, RA, Senha, Telefone, Email, Endereco }
    try {
        const result = await connection.execute(
            'INSERT INTO professor (Nome, Cpf, Senha, Ativo, Tipo_Acesso, Endereco, Telefone, Email) VALUES (?,?,?,?,?,?,?,?)',
            [professores.Nome, professores.CPF, professores.Senha, professores.Estado, professores.Tipo, professores.Endereco, professores.Telefone, professores.Email]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        //console.log("executou o catch do create em Aluno.js");
        return null;
    }
};

const alter = async (professores, id) => {//{ Nome, RA, Senha, Telefone, Email, Endereco }
    try {
        const result = await connection.execute(
            'update professor set Nome=?, Cpf=?, Senha=?, Ativo=?, Tipo_Acesso=?, Endereco=?, Telefone=?, Email=? where Id_Professor=?',
            [professores.Nome, professores.CPF, professores.Senha, professores.Estado, professores.Tipo, professores.Endereco, professores.Telefone, professores.Email, id]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        //console.log("executou o catch do create em Aluno.js");
        return null;
    }
};

const pesq = async (info,rbpesq) => {
    if (rbpesq == 'Rbcpf')
        sql = "select * from professor where Cpf=?";

    if (rbpesq == 'Rbnome')
        sql = "select * from professor where Nome=?";
    try {
        const result = await connection.execute(
            sql,
            [info]
        );
        return result[0];
    } catch (error) {
        return null;
    }
}

module.exports = {
    getAll,
    getById,
    delById,
    create,
    alter,
    pesq
};