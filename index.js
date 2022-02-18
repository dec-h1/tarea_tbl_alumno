const express = require('express');
const app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.json());

app.get('/', function (req, res) {
    res.send({
        'status': true,
        'content': 'Bienvenido a mi API ALUMNOS'
    });
});

const mysqlConnection = require('./database');

app.get('/alumno', function (req, res) {
    mysqlConnection.query('SELECT * FROM tbl_alumno', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/alumno', function (req, res) {
    const {alumno_nombre,alumno_email} = req.body;
    const query = `insert into tbl_alumno(alumno_nombre,alumno_email) values(?,?)`;

    mysqlConnection.query(query,[alumno_nombre,alumno_email],(err,rows,fields)=>{
        if(!err){
            res.json({
                status:true,
                message:'Se inserto correctamente el alumno'
            });
        }else{
            console.log(err);
        }
    })
});

app.put('/alumno/:id',function (req, res) {
    const {alumno_nombre,alumno_email} = req.body;
    const {id} = req.params;
    const query = `update tbl_alumno set alumno_nombre = ?, alumno_email = ? where alumno_id = ?`;
    mysqlConnection.query(query,[alumno_nombre,alumno_email,id],(err,rows,fields)=>{
        if(!err){
            res.json({
                status:true,
                message:'Se actualizo correctamente el alumno'
            });
        }else{
            console.log(err);
        }
    })
});

app.delete('/alumno/:id',function (req, res) {
    const {id} = req.params;
    const query = `delete from tbl_alumno where alumno_id = ?`;
    mysqlConnection.query(query,[id],(err,rows,fields)=>{
        if(!err){
            res.json({
                status:true,
                message:'Se elimino correctamente el alumno'
            });
        }else{
            console.log(err);
        }
    })
})

app.listen(app.get('port'),()=>{
    console.log(`Server running at http://localhost:${app.get('port')}`);
})