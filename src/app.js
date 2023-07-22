const express = require('express');
const {engine} = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const tasksRoutes = require('./routes/tasks');

const app = express();
app.set('port', 5000);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'ElMartin',
    port: 3306,
    database:'crudnodejs'
}, 'single'));

app.set('views', __dirname+'/views');
app.engine('.hbs', engine({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.listen(app.get('port'), ()=>{
    console.log('Listening on port ',app.get('port'));
});

app.use('/', tasksRoutes);

app.get('/', (req, res)=>{
    req.prependListener('home');
});