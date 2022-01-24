const express = require('express');
// const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');

const AddressesRouter = require('./routes/addressesRoutes');
//midleware
const app = express();
app.use(cors());
app.use(compression()); //compress json texts in the production.
app.use(express.json());
// app.use(morgan('dev'));

app.use('/api/v1/bitcoins', AddressesRouter); //use ad

module.exports = app;
