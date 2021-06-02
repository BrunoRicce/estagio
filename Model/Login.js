const connection = require('../database/connection');
const loginProf = async (prof) => {
    try {
        const result = await connection.execute(
            'select * from professor where Cpf=? and Senha=?',
            [prof.Login, prof.Senha]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        console.log("executou o catch");
        return null;
    }
};

const loginAlu = async (alu) => {
    try {
        const result = await connection.execute(
            'select * from aluno where RA=? and Senha=?',
            [alu.Login, alu.Senha]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result[0];
    } catch (error) {
        console.log("executou o catch");
        return null;
    }
};

module.exports = {
    loginAlu,
    loginProf
};