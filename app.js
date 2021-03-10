const db_env = 'development';
const config = require('./knexfile.js')[db_env];
knex = require('knex')(config)

const jwt = require('jsonwebtoken');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var movieRouter = require('./routes/moviedetail');
var usersRouter = require('./routes/users');
var cors = require('cors')

var app = express();

const port = 8080;
const accessTokenSecret = 'youraccesstokensecret';
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin: '*'}))



const authenticateJWT = (req, res, next) => {
  let authHeader = req.headers.auth;
  if (authHeader) {
      let token = authHeader
      jwt.verify(token, accessTokenSecret, (err, user) => {
          console.log(user)
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user; 
          next()
      });
      
  } else {
      res.sendStatus(401, "error");
  }
};


app.use('/dash', authenticateJWT ,indexRouter);
app.use('/moviedetail',authenticateJWT, movieRouter)
app.use('/users', usersRouter);

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
  res.send('error');
});


const listener = () => console.log(`listening on port ${port}`);
app.listen(port, listener)
