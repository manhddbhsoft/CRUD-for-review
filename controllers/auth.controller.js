const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const md5 = require('md5');
const Employee = mongoose.model('Employee');

router.get('/login', function(req, res) {
    res.render('auth/login');
})

router.post('/login', async function(req, res, next) {
    var email = req.body.email;
    var pwd = md5(req.body.password);

    // console.log(hash(pwd));
    console.log(md5(pwd));
    const user = await Employee.findOne({ 'email': email });
    console.log(user);

    if (!user) {
        res.redirect('/auth/login');
        return;
    }

    if (user.pwd != pwd) {
        res.redirect('/auth/login');
        console.log('1');
        return;
    } else {
        res.redirect('/employee');
    }

    res.cookie('userID', user.id, {
        signed: true
    });
})

module.exports = router;