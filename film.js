

//NEW
let producerSpan;
let planetsUl;
let characterUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;


// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  producerSpan = document.querySelector('span#producerSpan');
  planetsUl = document.querySelector('#planets>ul');
  characterUl = document.querySelector('#characters>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  fetchFilms(id)
});


//Fetch Film from API (GET request)
async function fetchFilms(id) {
    let film;
    try{
      film = await fetchFilm(id)
      console.log(film);
      film.planets = await fetchPlanets(film);
      film.characters = await fetchCharacters(film);
      
    } catch (error) {
      console.error("There was a problem with your fetch request: ", error);
    }
    renderFilms(film);
}

async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

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
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
  nameH1.textContent = film?.title;
  producerSpan.textContent = film?.producer;
  const planetsLis = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`)
  planetsUl.innerHTML = planetsLis.join("");
  const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  characterUl.innerHTML = charactersLis.join("");
  console.log("RENDERFILMS")
}
