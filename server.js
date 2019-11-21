var express = require('express'); 
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 8888;
var app = express();

//setting view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//setting static Folder for keeping all angular 222 stuffs
app.use(express.static(path.join(__dirname, 'client')));

// Body parser middleware sample
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//url routes for displaying 
app.use('/', index);
app.use('/api', tasks);

app.listen(port, function(){
    console.log('Success! Server started on port: ' + port);
});