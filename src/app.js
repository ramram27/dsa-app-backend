const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middlewares/error.middleware');

dotenv.config();

const app = express();
const corsOptions = {
    origin: [
        'http://localhost:3000', // Next.js frontend
        'http://127.0.0.1:3000', // Alternative localhost
    ],
    credentials: true, // Allow cookies
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin'
    ]
};

app.use(cors(corsOptions))
app.use(express.json());

app.use('/api', userRoutes);

app.use(errorHandler);

module.exports = app;
