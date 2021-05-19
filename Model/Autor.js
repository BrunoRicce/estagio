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
        const result = await connection.execute('select * from autor');
        return result[0];
    } catch (error) {
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

module.exports = {
    create,
    getById,
    delById,
    alter,
    getAll
};