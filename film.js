
//Get the id
const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');
console.log("Id: " + id);


//Fetch Film from API (GET request)
async function fetchFilms() {
    try {
        const film = await fetch(`https://swapi2.azurewebsites.net/api/films/${id}`);
        const character = await fetch(`https://swapi2.azurewebsites.net/api/films/${id}/characters`);
        const planet = await fetch(`https://swapi2.azurewebsites.net/api/films/${id}/planets`);
        const filmResponse = await film.json();
        const characterResponse = await character.json();
        const planetResponse = await planet.json();
        
        displayFilmInfo(filmResponse, characterResponse, planetResponse);
        if (!film.ok) {
            throw new Error("Network response was not OK");
        }
        
    } catch (error) {
      console.error("There was a problem with your fetch request: ", error);
    }
}
fetchFilms();

function displayFilmInfo(film, character, planet){
    
    let filmHeader = document.createElement('tr');
    filmHeader.innerHTML = `
		<th scope="col">Producer</th>
		<th scope="col">Title</th>
		<th scope="col">Episode</th>
		<th scope="col">Director</th>
		<th scope="col">Release Date</th>
		<th scope="col">Opening Crawl</th>
	`;

    
    let filmDiv = document.createElement('tr');
    filmDiv.innerHTML =`
        <td>${film.producer}</td>
        <td>${film.title}</td>
        <td>${film.episode_id}</td>
        <td>${film.director}</td>
        <td>${film.release_date}</td>
        <td>${film.opening_crawl}</td>
    `;
    //Append table body to DOM
    document.getElementById('table-header').appendChild(filmHeader);
    document.getElementById('populateBody').appendChild(filmDiv);
    
}