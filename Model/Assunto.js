const connection = require('../database/connection');

const getAll = async () => {
    try {

        const result = await connection.execute('select * from assunto');
        return result[0];
    } catch (error) {
        return null;
    }
};

const create = async (asu) => {
    try {
        console.log("sql")
        const result = await connection.execute(
            'INSERT INTO assunto (Nome) VALUES (?)',
            [asu.Assunto]
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
            "select * from assunto where Id_Assunto=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const getByIdAssuntoTitulo = async (id) => {
    try {
        const result = await connection.execute(
            "select * from assunto_do_titulo where Id_Assunto=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const getAssuntoTitulo = async () => {
    try {
        const result = await connection.execute(
            "select * from assunto_do_titulo"
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const alter = async (asu, id) => {
    try {
        const result = await connection.execute(
            'update assunto set Nome=? where Id_Assunto=?',
            [asu.Assunto, id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const delById = async (id) => {
    try {
        const result = await connection.execute(
            "delete from assunto where Id_Assunto=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
}

const pesq = async (info) => {
        sql = "select * from assunto where Nome=?";
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
    pesq,
    delById,
    alter,
    getAll,
    getByIdAssuntoTitulo,
    getAssuntoTitulo
};