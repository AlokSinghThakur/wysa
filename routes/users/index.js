const express = require('express');
const ROUTE = express.Router();

const userController = require('../../controllers/users')


ROUTE.post('/signup',userController.signupUser);
ROUTE.post('/login',userController.login);
module.exports = ROUTE