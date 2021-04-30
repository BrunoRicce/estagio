const express = require("express");
const path = require("path");
// const bodyParser = require('body-parser');
// const cors = require('cors');
const app = express();
const mysql = require("mysql");

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "slw",
    multipleStatements: true
});

// GET /alunos - all alunos
// POST /alunos - create
// GET /alunos/:id - 1 aluno
// PATCH /alunos/:id - up 1 aluno
// DELETE /alunos/:id - delete 1 aluno

app.use(express.static(path.join(__dirname,"Control")))
app.use(express.static(path.join(__dirname,"css")))
app.use(express.static(path.join(__dirname,"icon")))
app.use(express.static(path.join(__dirname,"imgs")))
app.use(express.static(path.join(__dirname,"javascript")))
app.use(express.static(path.join(__dirname,"Model")))
app.use(express.static(path.join(__dirname,"Server")))

app.set("view engine","ejs")
app.use('views', express.static(path.join(__dirname,"/views")))

const alu = [
    {
        Id: 1,
        RA: '123',
        Nome: 'jose1',
        Estado: '0'
    },
    {
        Id: 2,
        RA: '1234',
        Nome: 'jose2',
        Estado: '0'
    },
    {
        Id: 3,
        RA: '12345',
        Nome: 'jose3',
        Estado: '0'
    }
]

//get all aluno
app.get("/alunos",(req,res)=>{
    var arrayAlu=[];
    let alunoss;
    db.query("select * from aluno",(err,alunos)=>{
        //tentativa de converção para json
        for(let a of alunos)
        arrayAlu.push({Id_Aluno:a.Id_Aluno, Nome: a.Nome, Estado:a.Estado, RA: a.RA});
        if(!err)
        {
            console.log(alunos);
            //tentativa de converção para json
            // alunoss = JSON.parse(arrayAlu);
            // console.log(alunoss);
        }
        else
        console.log(err);
    })
    res.render('BAluno',{arrayAlu});
});

//insere aluno
app.post("/alunos",(req,res)=>{
    let alunos = req.body;
    console.log(req.body);
    alunos.Senha='123';
    const sql = 'INSERT INTO aluno (Nome, RA, Senha, Telefone, Email, Endereco, Estado) VALUES (?,?,?,?,?,?,?)';
    const values = [alunos.Nome,alunos.RA, alunos.Senha,alunos.Telefone,alunos.Email,alunos.Endereco,0];
    db.query(sql,values,(err,result)=>{
        if(!err)
        console.log(result);
        else
        console.log(err);
    })
    res.redirect("/alunos");
});

//selec aluno
app.get("/alunos/:id",(req,res)=>{
    const {id} = req.params;//peganfo o id da url
    const alun= alu.find(a => a.Id === parseInt(id));
    console.log(alun);
    res.render('BAluno',{alun});
});

//att aluno
app.patch("/alunos/:id",(req,res)=>{
    const {id} = req.params;
    const selec= alu.find(a => a.Id === parseInt(id));
    alun.Nome = selec.Nome;
    alun.RA = selec.RA;
    console.log(alun);
    res.render('BAluno',{alun});
});

app.listen(3000,()=>{
    console.log("Express server na porta 3000");
});

