
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var addpage = require('./routes/addpage');
var goal = require('./routes/goal');
var month = require('./routes/month');
var profile = require('./routes/profile');
var tips = require('./routes/tips');
var food = require('./routes/food');
var waste = require('./routes/waste');
var login = require('./routes/login');
var addgoalpage = require('./routes/addgoalpage');
var commute = require('./routes/commute');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', login.view);
app.get('/index', index.view);
app.get('/goal', goal.view);
app.get('/month', month.view);
app.get('/profile', profile.view);
app.get('/tips', tips.view);
app.get('/addpage', addpage.view);
app.get('/food', food.view);
app.get('/waste', waste.view);
app.get('/addgoalpage', addgoalpage.view);
app.get('/commute', commute.view);
// Example route
//app.get('/addgoal', add.addGoal);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
