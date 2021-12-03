const connection = require('../database/connection');

const create = async (prof, titu, anse, desc, dtre, dten) => {
    try {
        const result = await connection.execute(
            'INSERT INTO requisicao ( Id_Titulo, Id_Professor, Id_AnoSerie, Descricao, Dt_Requisicao, Dt_Encerramento) VALUES (?,?,?,?,?,?)',
            [ titu, prof.Id_Professor, anse, desc, dtre, dten]
        );
        
        return result[0];
    } catch (error) {
        console.log("Entrou no catch do create do Requisicao")
        return null;
    }
};

const getByProfId = async (id) => {
    try {
        const result = await connection.execute(
            "select * from requisicao where Id_Professor=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const getByAnoSerieId = async (id) => {
    try {
        const result = await connection.execute(
            "select * from requisicao where Id_AnoSerie=?",
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
            "select * from requisicao where Id_Requisicao=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const delById = async (id) => {
    try {
        const result = await connection.execute(
            "delete from requisicao where Id_Requisicao=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

module.exports = {
    create,
    getByProfId,
    getByAnoSerieId,
    getById,
    delById
};