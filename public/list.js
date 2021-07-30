let list 

axios.get('/list')
      .then(function (response) {
	response.data.forEach(item => renderItem(item))
	list = response.data
      })
      .catch(function (error) {
	      console.log(error)
	alert("algo correu mal :(")
      })

let listDiv = document.getElementById('list')

function renderItem(item) {
	let element = document.createElement('div')

	element.innerHTML =
		`<div class="card">
		<div class="card-body">
			<div class="col">
				<a href="/title.html?id=${item.id}">
						<img class="img-fluid rounded float-start" style="max-height: 100px;" src="${item.poster}">
				</a>
			</div>
			<div class="row align-items-center">
				<div class="col" style="padding-right: 0;">
					<h5 class="card-title" style="margin-bottom: 0.3rem;">${item.title}</h5>
					<p class="card-text" style="margin-bottom: 0.3rem;">${item.year}</p>
					<p class="card-text" style="margin-bottom: 0.3rem;">${item.actors}</p>
					<p class="card-text" style="margin-bottom: 0.3rem;">${item.imdbRating}/10</p>
				</div>
				<div class="col" style="padding-right: 0;">
					<p class="card-text" style="margin-bottom: 0.3rem;">Votos: ${item.votes}</p>
					<p class="card-text" style="margin-bottom: 0.3rem;">Sugerido por: ${item.addedBy}</p>
					<p class="card-text" style="margin-bottom: 0.3rem;">Votado por: ${item.votedBy}</p>
				</div>
				<div class="col" style="padding-right: 0;">
					<div class="row">
						<button type="button" class="btn float-end btn-primary btn-sm" onclick="vote('${item.id}', true)">upvote</button>
					</div>
					<br>
					<div class="row">
						<button type="button" class="btn float-end btn-primary btn-sm" onclick="vote('${item.id}', false)">downvote</button>
					</div>
				</div>
			</div>
			
			
		</div>
	</div>
	<br>`
	

	listDiv.appendChild(element)
}

function vote(id, upvote) {
	
	if (localStorage.getItem('username')) {
		axios.post('/list/vote', {
			id: id,
			votedBy: localStorage.getItem('username'),
			upvote: upvote
		      })
		      .then(function (response) {
			window.location.href = '/list.html'
		      })
		      .catch(function (error) {
			alert("you have already voted")
		      })
	} else {
		alert("add your name first!")
	}

	
}