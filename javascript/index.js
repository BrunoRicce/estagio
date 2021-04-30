(async function tableLoad(){
    const bd = require("../bd");
    console.log("Começou!");
    // console.log("Incert aluno");
    // await bd.setAluno({nome: "ze", login:"123", senha:"123"});
    
    // console.log("Update aluno");
    // await bd.updAluno({nome: "ze up", login:"123", senha:"123", id:2});

    // console.log("Delete from aluno");
    // await bd.delAluno(3);

    console.log("select * from aluno");
    const alu = await bd.getAllAluno();
    console.log(alu[0].Nome);

})();