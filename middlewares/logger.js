const express = require('express');
let router = express.Router();
const moment = require('moment')

router.use(function(req, res, next) {
	console.log(req.url, moment().format());
	next();
})

module.exports = router;