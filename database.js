const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_matricula'
});
mysqlConnection.connect(function (err) {
    if(err){
        console.error(err);
        return;
    }
    else{
        console.log('DB connected');
    }
});

module.exports = mysqlConnection;