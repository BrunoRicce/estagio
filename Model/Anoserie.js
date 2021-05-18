const connection = require('../database/connection');
const create = async (as) => {
    try {
        console.log(as);
        const result = await connection.execute(
            'INSERT INTO turma (Turma) VALUES (?)',
            [as.Turma]
        );
        const result2 = await connection.execute(
            'INSERT INTO turma (Turma) VALUES (?)',
            [as.Turma]
        );
        console.log("create banco");
        console.log(result);
        const result3 = await connection.execute(
            'INSERT INTO anoserie (AnoSerie) VALUES (?)',
            [as.Anoserie]
        );
        //console.log("executou o sql do create em Aluno.js");
        return result2[0];
    } catch (error) {
        console.log(error);
        //console.log("executou o catch do create em Aluno.js");
        return null;
    }
};

module.exports = {
    create
};