let searchField;
let usernameModal

window.addEventListener('DOMContentLoaded', (event) => {
	searchField = document.getElementById('search-field')
	searchField.addEventListener("keyup", ({key}) => {
		if (key === "Enter") {
		    search()
		}
	    })

	if (!localStorage.getItem('username')) {
		usernameModal = new bootstrap.Modal(document.getElementById('username-modal'))
		usernameModal.toggle()
	}
    });

function search() {
	let query = searchField.value
	if (query) window.location.href = '/search.html?query=' + query 
}

function saveUsername() {
	localStorage.setItem('username', document.getElementById('username-field').value)
}


