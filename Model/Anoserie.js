const connection = require('../database/connection');
const create = async (as) => {
    try {
        console.log(as);
        const result = await connection.execute('INSERT INTO turma (Turma) VALUES (?)',[as.Turma]);
        const result2 = await connection.execute('INSERT INTO anoserie (AnoSerie,Id_Turma) VALUES (?,?)',[as.Anoserie,result[0].insertId]);
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