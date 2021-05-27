const connection = require('../database/connection');

const getAll = async () => {
    try {

        const result = await connection.execute('select * from titulo');
        return result[0];
    } catch (error) {
        return null;
    }
};

const delById = async (id) => {
    try {
        const result = await connection.execute(
            "delete from titulo where Id_Titulo=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
}

const getById = async (id) => {
    try {
        const result = await connection.execute(
            "select * from titulo where Id_Titulo=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const getAutorById = async (id) => {
    try {
        const result = await connection.execute(
            "select * from autor_do_titulo where Id_Titulo=?",
            [id]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const getAssuntoById = async (id) => {
    try {
        const result = await connection.execute(
            "select * from assunto_do_titulo where Id_Titulo=?",
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


const getAutor = async (id) => {
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

const getAssunto = async (id) => {
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

const create = async (titulo) => {//{ Nome, RA, Senha, Telefone, Email, Endereco }
    try {
        const result = await connection.execute(
            'INSERT INTO titulo (Id_Editora, Titulo, Ano_Publicacao, Qtd_total, Qtd_Disponivel) VALUES (?,?,?,?,?)',
            [titulo.Editora, titulo.Titulo, titulo.Anop, titulo.Qtd, titulo.Qtd]
        );
        await connection.execute(
            'INSERT INTO autor_do_titulo (Id_Autor, Id_Titulo) VALUES (?,?)',
            [titulo.Autor, result[0].insertId]
        );
        await connection.execute(
            'INSERT INTO assunto_do_titulo (Id_Assunto, Id_Titulo) VALUES (?,?)',
            [titulo.Assunto, result[0].insertId]
        );
        return result[0];
    } catch (error) {
        return null;
    }
};

const alter = async (titulo, id,  qtd_aux) => {//{ Nome, RA, Senha, Telefone, Email, Endereco }
     try {
        if(qtd_aux<Number(titulo.Qtd))//só é valido quando aumenta | Qnado dimuir é so inserir
        {
            let cont = Number(titulo.Qtd)- qtd_aux;
            titulo.Qtddis = Number(titulo.Qtddis) + cont;
        }
        const result = await connection.execute(
            'update titulo set Id_Editora=?, Titulo=?, Ano_Publicacao=?, Qtd_total=?, Qtd_Disponivel=? where Id_Titulo=?',
            [titulo.Editora, titulo.Titulo, titulo.Anop, titulo.Qtd, titulo.Qtddis, id]
        );
        await connection.execute(
            'INSERT INTO autor_do_titulo (Id_Autor, Id_Titulo) VALUES (?,?)',
            [titulo.Autor, id]
        );
        console.log("3");
        await connection.execute(
            'INSERT INTO assunto_do_titulo (Id_Assunto, Id_Titulo) VALUES (?,?)',
            [titulo.Assunto, id]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        //console.log("executou o catch do create em Aluno.js");
        return null;
    }
};

const pesq = async (info) => {
    let sql = "select * from titulo where Titulo=?";
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
    getAll,
    getById,
    delById,
    create,
    alter,
    pesq,
    getAutorById,
    getAssuntoById,
    getAutor,
    getAssunto,
    delAutorById,
    delAssuntoById
};