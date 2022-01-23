const express = require('express');

const addressesController = require('../controllers/addressesController'); //use controller functions

const router = express.Router();

router
  .route('/')
  .post(addressesController.checkBody, addressesController.getBitcoinNodesList); //set endpoint

module.exports = router;
