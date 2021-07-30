let query = document.URL.split('query=')[1];


axios.get(`/search?q=${query}`)
      .then(function (response) {
	response.data.Search.forEach(item => renderItem(item))
      })
      .catch(function (error) {
	console.log(error)
	alert("algo correu mal :(")
      })

document.getElementById("query").innerText = query.replace("%20", " ")

let resultsDiv = document.getElementById('results')

function renderItem(item) {
	let element = document.createElement('div')

	element.innerHTML =
		`<div class="card">
		<div class="card-body">
			<div class="col">
				<img class="img-fluid rounded float-start" style="max-height: 100px;" src="${item.Poster}">	
			</div>
			<div class="row">
				<div class="col" style="padding-right: 0;">
					<h5 class="card-title">${item.Title}</h5>
					<!-- <button type="button" class="btn float-end btn-primary">Add To List</button> -->
					  <p class="card-text" style="margin-bottom: 0.5rem;">${item.Year}</p>
					  <!--<p class="card-text" style="margin-bottom: 0.5rem;">Name name, shhfdkj, hjdjk hjjj</p> -->
				</div>
			</div>
			
			<a href="/title.html?id=${item.imdbID}" class="stretched-link"></a>
		</div>
	</div>
	<br>`
	

	resultsDiv.appendChild(element)
}