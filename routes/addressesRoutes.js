const express = require('express');

const addressesController = require('../controllers/addressesController');

const router = express.Router();

router
  .route('/')
  .post(addressesController.checkBody, addressesController.getBitcoinNodesList);

module.exports = router;
