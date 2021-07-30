const express = require('express');
let router = express.Router();

const axios = require('axios');


router.get('/', async (req, res) => {
	let query = req.query.q.replace("%", " ") || req.body.q
	query ? axios.get(`https://www.omdbapi.com/?apikey=c77b1ccd&s=${query}`)
	.then(response => res.send(response.data)) 
	: res.status(400).send()
});

module.exports = router;