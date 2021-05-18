const connection = require('../database/connection');

const getAll = async () => {
    try {

        const result = await connection.execute('select * from aluno');
        return result[0];
    } catch (error) {
        return null;
    }
};

const delById = async (id) => {
    try {
        const result = await connection.execute(
            "delete from aluno where Id_Aluno=?",
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
            "select * from aluno where Id_Aluno=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const create = async (alunos) => {//{ Nome, RA, Senha, Telefone, Email, Endereco }
    try {
        const result = await connection.execute(
            'INSERT INTO aluno (Nome, RA, Senha, Telefone, Email, Endereco, Estado) VALUES (?,?,?,?,?,?,?)',
            [alunos.Nome, alunos.RA, alunos.Senha, alunos.Telefone, alunos.Email, alunos.Endereco, 0]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        //console.log("executou o catch do create em Aluno.js");
        return null;
    }
};

const alter = async (alunos, id) => {//{ Nome, RA, Senha, Telefone, Email, Endereco }
    try {
        const result = await connection.execute(
            'update aluno set Nome=?, RA=?, Senha=?, Telefone=?, Email=?, Endereco=?, Estado=? where Id_Aluno=?',
            [alunos.Nome, alunos.RA, alunos.Senha, alunos.Telefone, alunos.Email, alunos.Endereco, 0, id]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        //console.log("executou o catch do create em Aluno.js");
        return null;
    }
};

const pesq = async (info,rbpesq) => {
    if (rbpesq == 'Rbra')
        sql = "select * from aluno where RA=?";

    if (rbpesq == 'Rbnome')
        sql = "select * from aluno where Nome=?";

    if (rbpesq == 'Rbanoserie')
        sql = "select * from aluno where Id_Aluno=?";//ano e serie tem que buscar em um lugar diferente
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