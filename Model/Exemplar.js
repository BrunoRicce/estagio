const connection = require('../database/connection');

const getAll = async () => {
    try {

        const result = await connection.execute('select * from exemplar');
        return result[0];
    } catch (error) {
        return null;
    }
};

const delById = async (id,idt,qtdd,qtdt) => {
    try {
        const result = await connection.execute(
            "delete from exemplar where Id_Exemplar=?",
            [id]
        );
        await connection.execute(//alter qtd exem
            'update titulo set Qtd_total=?, Qtd_Disponivel=? where Id_Titulo = ?',
            [qtdt, qtdd, idt]
        );
        return result[0];
    } catch (error) {
        return null;
    }
}

const getById = async (id) => {
    try {
        const result = await connection.execute(
            "select * from exemplar where Id_Exemplar=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const getByIdPrateleira = async (id) => {
    try {
        const result = await connection.execute(
            "select * from exemplar where Id_Prateleira=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const delAutorById = async (id) => {
    try {
        const result = await connection.execute(
            "delete from autor_do_titulo where Id_Titulo=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const delAssuntoById = async (id) => {
    try {
        const result = await connection.execute(
            "delete from assunto_do_titulo where Id_Titulo=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};
  

const create = async (exem, idp, qtdt, qtdd) => {
    try {
        const result = null;
        for(let i =0; i< Number(exem.Qtd);i++)
        await connection.execute(
            'INSERT INTO exemplar (Id_Titulo, Id_Prateleira, Ano_compra, Emprestado) VALUES (?,?,?,?)',
            [ exem.Titulo, idp, exem.Anoc,0]//0= não emprestado/ 1=emprestado
        );
        await connection.execute(//alter qtd exem
            'update titulo set Qtd_total=?, Qtd_Disponivel=? where Id_Titulo = ?',
            [qtdt, qtdd, exem.Titulo]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const alter = async (exem, idprat, id) => {
     try {
        const result = await connection.execute(
            'update exemplar set Id_Titulo=?, Id_Prateleira=?, Ano_compra=? where Id_Exemplar=?',
            [ exem.Titulo, idprat, exem.Anoc, id]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        //console.log("executou o catch do create em Aluno.js");
        return null;
    }
};

const alterEstado = async (exem, est) => {
    try {
       const result = await connection.execute(
           'update exemplar set Emprestado=? where Id_Exemplar=?',
           [ est, exem.Id_Exemplar]
       );
       //console.log("executou o sql do create em Aluno.js");
       return result[0];
   } catch (error) {
       //console.log("executou o catch do create em Aluno.js");
       return null;
   }
};


const pesq = async (info) => {
    let sql = "select * from exem where Titulo=?";
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
const delByTituloId = async (id) => {
    try {
        const result = await connection.execute(
            "delete from exemplar where Id_Titulo=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const getDiponiveis= async () => {
    try {
        const result = await connection.execute("select * from exemplar WHERE Emprestado =0");
        return result[0];
    } catch (error) {
        return null;
    }
};

module.exports = {
    getAll,
    getById,
    delById,
    create,
    alter,
    pesq,
    delAutorById,
    delAssuntoById,
    delByTituloId,
    getByIdPrateleira,
    alterEstado,
    getDiponiveis
};