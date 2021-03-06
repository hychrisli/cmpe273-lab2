var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const passport = require('passport');

var index = require('./routes/index');
var swagger = require('./swagger');
var users = require('./controllers/users-ctrl');
var userSkills = require('./controllers/user-skills-ctrl');
var projs = require('./controllers/projs-ctrl');
var match = require('./controllers/match-ctrl');
var hire = require('./controllers/hire-ctrl');
var images = require('./controllers/images-ctrl');
var bids = require('./controllers/bids-ctrl');
var skills = require('./controllers/skills-ctrl');
var projSkills = require('./controllers/proj-skills-ctrl');
var projFiles = require('./controllers/proj-files-ctrl');
var sess = require('./controllers/session-ctrl');
var balance = require('./controllers/balance-ctrl');
var payment = require('./controllers/payment-ctrl');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({preserveExtension: true}));
//cors
const corsOptions = {
  credentials: true,
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowHeaders:['Authorization', 'API-Token', 'API-Token-Expiry']
};

app.use(cors(corsOptions));
app.use(session({secret: 'secret cat', resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/api/docs', swagger);
app.use('/api/users', users);
app.use('/api/user-skills', userSkills);
app.use('/api/projects', projs);
app.use('/api/match', match);
app.use('/api/hire', hire);
app.use('/api/images', images);
app.use('/api/bids', bids);
app.use('/api/skills', skills);
app.use('/api/proj-skills', projSkills);
app.use('/api/proj-files', projFiles);
app.use('/api/session', sess);
app.use('/api/balance', balance);
app.use('/api/payment', payment);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
