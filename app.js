const dotenv = require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressLayouts = require("express-ejs-layouts");
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require("express-session");

//
const adminpath = [
  {pathurl: '/', routeFile: 'index'},
  {pathurl: '/singup', routeFile: 'singup'},
  {pathurl: '/dashbord', routeFile: 'dashbord'},
]

var app = express();
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    cookie: { sameSite: "lax", maxAge: oneDay },
    resave: true,
    secret: process.env.AUTH_KEY,
    activeDuration: 5 * 60 * 1000,
    saveUninitialized: true
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/angular', express.static(__dirname + "/node_modules/angular"));
app.use("/angular", express.static(path.join(__dirname , "/node_modules/angular")));

mongoose.set('runValidators',true);
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
});
mongoose.connection.once('open',()=>{
  console.log("well done! , connect to mongo db databse");
}).on('error',error=>{
  console.log("Oops! databse connection error :"+error);
})
adminpath.forEach((path) => {
  app.use(path.pathurl, require('./routes' + path.routeFile));
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
