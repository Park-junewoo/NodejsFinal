var express = require('express');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path');
var app = express();

var player = require('./routes/player');

var db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'soccerplayer'
});

// connect to database
db.connect(function(err){
    if (err) {console.log('DB error');}
    else{console.log('DB Connected');}
});
global.db = db;   //전역변수 선언

// configure middleware
app.set('views', __dirname + '/views'); // ejs 렌더링 경로
app.set('view engine', 'ejs'); // ejs 템플릿 사용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // json 데이터 형식
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload()); // configure fileupload


// routes
app.use("/", require("./routes/home"));
app.get('/home', require('./routes/index'));
app.get('/add',player);
app.get('/edit/:id', player);
app.get('/delete/:id', player);
app.post('/add', player);
app.post('/edit/:id', player);

// port
var port = 3000;
app.listen(port, function(){
  console.log("server on! http://localhost:"+port);
});
