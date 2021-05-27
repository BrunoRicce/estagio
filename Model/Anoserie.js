const connection = require('../database/connection');
const create = async (as,  idt) => {
    try {
        if (idt == null) {
            const result = await connection.execute('INSERT INTO turma (Turma) VALUES (?)', [as.Turma]);
            await connection.execute('INSERT INTO anoserie (AnoSerie,Id_Turma) VALUES (?,?)', [as.Anoserie, result[0].insertId]);
        }
        else
            await connection.execute('INSERT INTO anoserie (AnoSerie,Id_Turma) VALUES (?,?)', [as.Anoserie, idt]);
        return null;
    } catch (error) {
        console.log(error);
        //console.log("executou o catch do create em Aluno.js");
        return null;
    }
};
const getAll = async () => {
    try {
        const result = await connection.execute('select * from anoserie');
        return result[0];
    } catch (error) {
        return null;
    }
};
const getAllTurma = async () => {
    try {
        const result = await connection.execute('select * from turma');
        return result[0];
    } catch (error) {
        return null;
    }
};

const getById = async (id) => {
    try {
        const result = await connection.execute(
            "select * from anoserie where Id_AnoSerie=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const getByIdTurma = async (id) => {
    try {
        const result = await connection.execute(
            "select * from turma where Id_Turma=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const delById = async (id) => {
    try {
        const result =await connection.execute("delete from anoserie where Id_AnoSerie=?", [id]);
        return result[0];
    } catch (error) {
        console.log('esse cath');
        return null;
    }
}

const alter = async (as, idt, id) => {
    try {
        if (idt == null) {
            const result = await connection.execute('INSERT INTO turma (Turma) VALUES (?)', [as.Turma]);
            await connection.execute('update anoserie set AnoSerie=?, Id_Turma=? where Id_AnoSerie=?', [as.Anoserie, result[0].insertId,id]);
        }
        else
            await connection.execute('update anoserie set AnoSerie=?, Id_Turma=? where Id_AnoSerie=?', [as.Anoserie, idt, id]);
        return null;
    } catch (error) {
        return null;
    }
};

module.exports = {
    create,
    getAll,
    getAllTurma,
    getById,
    getByIdTurma,
    delById,
    alter
};