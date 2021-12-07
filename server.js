const express = require("express");
const path = require("path");
const session = require("express-session");
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
const LoginRouter = require('./routers/LoginRouter');
const LogoutRouter = require('./routers/LogoutRouter');
const PExemplarRouter = require('./routers/PExemplares');
const REmprestimoRouter = require('./routers/REmprestimoRouter');
const RDevolucaoRouter = require('./routers/RDevolucaoRouter');
const RProfessoresRouter = require('./routers/RProfessoresRouter');
const FRAlunoRouter = require('./routers/FRAlunoRouter');
const FRProfessoresVisRouter = require('./routers/FRProfessoresVisRouter');
const FRComentarioRouter = require('./routers/FRComentarioRouter');
const FAComentarioRouter = require('./routers/FAComentarioRouter');
const FAComentarioVisRouter = require('./routers/FAComentarioVisRouter');
const SLocalizacaoRouter = require('./routers/SLocalizacaoRouter');
const SDevolucaoRouter = require('./routers/SDevolucaoRouter');
const SDisponivelRouter = require('./routers/SDisponivelRouter');
const SHistoricoRouter = require('./routers/SHistoricoRouter');
const SLeitorRouter = require('./routers/SLeitorRouter');
const SLivrosLidosRouter = require('./routers/SLivrosLidosRouter');


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
const sessionOP = {
    secret: 'connnect',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24
    }
}
app.use(session(sessionOP))
//flash na aula 482
app.set("view engine", "ejs")
app.use('views', express.static(path.join(__dirname, "/views")))

app.use('/login', LoginRouter);
app.use('/logout', LogoutRouter);
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
app.use('/pesqexemplares', PExemplarRouter);
app.use('/regemprestimo', REmprestimoRouter);
app.use('/regdevolucao', RDevolucaoRouter);
app.use('/regrequisicoes', RProfessoresRouter);
app.use('/recaluno', FRAlunoRouter);
app.use('/requisicoesvis', FRProfessoresVisRouter);
app.use('/regcomentario', FRComentarioRouter);
app.use('/anacomentario', FAComentarioRouter);
app.use('/viscomentario', FAComentarioVisRouter);
app.use('/localizacoes', SLocalizacaoRouter);
app.use('/devolucoes', SDevolucaoRouter);
app.use('/disponiveis', SDisponivelRouter);
app.use('/historico', SHistoricoRouter);
app.use('/melhorleitor', SLeitorRouter);
app.use('/livrosmaislidos', SLivrosLidosRouter);

app.listen(80, () => {
    console.log("Express server na porta 80");
});

