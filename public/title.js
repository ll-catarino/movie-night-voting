let id = document.URL.split('id=')[1]

axios.get(`/title?id=${id}`)
      .then(function (response) {
	render(response.data)
      })
      .catch(function (error) {
	      console.log(error)
	alert("algo correu mal :(")
      })


function render(res) {
	document.getElementById('title').innerText = res.Title
	document.getElementById('year').innerText = res.Year
	document.getElementById('plot').innerText = res.Plot
	document.getElementById('director').innerText = res.Director
	document.getElementById('actors').innerText = res.Actors
	document.getElementById('imdb-rating').innerText = res.imdbRating
	document.getElementById('imdb-link').setAttribute('href', 'https://www.imdb.com/title/' + res.imdbID)
	const poster = document.createElement('img')
	poster.className = 'img-fluid rounded float-end'
	poster.src = res.Poster
	document.getElementById('poster-col').appendChild(poster)
	document.getElementById('add-button').onclick = addToList
}

function addToList() {
	axios.post('/list', {
		id: id,
		addedBy: localStorage.getItem('username')
	      })
	      .then(function (response) {
		window.location.href = '/list.html'
	      })
	      .catch(function (error) {
		alert("movie already added")
	      })
}

