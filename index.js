const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(session({
    secret: 'truesightsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

const PanelRouter = require('./core/routers/PanelRouter');
const ApiRouter = require('./core/routers/ApiRouter');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', PanelRouter);
app.use('/api', ApiRouter);

app.listen(3000, () => {
    console.log('Truesight is now listening on port 3000!');
});