require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const session = require('express-session')

const employeeController = require('./controllers/employeeController');
const authRequire = require('./controllers/auth.controller');
const authMiddle = require('./middlewares/auth.middleware');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');
app.use(session({
    // key: 'abc',
    secret: 'secret_key',
    // cookie: 1000 * 60 * 60 *24,
    // resave: true
}))


app.listen(3500, () => {
    console.log('Express server started at port : 3500');
});

app.use('/employee', /*authMiddle.requireAuth*/ employeeController);
app.use('/auth', authRequire);