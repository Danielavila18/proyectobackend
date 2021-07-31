const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const database = require('./settings/databaseConnection');
const session = require('express-session');
const authRoute = require('./routes/auth.routes');
const contactRouter = require('./routes/contactRouter.routes');
const clientRouter = require('./routes/clientRouter.routes');
const adminRouter = require('./routes/admin.routes');
const { verifyAdmin } = require('./helpers/authSession');

//Config
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

//Router
app.use('/auth', authRoute);
app.use('/api/contact', contactRouter);
app.use('/api/client', verifyAdmin, clientRouter);
app.use('/admin', verifyAdmin, adminRouter);
app.use(require('./routes/index.routes'));

//Views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//Server
app.listen(port, async () => {
  try {
    await database.sync();
    console.log('Server listening in port', port);
    console.log('Database is connected succesfully');
  } catch (error) {
    console.error('Something is wrong', error);
  }
});
