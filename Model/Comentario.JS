const connection = require('../database/connection');

const create = async (tituID, aluID, proID, Visibilidade, Comentario, dtAtu) => {
    try {
        const result = await connection.execute(
            'INSERT INTO comentario (Id_Titulo, Id_Aluno, Id_Professor, Visivel, Aprovado, Comentario, Dt_Publicacao) VALUES (?,?,?,?,?,?,?)',
            [tituID, aluID, proID, Visibilidade, 0, Comentario, dtAtu]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        console.log("executou o catch");
        return null;
    }
};

const getAllEmEspera = async () => {
    try {
        const result = await connection.execute(
            'SELECT * FROM comentario WHERE aprovado = 0'
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        console.log("executou o catch");
        return null;
    }
};

const getAllAprovado= async () => {
    try {
        const result = await connection.execute(
            'SELECT * FROM comentario WHERE aprovado = 1 union SELECT * FROM comentario WHERE aprovado = 2'
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        console.log("executou o catch");
        return null;
    }
};

const getById= async (id) => {
    try {
        const result = await connection.execute(
            'SELECT * FROM comentario WHERE Id_Comentario = ?', [id]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        console.log("executou o catch");
        return null;
    }
};

const setEstado= async (estado, obs, dtatu, id) => {
    try {
        const result = await connection.execute(
            'update comentario set Aprovado = ?, Observacao=?, Dt_Revisao=? WHERE Id_Comentario = ?', [estado,obs,dtatu,id]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        console.log("executou o catch");
        return null;
    }
};

const delById= async (id) => {
    try {
        const result = await connection.execute(
            'DELETE FROM comentario WHERE Id_Comentario = ?', [id]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        console.log("executou o catch");
        return null;
    }
};

module.exports = {
    create,
    getAllEmEspera,
    getAllAprovado,
    getById,
    setEstado,
    delById
};