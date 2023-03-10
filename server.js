require('dotenv').config()
const express = require('express');
const app = express();

const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTIONSTRING).then(() => {
  console.log('conectei')
  app.emit('pronto')
}).catch(e => console.log(e))

const routes = require('./routes');
const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const sessionOptions = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, //tempo q vai durar o cookie (7dias)
    httpOnly: true
  },
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING })
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(routes);

app.on('pronto', () => {
  app.listen(3001, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
})

