/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-07 02:53:06
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
const historyRouter = require('./routes/history');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const contactRouter = require('./routes/contact');
const checkoutRouter = require('./routes/checkout');
const productdetailsRouter = require('./routes/product-details');
const profileRouter = require('./routes/profile');
const resultRouter = require('./routes/result');

// admin router
const adminIndexRouter=require('./routes/admin');
const adminLoginRouter=require('./routes/admin/login');
const adminLogoutRouter=require('./routes/admin/logout');
const adminProductsRouter=require('./routes/admin/products');
const adminProductDetailsRouter=require('./routes/admin/product-details');
const adminAddProductRouter=require('./routes/admin/add-product');
const adminAddBrandRouter=require('./routes/admin/add-brand');
const adminAddTypeRouter=require('./routes/admin/add-type');
const adminShippingDetailRouter=require('./routes/admin/shipping-detail');
const adminProfileRouter=require('./routes/admin/profile');
const adminPresentsRouter=require('./routes/admin/presents');
const adminPresentDetailRouter=require('./routes/admin/present-detail');

const app = express();

const db = require('./models/index')

const { create } = require('express-handlebars');

const hbs = create({
  // defaultLayout:'client',
  extname:'.hbs',
  helpers:require('./config/helpers.js')
});

// database setup
db.sequelize.sync().then(() => {
  console.log("Sync database!");
});

// view engine setup
app.engine('.hbs', hbs.engine)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/blog', blogRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/history', historyRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/contact', contactRouter);
app.use('/checkout', checkoutRouter);
app.use('/product-details', productdetailsRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/result', resultRouter);

// admin route
app.use('/admin',adminIndexRouter);
app.use('/admin/login', adminLoginRouter);
app.use('/admin/logout', adminLogoutRouter);
app.use('/admin/products', adminProductsRouter);
app.use('/admin/productdetails', adminProductDetailsRouter);
app.use('/admin/addproduct', adminAddProductRouter);
app.use('/admin/addbrand', adminAddBrandRouter);
app.use('/admin/addtype', adminAddTypeRouter);
app.use('/admin/shippingdetails', adminShippingDetailRouter);
app.use('/admin/profile', adminProfileRouter);
app.use('/admin/presents', adminPresentsRouter);
app.use('/admin/presentdetail', adminPresentDetailRouter);

// api route
require("./routes/api/sanpham")(app);
require("./routes/api/user")(app);
require("./routes/api/giohang")(app);
require("./routes/api/review")(app);
require("./routes/api/admin/user")(app);
require("./routes/api/admin/products")(app);
require("./routes/api/admin/brands")(app);
require("./routes/api/admin/types")(app);
require("./routes/api/admin/shippings")(app);
require("./routes/api/admin/presents")(app);


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
