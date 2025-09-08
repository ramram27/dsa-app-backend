const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middlewares/error.middleware');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.use(errorHandler);

module.exports = app;
