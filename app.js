const express = require('express');
const morgan = require('morgan');
const compression = require('compression');

const AddressesRouter = require('./routes/addressesRoutes');

const app = express();
app.use(compression());
app.use(express.json());

app.use(morgan('dev'));

app.use('/api/v1/bitcoins', AddressesRouter);

module.exports = app;
