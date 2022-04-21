const express = require('express');
const router = express.Router();

const Database = require('../storage/Database');

router.get('/', (req, res) => {
    if(req.session.user) {
        res.render('index', {
            user: req.session.user
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/console', (req, res) => {
    if(req.session.user) {
        res.render('console', {
            user: req.session.user
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/keys', (req, res) => {
    if(req.session.user) {
        res.render('keys', {
            user: req.session.user
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/users', (req, res) => {
    if(req.session.user) {
        res.render('users', {
            user: req.session.user
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/modules', (req, res) => {
    if(req.session.user) {
        res.render('modules', {
            user: req.session.user
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/login', (req, res) => {
    if(req.session.user) {
        res.redirect('/');
    } else {
        res.render('login', {
            error: false
        });
    }
});

router.post('/login', async (req, res) => {
    let user = await Database.getInstance().getUserByUsernameAndPassword(req.body.username, req.body.password);

    if(user) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.render('login', {
            error: 'Invalid username or password'
        });
    }
});

module.exports = router;