const express = require('express');
const ROUTE = express.Router();

const onBoardingController = require ('../../controllers/onBoarding')
const userController = require('../../controllers/users')

ROUTE.post('/signup',userController.signupUser);
ROUTE.post('/on-boarding',onBoardingController.onboardUser)


module.exports = ROUTE