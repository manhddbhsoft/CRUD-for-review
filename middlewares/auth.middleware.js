const express = require('express');
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

module.exports.requireAuth = function(req, res, next) {
  if (!req.signedCookies.userID) {
    res.redirect('/auth/login');
    return;
  }

  const user = Employee.findOne({
    'id': req.signedCookies.userID
  });

  if (!user) {
    res.redirect('/auth/login');
    return;
  }

  next();
};
