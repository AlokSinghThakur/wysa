require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());


const models = require('./models');

const USER_ROUTE = require('./routes/users')
const ONBOARDING_ROUTE = require('./routes/onBoarding')

app.use('/user',USER_ROUTE)
app.use('/first',ONBOARDING_ROUTE)
app.use("*", (req, res, next) => {
    res.status(404).send({ code: 404, status: 'failed', msg: "Make sure url is correct!!!" });
});

models.db_config
    .sync({
        //    force: true,
        // alter: true,
    })
    .then(() => {
        console.log(`Connected to Database!`);
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err)
        process.exit()
    });


app.listen(5000, () => {
    console.log('Server is running on https://wysa.onrender.com')
})