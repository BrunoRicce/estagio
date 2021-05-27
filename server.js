const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const AlunoRouter = require('./routers/AlunoRouter');
const AnoserieRouter = require('./routers/AnoserieRouter');
const EditoraRouter = require('./routers/EditoraRouter');
const AssuntoRouter = require('./routers/AssuntoRouter');
const AutorRouter = require('./routers/AutorRouter');
const EstanteRouter = require('./routers/EstanteRouter');
const ProfessorRouter = require('./routers/ProfessorRouter');
const MenuRouter = require('./routers/MenuRouter');
const TituloRouter = require('./routers/TituloRouter');
const ExemplarRouter = require('./routers/ExemplarRouter');
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
//express session ou jwt
app.get("/", (req, res) => {
    res.render('Login');
});
app.use('/autores', AutorRouter);
app.use('/alunos', AlunoRouter);
app.use('/anoseries', AnoserieRouter);
app.use('/editoras', EditoraRouter);
app.use('/assuntos', AssuntoRouter);
app.use('/estantes', EstanteRouter);
app.use('/professores', ProfessorRouter);
app.use('/Menu', MenuRouter);
app.use('/titulos', TituloRouter);
app.use('/exemplares', ExemplarRouter);

app.listen(3000, () => {
    console.log("Express server na porta 3000");
});

