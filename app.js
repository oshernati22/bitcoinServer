const express = require('express');
const morgan = require('morgan');

const AddressesRouter = require('./routes/addressesRoutes');

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/v1/bitcoins', AddressesRouter);

module.exports = app;
