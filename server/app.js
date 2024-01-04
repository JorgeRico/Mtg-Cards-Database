var createError             = require('http-errors');
var express                 = require('express');
var path                    = require('path');
var cookieParser            = require('cookie-parser');
var logger                  = require('morgan');

const cors                  = require('cors');

var indexRouter             = require('./routes/index');
var setsRouter              = require('./routes/sets');
var specialSetsRouter       = require('./routes/specialSets');
var setCardsRouter          = require('./routes/setCards');
var pendingCardsRouter      = require('./routes/pendingCards');
var cardsOnADeckRouter      = require('./routes/cardsOnADeck');
var cardsBetterGradedRouter = require('./routes/cardsBetterGraded');

var app = express();

app.use(cors({
  origin: '*'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sets', setsRouter);
app.use('/specialSets', specialSetsRouter);
app.use('/setCards', setCardsRouter);
app.use('/pendingCards', pendingCardsRouter);
app.use('/cardsOnADeck', cardsOnADeckRouter);
app.use('/betterGradedCards', cardsBetterGradedRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
