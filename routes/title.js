const express = require('express');
let router = express.Router();

const axios = require('axios');

router.get('/', async (req, res) => {
	let id = req.query.id || req.body.id
	id ? axios.get(`https://www.omdbapi.com/?apikey=c77b1ccd&i=${id}`)
	.then(response => res.send(response.data))
	: res.status(400).send()
});

module.exports = router