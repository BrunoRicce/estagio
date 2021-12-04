const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: "localhost",
    user: "remote2",
    password: "*fdgr132COYjhq",
    database: "slw",
    //multipleStatements: true
});

module.exports = connection;