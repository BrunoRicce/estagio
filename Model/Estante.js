const connection = require('../database/connection');

const getAll = async () => {
    try {

        const result = await connection.execute('select * from estante');
        return result[0];
    } catch (error) {
        return null;
    }
};

const getQtd = async () => {
    try {
        const result = await connection.execute('select * from prateleira');
        return result[0];
    } catch (error) {
        return null;
    }
};

const getByIdQtd = async (id) => {
    try {
        const result = await connection.execute(
            "select * from prateleira where Id_Estante=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const create = async (est) => {
    try {
        const result = await connection.execute(
            'INSERT INTO estante (Descricao) VALUES (?)',
            [est.Descricao]);
        await connection.execute('INSERT INTO prateleira (Descricao, Id_Estante) VALUES (?,?)', [est.Qtd, result[0].insertId]);
        // for (let i = 0; i < Number(est.Qtd); i++)
        //     await connection.execute('INSERT INTO prateleira (Descricao, Id_Estante) VALUES (?,?)',[i+1,result[0].insertId]);
        return result[0];
    } catch (error) {
        console.log("executou o catch");
        return null;
    }
};

const getById = async (id) => {
    try {
        const result = await connection.execute(
            "select * from estante where Id_Estante=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const alter = async (est, id) => {
    try {
        const result = await connection.execute('update estante set Descricao=? where Id_Estante=?',[est.Descricao, id]);
        await connection.execute('update prateleira set Descricao=? where Id_Estante=?',[est.Qtd, id]);
        return result[0];
    } catch (error) {
        return null;
    }
};

const delById = async (id) => {
    try {
        await connection.execute("delete from prateleira where Id_Estante=?",[id]);
        const result = await connection.execute("delete from estante where Id_Estante=?",[id]);
        return result[0];
    } catch (error) {
        console.log('cath');
        return null;
    }
}

module.exports = {
    create,
    getById,
    getByIdQtd,
    getQtd,
    delById,
    alter,
    getAll
};