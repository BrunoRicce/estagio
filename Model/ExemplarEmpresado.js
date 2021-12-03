const connection = require('../database/connection');


const getByAlunoId = async (id) => {
    try {
        const result = await connection.execute(
            "select * from exemplar_emprestado where Id_Aluno=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const getById = async (id) => {
    try {
        const result = await connection.execute(
            "select * from exemplar_emprestado where Id_Exemplar_Emprestado=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const getAll = async () => {
    try {
        const result = await connection.execute(
            "select * from exemplar_emprestado",
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const create = async (exemp, aluno, dtAtu, dtDevu) => {
    try {

        const result = await connection.execute(
            'INSERT INTO exemplar_emprestado (Id_Exemplar, Id_Aluno, Id_Professor, Dt_Emprestimo, Dt_Encerramento, Observacao) VALUES (?,?,?,?,?,?)',
            [exemp.Id_Exemplar, aluno.Id_Aluno, null, dtAtu, dtDevu, '']
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        console.log("executou o catch create Exemplar Emprestado");
        return null;
    }
};

const del = async (exemp) => {
    try {
        console.log(exemp.Id_Exemplar);
        const result = await connection.execute(
            'DELETE FROM exemplar_emprestado where Id_Exemplar = ?',
            [exemp.Id_Exemplar]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        console.log("executou o catch del Exemplar Emprestado");
        return null;
    }
};

const update = async (exemp, hoje) => {
    try {
        console.log(exemp.Id_Exemplar);
        const result = await connection.execute(
            'UPDATE exemplar_emprestado set Dt_Devolucao = ? where Id_Exemplar = ?',
            [hoje, exemp.Id_Exemplar]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        console.log("executou o catch del Exemplar Emprestado");
        return null;
    }
};

const getExeAtrasado = async () => {
    try {
        const result = await connection.execute('select * from exemplar_emprestado WHERE Dt_Devolucao is NULL');
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        console.log("executou o catch del Exemplar Emprestado");
        return null;
    }
};

const getExeAtrasadoByAlunoId = async (id) => {
    try {
        const result = await connection.execute('select * from exemplar_emprestado WHERE Dt_Devolucao is NULL AND Id_Aluno=?',
        [id]);
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        console.log("executou o catch del Exemplar Emprestado");
        return null;
    }
};

module.exports = {
    getByAlunoId,
    create,
    del, 
    getAll,
    update,
    getById,
    getExeAtrasado,
    getExeAtrasadoByAlunoId
};