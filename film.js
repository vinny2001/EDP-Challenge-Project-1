
//Get the id
const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');
console.log("Id: " + id);

//Fetch Film from API (GET request)
async function fetchFilms() {
    try {
        const response = await fetch(`https://swapi2.azurewebsites.net/api/films/${id}`);
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        const film = await response.json();
        console.log("Film:" + film);
    } catch (error) {
      console.error("There was a problem with your fetch request: ", error);
    }
  }
  fetchFilms();