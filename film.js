
//Get the id
const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');
console.log("Id: " + id);


//Fetch Film from API (GET request)
async function fetchFilms() {
    try {
        const film = await fetch(`https://swapi2.azurewebsites.net/api/films/${id}`);
        const filmResponse = await film.json();
        displayFilmInfo(filmResponse);
        if (!film.ok) {
            throw new Error("Network response was not OK");
        }
        
    } catch (error) {
      console.error("There was a problem with your fetch request: ", error);
    }
}
fetchFilms();

// Fetch Characters
async function fetchCharacters(id) {
    let characterUrl = `https://swapi2.azurewebsites.net/api/films/${id}/characters`;
    const characters = await fetch(characterUrl)
    const response = await characters.json();
    displayCharacters(response);
    console.log("Characters: " + response);
}
fetchCharacters(id);

// Fetch Planets
async function fetchPlanets(id) {
    let planetURL = `https://swapi2.azurewebsites.net/api/films/${id}/planets`;
    const planets = await fetch(planetURL)
    const response = await planets.json();
    displayPlanets(response);
    console.log("Planets: " + response);
}
fetchPlanets(id);

function displayFilmInfo(film){
    
    let filmHeader = document.createElement('tr');
    filmHeader.innerHTML = `
		<th scope="col">Producer</th>
		<th scope="col">Title</th>
		<th scope="col">Episode</th>
		<th scope="col">Director</th>
		<th scope="col">Release Date</th>
		
	`;
    
    let filmDiv = document.createElement('tr');
    filmDiv.innerHTML =`
        <td>${film.producer}</td>
        <td>${film.title}</td>
        <td>${film.episode_id}</td>
        <td>${film.director}</td>
        <td>${film.release_date}</td>
    `;
    
    //Append table body to DOM
    document.getElementById('table-header').appendChild(filmHeader);
    document.getElementById('populateBody').appendChild(filmDiv);
    
}

function displayPlanets(planet){
    let planetDiv = document.createElement('ul');
    for(const key in planet){
        planetDiv.innerHTML =`
            <li>${planet[key].name}</li>

        `;
    }
    document.getElementById('planetList').appendChild(planetDiv);
}

function displayCharacters(char){
    let charDiv = document.createElement('ul');
    
    for(const key in char){
        charDiv.innerHTML =`
            <li>${char[key].name}</li>
        `;
    }
    document.getElementById('characterList').appendChild(charDiv);
}