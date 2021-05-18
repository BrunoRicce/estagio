const connection = require('../database/connection');

const getAll = async () => {
    try {

        const result = await connection.execute('select * from editora');
        return result[0];
    } catch (error) {
        return null;
    }
};

const create = async (edi) => {
    try {
        console.log("sql")
        const result = await connection.execute(
            'INSERT INTO editora (Nome) VALUES (?)',
            [edi.Editora]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        console.log("executou o catch");
        return null;
    }
};

const getById = async (id) => {
    try {
        const result = await connection.execute(
            "select * from editora where Id_Editora=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const alter = async (edi, id) => {
    try {
        const result = await connection.execute(
            'update editora set Nome=? where Id_Editora=?',
            [edi.Editora, id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const delById = async (id) => {
    try {
        const result = await connection.execute(
            "delete from editora where Id_Editora=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
}

module.exports = {
    create,
    getById,
    delById,
    alter,
    getAll
};