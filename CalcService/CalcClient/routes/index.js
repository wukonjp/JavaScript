var express = require('express');
var router = express.Router();
var calcModel = require('../models/calc_model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Calc Server' });
});

router.options('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Accept,X-Custom-Header');
  res.sendStatus(200);
});

/* POST calculation. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  calcModel.Action(req.body.command, req.body.param);

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Accept,X-Custom-Header');
  res.json({
    display: calcModel.displayText,
    operation: calcModel.operationText
  });
});

module.exports = router;
