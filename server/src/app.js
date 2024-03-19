const express = require('express');
const cors = require('cors');
const sequelize = require('./api/db/server');
const User = require('./api/db/user');
const app = express();

const userRouter = require('./api/routes/user')

app.use(cors());
app.use(express.json());
sequelize.sync();

app.get('/', async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    res.json("Connected");
})

app.use('/user', userRouter);

module.exports = app;