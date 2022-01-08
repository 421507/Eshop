/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 22:15:43
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
const presentRouter = require('./routes/present');
const activeRouter = require('./routes/active');

// admin router
const adminIndexRouter = require('./routes/admin');
const adminLoginRouter = require('./routes/admin/login');
const adminLogoutRouter = require('./routes/admin/logout');
const adminProductsRouter = require('./routes/admin/products');
const adminProductDetailsRouter = require('./routes/admin/product-details');
const adminAddProductRouter = require('./routes/admin/add-product');
const adminAddBrandRouter = require('./routes/admin/add-brand');
const adminAddTypeRouter = require('./routes/admin/add-type');
const adminShippingDetailRouter = require('./routes/admin/shipping-detail');
const adminProfileRouter = require('./routes/admin/profile');
const adminPresentsRouter = require('./routes/admin/presents');
const adminPresentDetailRouter = require('./routes/admin/present-detail');
const adminAddPresentRouter = require('./routes/admin/add-present');
const adminAccountsRouter = require('./routes/admin/accounts');
const adminAccountDetailRouter = require('./routes/admin/account-detail');
const adminGroupDetailRouter = require('./routes/admin/group-detail');
const adminPermissionDetailRouter = require('./routes/admin/permission-detail');
const adminAddAccountRouter = require('./routes/admin/add-account');
const adminAddGroupRouter = require('./routes/admin/add-group');
const adminNotiRouter = require('./routes/admin/notification');
const adminReplyRouter = require('./routes/admin/reply');
const adminBrandDetailRouter = require('./routes/admin/brand-detail');
const adminTypeDetailRouter = require('./routes/admin/type-detail');
const adminTypeBrandDetailRouter = require('./routes/admin/typebrand-detail');
const adminAddTypeBrandRouter = require('./routes/admin/add-typebrand');
const adminCustomerRouter = require('./routes/admin/customers');
const adminCustomerDetailRouter = require('./routes/admin/customer-detail');
const adminCustomizeRouter = require('./routes/admin/customize');
const adminStatusDeliverDetailRouter = require('./routes/admin/statusdeliver-detail');
const adminStatusDeliverAddRouter = require('./routes/admin/add-statusdelivery');
const adminStatusPaymentAddRouter = require('./routes/admin/add-statuspayment');
const adminStatusPaymentDetailRouter = require('./routes/admin/statuspayment-detail');
const adminMethodPaymentAddRouter = require('./routes/admin/add-methodpayment');
const adminMethodPaymentDetailRouter = require('./routes/admin/methodpayment-detail');
const adminCityAddRouter = require('./routes/admin/add-city');
const adminCityDetailRouter = require('./routes/admin/city-detail');


const app = express();

const db = require('./models/index')

const { create } = require('express-handlebars');

const hbs = create({
  // defaultLayout:'client',
  extname: '.hbs',
  helpers: require('./config/helpers.js')
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
app.use('/present', presentRouter);
app.use('/active', activeRouter);

// admin route
app.use('/admin', adminIndexRouter);
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
app.use('/admin/addpresent', adminAddPresentRouter);
app.use('/admin/accounts', adminAccountsRouter);
app.use('/admin/accountdetail', adminAccountDetailRouter);
app.use('/admin/groupdetail', adminGroupDetailRouter);
app.use('/admin/permissiondetail', adminPermissionDetailRouter);
app.use('/admin/addaccount', adminAddAccountRouter);
app.use('/admin/addgroup', adminAddGroupRouter);
app.use('/admin/noti', adminNotiRouter);
app.use('/admin/reply', adminReplyRouter);
app.use('/admin/branddetail', adminBrandDetailRouter);
app.use('/admin/typedetail', adminTypeDetailRouter);
app.use('/admin/typebranddetail', adminTypeBrandDetailRouter);
app.use('/admin/addtypebrand', adminAddTypeBrandRouter);
app.use('/admin/customers', adminCustomerRouter);
app.use('/admin/customerdetail', adminCustomerDetailRouter);
app.use('/admin/customize', adminCustomizeRouter);
app.use('/admin/statusdelivery', adminStatusDeliverDetailRouter);
app.use('/admin/addstatusdelivery', adminStatusDeliverAddRouter);
app.use('/admin/statuspayment', adminStatusPaymentDetailRouter);
app.use('/admin/addstatuspayment', adminStatusPaymentAddRouter);
app.use('/admin/methodpayment', adminMethodPaymentDetailRouter);
app.use('/admin/addmethodpayment', adminMethodPaymentAddRouter);
app.use('/admin/city', adminCityDetailRouter);
app.use('/admin/addcity', adminCityAddRouter);

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
require("./routes/api/admin/notification")(app);
require("./routes/api/admin/typebrand")(app);
require("./routes/api/admin/discountproduct")(app);
require("./routes/api/admin/customers")(app);
require("./routes/api/admin/customer-present")(app);
require("./routes/api/admin/statusdelivery")(app);
require("./routes/api/admin/statuspayment")(app);
require("./routes/api/admin/methodpayment")(app);
require("./routes/api/admin/city")(app);


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
