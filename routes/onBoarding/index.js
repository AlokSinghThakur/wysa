const express = require('express');
const ROUTE = express.Router();
const authorize = require('../../services')

const onBoardingController = require ('../../controllers/onBoarding')

ROUTE.post('/on-boarding',authorize("user"),onBoardingController.onboardUser)


module.exports = ROUTE