const express = require('express');
const router = express.Router();
const forecastController = require('../controllers/forecast');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/forecast/:coords', forecastController.forecast_get)

module.exports = router;
