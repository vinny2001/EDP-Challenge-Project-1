let climateSpan;
let diameterSpan;
let gravitySpan;
let nameH1;
let orbital_periodSpan;
let populationSpan;
let rotation_periodSpan;
let surface_waterSpan;
let terrainSpan;
let filmsUl;
let charactersUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
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
  filmsUl = document.querySelector('#filmsList>ul');
  charactersUl = document.querySelector('#charactersList>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    console.log(planet);
    planet.films = await fetchFilms(planet);
    planet.characters = await fetchCharacters(planet);
  }
  catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);

}
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

async function fetchCharacters(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

const renderPlanet = planet => {
  document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;
  climateSpan.textContent = planet?.climate;
  diameterSpan.textContent = planet?.diameter;
  gravitySpan.textContent = planet?.gravity;
  orbital_periodSpan.textContent = planet?.orbital_period;
  populationSpan.textContent = planet?.population;
  rotation_periodSpan.textContent = planet?.rotation_period;
  surface_waterSpan.textContent = planet?.surface_water;
  terrainSpan.textContent = planet?.terrain;
  const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsLis.join("");
  const charactersLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersUl.innerHTML = charactersLis.join("");
}

