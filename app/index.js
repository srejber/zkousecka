const session = require('express-session');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(session({
    secret: require('../conf').secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('./www'));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
})

// Routery
app.use('/users', require('./routers/usersRouter'));
app.use('/', require('./routers/homeRouter'));

app.session = session;
module.exports = app;
