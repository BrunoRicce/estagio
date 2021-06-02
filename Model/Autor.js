const connection = require('../database/connection');

const getAll = async () => {
    try {
        const result = await connection.execute('select * from autor');
        return result[0];
    } catch (error) {
        return null;
    }
};

const create = async (aut) => {
    try {
        const result = await connection.execute(
            'INSERT INTO autor (Nome) VALUES (?)',
            [aut.Autor]
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
            "select * from autor where Id_Autor=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const getByIdAutorTitulo = async (id) => {
    try {
        const result = await connection.execute(
            "select * from autor_do_titulo where Id_Autor=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};


const alter = async (aut, id) => {
    try {
        const result = await connection.execute(
            'update autor set Nome=? where Id_Autor=?',
            [aut.Autor, id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const delById = async (id) => {
    try {
        const result = await connection.execute(
            "delete from autor where Id_Autor=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
}

const pesq = async (info) => {
    sql = "select * from autor where Nome=?";
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
    create,
    getById,
    delById,
    pesq,
    alter,
    getAll,
    getByIdAutorTitulo
};