/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-28 00:18:30
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const blogRouter = require('./routes/blog');
const cartRouter = require('./routes/cart');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const contactRouter = require('./routes/contact');
const checkoutRouter = require('./routes/checkout');
const productdetailsRouter = require('./routes/product-details');
const profileRouter=require('./routes/profile');

const app = express();

const db = require('./models/index')
// database setup
db.sequelize.sync().then(()=>{
  console.log("Sync database!");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/blog', blogRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/contact', contactRouter);
app.use('/checkout', checkoutRouter);
app.use('/product-details', productdetailsRouter);
app.use('/users', usersRouter);
app.use('/profile',profileRouter);

// api route
require("./routes/api/sanpham")(app);
require("./routes/api/user")(app);
require("./routes/api/giohang")(app);
require("./routes/api/review")(app);

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
