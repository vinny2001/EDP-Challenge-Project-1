
//Get the id
const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');
console.log("Id: " + id);

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#planet_name');
    climateSpan = document.querySelector('span#climate');
    diameterSpan = document.querySelector('span#diameter');
    gravitySpan = document.querySelector('span#gravity');
    orbital_periodSpan = document.querySelector('span#orbital_period');
    populationSpan = document.querySelector('span#population');
    rotation_periodSpan = document.querySelector('span#rotation_period');
    surface_waterSpan = document.querySelector('span#surface_water');
    terrainSpan = document.querySelector('span#terrain');
    planetsUl = document.querySelector('#planets>ul');
    charactersUl = document.querySelector('#characters>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    
});

//Fetch Film from API (GET request)
async function fetchFilms() {
    let film;
    try {
        film = await fetch(`https://swapi2.azurewebsites.net/api/films/${id}`);
        film.planets = await fetchPlanets(film);
        film.characters = await fetchCharacters(film);
        const filmResponse = await film.json();
        displayFilmInfo(filmResponse);
        if (!film.ok) {
            throw new Error("Network response was not OK");
        }
        
    } catch (error) {
      console.error("There was a problem with your fetch request: ", error);
    }
    renderFilms(film);
}
fetchFilms();

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


//NEW

let planetsUl;
let charactersUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;


/* async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
} */

async function fetchCharacters(film) {
  const url = `${baseUrl}/films/${film?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchPlanets(film) {
    const url = `${baseUrl}/films/${film?.id}/planets`;
    const planets = await fetch(url)
      .then(res => res.json())
    return planets;
}

const renderFilms = film => {
    
    const planetsLis = film?.planets?.map(planet => `<li><a href="/film.html?id=${planet.id}">${planet.name}</li>`)
    planetsUl.innerHTML = planetsLis.join("");
    const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = charactersLis.join("");
}
