require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());


const models = require('./models');

const USER_ROUTE = require('./routes/users')
const ONBOARDING_ROUTE = require('./routes/onboarding')

app.use('/user',USER_ROUTE)
app.use('/',ONBOARDING_ROUTE)

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


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})