-- 0=n deve 1= deve
DROP DATABASE slw;

CREATE DATABASE slw;

USE slw;

CREATE TABLE `Aluno` (
	`Id_Aluno` INT NOT NULL AUTO_INCREMENT,
	`Nome` VARCHAR(80) NOT NULL COLLATE 'utf8_general_ci',
	`RA` VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`Senha` VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Telefone` VARCHAR(25) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Email` VARCHAR(45) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Endereco` VARCHAR(80) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Estado` INT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`Id_Aluno`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
-- na img serie
CREATE TABLE `Turma` (
	`Id_Turma` INT NOT NULL AUTO_INCREMENT,
	`Descricao` VARCHAR(45)  NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`Turma` VARCHAR(2) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`Id_Turma`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
-- na img ano
CREATE TABLE `AnoSerie` (
	`Id_AnoSerie` INT NOT NULL AUTO_INCREMENT,
	`AnoSerie` VARCHAR(2) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Id_Turma` INT NOT NULL,
    `Id_Aluno` INT,
	PRIMARY KEY (`Id_AnoSerie`) USING BTREE,
    FOREIGN KEY (Id_Turma) REFERENCES Turma(Id_Turma),
    FOREIGN KEY (Id_Aluno) REFERENCES Aluno(Id_Aluno)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
-- 0=INATIVO 1=ATIVO , 0 PROFESSOR 1 RSL 2 ADM
CREATE TABLE `Professor` (
	`Id_Professor` INT NOT NULL AUTO_INCREMENT,
	`Nome` VARCHAR(80) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Cpf` VARCHAR(15) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Senha` VARCHAR(30) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Ativo` INT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Tipo_Acesso` INT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Endereco` VARCHAR(80) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Telefone` VARCHAR(25) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Email` VARCHAR(45) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`Id_Professor`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `Editora` (
	`Id_Editora` INT NOT NULL AUTO_INCREMENT,
	`Nome` VARCHAR(80) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`Id_Editora`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `Titulo` (
	`Id_Titulo` INT NOT NULL AUTO_INCREMENT,
    `Id_Editora` INT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Titulo` VARCHAR(80) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Ano_Publicacao` VARCHAR(15) NULL DEFAULT NULL,
    `Qtd_total` INT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Qtd_Disponivel` INT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`Id_Titulo`) USING BTREE,
    FOREIGN KEY (Id_Editora) REFERENCES Editora(Id_Editora)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `Autor` (
	`Id_Autor` INT NOT NULL AUTO_INCREMENT,
	`Nome` VARCHAR(80) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`Id_Autor`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `Autor_do_Titulo` (
	`Id_Autor` INT NOT NULL,
	`Id_Titulo` INT NOT NULL,
    PRIMARY KEY (Id_Autor, Id_Titulo),
	FOREIGN KEY (Id_Autor) REFERENCES Autor(Id_Autor),
    FOREIGN KEY (Id_Titulo) REFERENCES Titulo(Id_Titulo)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `Assunto` (
	`Id_Assunto` INT NOT NULL AUTO_INCREMENT,
	`Nome` VARCHAR(80) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`Id_Assunto`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `Assunto_do_Titulo` (
	`Id_Assunto` INT NOT NULL,
	`Id_Titulo` INT NOT NULL,
    PRIMARY KEY (Id_Assunto, Id_Titulo),
	FOREIGN KEY (Id_Assunto) REFERENCES Assunto(Id_Assunto),
    FOREIGN KEY (Id_Titulo) REFERENCES Titulo(Id_Titulo)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `Estante` (
	`Id_Estante` INT NOT NULL AUTO_INCREMENT,   
	`Descricao` VARCHAR(45) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`Id_Estante`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `Prateleira` (
	`Id_Prateleira` INT NOT NULL AUTO_INCREMENT,   
	`Descricao` INT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Id_Estante` INT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`Id_Prateleira`) USING BTREE,
    FOREIGN KEY (Id_Estante) REFERENCES Estante(Id_Estante)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
-- 0=não emprestado 1=emprestado
CREATE TABLE `Exemplar` (
	`Id_Exemplar` INT NOT NULL AUTO_INCREMENT,
    `Id_Titulo` INT NOT NULL,
    `Id_Prateleira` INT NOT NULL,
    `Emprestado` INT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`Ano_compra` VARCHAR(50) NULL DEFAULT NULL,

	PRIMARY KEY (`Id_Exemplar`) USING BTREE,
    FOREIGN KEY (Id_Titulo) REFERENCES Titulo(Id_Titulo),
    FOREIGN KEY (Id_Prateleira) REFERENCES Prateleira(Id_Prateleira)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `Requisicao` (
	`Id_Requisicao` INT NOT NULL AUTO_INCREMENT,
    `Id_Titulo` INT NOT NULL,
    `Id_Professor` INT NOT NULL,
    `Id_AnoSerie` INT NOT NULL,
    `Descricao` VARCHAR(80) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`Dt_Requisicao` DATETIME NULL DEFAULT NULL,
    `Dt_Encerramento` DATETIME NULL DEFAULT NULL,

	PRIMARY KEY (`Id_Requisicao`) USING BTREE,
    FOREIGN KEY (Id_Titulo) REFERENCES Titulo(Id_Titulo),
    FOREIGN KEY (Id_Professor) REFERENCES Professor(Id_Professor),
    FOREIGN KEY (Id_AnoSerie) REFERENCES AnoSerie(Id_AnoSerie)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `Exemplar_Emprestado` (
	`Id_Exemplar_Emprestado` INT NOT NULL AUTO_INCREMENT,
    `Id_Exemplar` INT NOT NULL,
    `Id_Aluno` INT,
    `Id_Professor` INT,
	`Dt_Emprestimo` DATETIME NULL DEFAULT NULL,
    `Dt_Encerramento` DATETIME NULL DEFAULT NULL,
    `Observacao` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8_general_ci',

	PRIMARY KEY (`Id_Exemplar_Emprestado`) USING BTREE,
    FOREIGN KEY (Id_Exemplar) REFERENCES Exemplar(Id_Exemplar),
    FOREIGN KEY (Id_Aluno) REFERENCES Aluno(Id_Aluno),
    FOREIGN KEY (Id_Professor) REFERENCES Professor(Id_Professor)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
-- visivel 0=n 1=s | aprovado 0=n 1=s
CREATE TABLE `Comentario` (
	`Id_Comentario` INT NOT NULL AUTO_INCREMENT,
    `Id_Titulo` INT NOT NULL,
    `Id_Aluno` INT,
    `Id_Professor` INT,
    `Visivel` INT,
    `Aprovado` INT,
    `Observacao` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `Comentario` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`Dt_Publicacao` DATETIME NULL DEFAULT NULL,
    `Dt_Revisao` DATETIME NULL DEFAULT NULL,
    

	PRIMARY KEY (`Id_Comentario`) USING BTREE,
    FOREIGN KEY (Id_Titulo) REFERENCES Titulo(Id_Titulo),
    FOREIGN KEY (Id_Aluno) REFERENCES Aluno(Id_Aluno),
    FOREIGN KEY (Id_Professor) REFERENCES Professor(Id_Professor)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

ALTER TABLE aluno
  ADD Id_AnoSerie INT,
  ADD FOREIGN KEY (Id_AnoSerie) REFERENCES anoserie(Id_AnoSerie)

INSERT INTO estante (Descricao) VALUES ('Estante 1')
INSERT INTO prateleira (Descricao, Id_Estante) VALUES (1,1)
INSERT INTO prateleira (Descricao, Id_Estante) VALUES (1,2)

-- DROP TABLE `turma`