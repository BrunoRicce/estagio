const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const AlunoRouter = require('./routers/AlunoRouter');
const AnoserieRouter = require('./routers/AnoserieRouter');
const EditoraRouter = require('./routers/EditoraRouter');
const AssuntoRouter = require('./routers/AssuntoRouter');
const AutorRouter = require('./routers/AutorRouter');
const EstanteRouter = require('./routers/EstanteRouter');
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, "Control")))
app.use(express.static(path.join(__dirname, "css")))
app.use(express.static(path.join(__dirname, "icon")))
app.use(express.static(path.join(__dirname, "imgs")))
app.use(express.static(path.join(__dirname, "javascript")))
app.use(express.static(path.join(__dirname, "Model")))
app.use(express.static(path.join(__dirname, "Server")))
app.use(express.static(path.join(__dirname, "router")))
app.use(express.static(path.join(__dirname, "database")))

app.set("view engine", "ejs")
app.use('views', express.static(path.join(__dirname, "/views")))

app.get("/", (req, res) => {
    res.render('Login');
});
app.use('/autores', AutorRouter);
app.use('/alunos', AlunoRouter);
app.use('/anoserie', AnoserieRouter);
app.use('/editoras', EditoraRouter);
app.use('/assuntos', AssuntoRouter);
app.use('/estantes', EstanteRouter);


// const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "slw",
//     multipleStatements: true
// });


// GET /alunos - all alunos
// POST /alunos - create
// GET /alunos/:id - 1 aluno
// PATCH /alunos/:id - up 1 aluno
// DELETE /alunos/delete/:id - delete 1 aluno



// let alunos;
// let aluno = null;


// //get all aluno
// app.get("/alunos", (req, res) => {
//     db.query("select * from aluno", (err, alunoss) => {
//         if (!err) {
//             alunos = alunoss;
//             res.render('BAluno/BAlunoINS', { alunos });
//         }
//         else
//             console.log(err);
//     })
//     //callback promise
// });

// //insere aluno
// app.post("/alunos", (req, res) => {
//     let alunos = req.body;
//     console.log("alunos.Senha: " + alunos.Senha);
//     console.log("alunos.Nome: "+alunos.Nome);
//     console.log("alunos.ID: " + alunos.ID);
//     if ((alunos.Senha == ''))
//         alunos.Senha = Math.floor(Math.random() * 100000) + 10000;
//     if (alunos.ID == '')//(alunos.ID || alunos.ID != undefined)
//     {
//         const sql = 'INSERT INTO aluno (Nome, RA, Senha, Telefone, Email, Endereco, Estado) VALUES (?,?,?,?,?,?,?)';
//         const values = [alunos.Nome, alunos.RA, alunos.Senha, alunos.Telefone, alunos.Email, alunos.Endereco, 0];
//         db.query(sql, values, (err, result) => {
//             if (!err)
//                 console.log(result);
//             else
//                 console.log(err);
//         })
//     }
//     res.redirect("/alunos");
// });

// //att aluno
// app.patch("/alunos/:id", (req, res) => {
//     console.log('att aluno');
//     let data = req.body;
//     const { id } = req.params;
//     const sql = "update aluno set Nome=?, RA=?, Senha=?, Telefone=?, Email=?, Endereco=?, Estado=? where Id_Aluno=?";
//     const values = [data.Nome, data.RA, data.Senha, data.Telefone, data.Email, data.Endereco, 0, id];
//     db.query(sql, values, (err, aluno) => {
//         if (!err) {
//             console.log("aluno " + id + " alterado");
//         }
//         else
//             console.log(err);
//     })
//     res.redirect("/alunos");
// });

// app.get("/alunos/pesq", (req, res) => {
//     console.log('pesq aluno');
//     console.log('req.body.rbpesq: '+req.body.rbpesq);
//     console.log('req.body.Pesq: '+req.body.Pesq);
//     console.log('req.body.Rbra: '+req.body.Rbra);
//     let sql;
//     // if (req.body.rbpesq || req.body.rbpesq != undefined) {
//     //     if (req.body.rbpesq=='Rbra' )
//     //         sql = "select * from aluno where RA=?";

//     //     if (req.body.rbpesq=='Rbnome' )
//     //         sql = "select * from aluno where Nome=?";

//     //     if (req.body.rbpesq=='Rbanoserie')
//     //         sql = "select * from aluno where Id_Aluno=?";//ano e serie tem que buscar em um lugar diferente


//     //     db.query(sql, req.body.Pesq, (err, alunos) => {
//     //         if (!err) {
//     //             console.log(alunos)
//     //             res.render('BAluno/BAlunoINS', {alunos});
//     //         }
//     //         else
//     //             console.log(err);
//     //     })
//     // }

// });

// //selec aluno
// app.get("/alunos/:id", (req, res) => {
//     console.log('select aluno');
//     const { id } = req.params;
//     const sql = "select * from aluno where Id_Aluno=?";
//     const values = id;
//     db.query(sql, id, (err, aluno) => {
//         if (!err) {
//             res.render('BAluno/BAlunoALT', { aluno, alunos });
//         }
//         else
//             console.log(err);
//     })
// });

// app.delete("/alunos/:id", (req, res) => {
//     console.log("Delete Aluno");
//     const { id } = req.params;
//     const sql = "delete from aluno where Id_Aluno=?";
//     const values = id;
//     db.query(sql, id, (err, aluno) => {
//         if (!err) {
//             console.log("aluno " + id + " excluido");
//         }
//         else
//             console.log(err);
//     })
//     res.redirect("/alunos");
// })


app.listen(3000, () => {
    console.log("Express server na porta 3000");
});

