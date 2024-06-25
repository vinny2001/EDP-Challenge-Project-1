
//Get the id
const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');
console.log("Id: " + id);


//Fetch Film from API (GET request)
async function fetchFilms() {
    try {
        const film = await fetch(`https://swapi2.azurewebsites.net/api/films/${id}`);
        film.planets = await fetchFilms(film);
        film.characters = await fetchCharacters(film);
        const filmResponse = await film.json();
        displayFilmInfo(filmResponse);
        if (!film.ok) {
            throw new Error("Network response was not OK");
        }
        
    } catch (error) {
      console.error("There was a problem with your fetch request: ", error);
    }
    renderFilms(film)
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

let filmsUl;
let charactersUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;


async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

async function fetchCharacters(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

const renderFilms = film => {
  
  const filmsLis = film?.planets?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsLis.join("");
  const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersUl.innerHTML = charactersLis.join("");
}
