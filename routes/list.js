let list = [
	{
		title: "Ferris Bueller's Day Off",
		year: "1986",
		imdbRating: "7.8",
		poster: "https://m.media-amazon.com/images/M/MV5BMDA0NjZhZWUtNmI2NC00MmFjLTgwZDYtYzVjZmNhMDVmOTBkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
		actors: "Matthew Broderick, Alan Ruck, Mia Sara",
		id: "tt0091042",
		votes: 0,
		addedBy: "lou",
		votedBy: []
	}
]

const express = require('express');
let router = express.Router();

const axios = require('axios');

async function buildMovieObject(id, addedBy) {
	let omdbRes
	let movie
	id ? await axios.get(`https://www.omdbapi.com/?apikey=c77b1ccd&i=${id}`)
	.then(response => omdbRes = response.data)
	: omdbRes = undefined

	movie = omdbRes ? 
	{
		title: omdbRes.Title,
		year: omdbRes.Year,
		imdbRating: omdbRes.imdbRating,
		poster: omdbRes.Poster,
		actors: omdbRes.Actors,
		id: id,
		votes: 0,
		addedBy: addedBy ? addedBy : "Anon",
		votedBy: []
	} : undefined

	return movie
}


router.get('/', (req, res) => {
	res.send(list.sort((a, b) => b.votes - a.votes))
});

router.post('/', async (req, res) => {
	console.log(req.body)
	if (req.body.id) {
		if(list.find(element => element.id === req.body.id)) {
			res.status(400).send("movie already in list")
		} else {
			list.push( await buildMovieObject(req.body.id, req.body.addedBy));
			res.status(201).send("movie added")
		}
	} else {
		res.status(400)
	}
	
});

router.delete('/:id', (req, res) => {
	if(list.find(element => element.id === req.params.id)) {
		list.splice(list.indexOf(list.find(element => element.id === req.params.id)), 1)
		res.status(200).send("movie deleted from list")
	} else {
		res.status(400).send("movie not in list")
	}
})

router.post('/vote', (req, res) => {

	if (req.body.id && req.body.votedBy && list.find(element => element.id === req.body.id)) {
		if (list.find(element => element.id === req.body.id).votedBy.includes(req.body.votedBy)) {
			res.status(400).send("you have already voted")
		} else {
			if(list.find(element => element.id === req.body.id)) {
				let movie = list.find(element => element.id === req.body.id);
				req.body.upvote ? movie.votes ++ : movie.votes --
				movie.votedBy.push(req.body.votedBy)
				res.status(200).send("voted");
			} else {
				res.status(400).send("movie not in list")
			}
		}
	} else {
		res.status(400).send()
	}

})


module.exports = router;