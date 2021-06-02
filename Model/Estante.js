const connection = require('../database/connection');

const getAll = async () => {
    try {

        const result = await connection.execute("select * from estante");
        return result[0];
    } catch (error) {
        return null;
    }
};

const getMaiorQtd = async () => {
    try {
        const result = await connection.execute('SELECT o.* FROM prateleira o LEFT JOIN prateleira b ON o.Id_Estante = b.Id_Estante AND o.Descricao < b.Descricao WHERE b.Descricao is NULL');
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
            "SELECT Id_Estante, MAX(Descricao) as Descricao FROM prateleira WHERE Id_Estante = ? GROUP BY Id_Estante",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const getByIdQtd2 = async (ide, desc) => {
    try {
        const result = await connection.execute(
            "SELECT *  FROM prateleira WHERE Id_Estante = ? and Descricao=?",
            [ide,desc]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const getMinPrat = async () => {
    try {
        const result = await connection.execute(
            "SELECT prateleira.Id_Estante, MAX(Descricao) as Qtd FROM exemplar INNER JOIN prateleira ON exemplar.Id_Prateleira = prateleira.Id_Prateleira GROUP BY prateleira.Id_Estante;"
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const create = async (est) => {
    try {
        const result = await connection.execute('INSERT INTO estante (Descricao) VALUES (?)', [est.Descricao]);
        //await connection.execute('INSERT INTO prateleira (Descricao, Id_Estante) VALUES (?,?)', [est.Qtd, result[0].insertId]);
        for (let i = 0; i < Number(est.Qtd); i++)
            await connection.execute('INSERT INTO prateleira (Descricao, Id_Estante) VALUES (?,?)', [i + 1, result[0].insertId]);
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

const alter = async (est, id, qtd_aux) => {
    try {
        console.log("Alter")
        let cont = Number(est.Qtd) - qtd_aux;
        for (let i = 0; i < cont; i++)
        {
            let soma = qtd_aux+i+1;
            console.log("Soma: "+ soma);
            await connection.execute('INSERT INTO prateleira (Descricao, Id_Estante) VALUES (?,?)', [soma, id]);
        } 
        await connection.execute('update estante set Descricao=? where Id_Estante=?', [est.Descricao, id]);
        return null;
    } catch (error) {
        return null;
    }
};

const alter2 = async (est, id, qtd_aux) => {
    try {
        console.log("Alter2")
        let cont = qtd_aux - Number(est.Qtd);
        for (let i = 0; i < cont; i++)
        {
            let soma = qtd_aux-(i);
            console.log("Soma: "+ soma);
            await connection.execute('delete from prateleira where Id_Estante=? and Descricao=?', [id,soma]);
        } 
        await connection.execute('update estante set Descricao=? where Id_Estante=?', [est.Descricao, id]);
        return null;
    } catch (error) {
        return null;
    }
};

const delById = async (id) => {
    try {
        await connection.execute("delete from prateleira where Id_Estante=?", [id]);
        const result = await connection.execute("delete from estante where Id_Estante=?", [id]);
        return result[0];
    } catch (error) {
        console.log('cath');
        return null;
    }
}

const pesq = async (info, rbpesq) => {
    let sql = "select * from estante where Descricao=?";
    try {
        const result = await connection.execute(sql, [info]);
        return result[0];
    } catch (error) {
        return null;
    }
}
module.exports = {
    create,
    pesq,
    getById,
    getByIdQtd,
    getQtd,
    delById,
    alter,
    getAll,
    getMaiorQtd,
    alter2,
    getByIdQtd2,
    getMinPrat
};