var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to 0xb0t' });
});

router.get('/control', function(req, res, next) {
  res.render('control', { title: 'Control Panel' });
});


module.exports = router;
