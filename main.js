//API TMDB

const API_KEY = "api_key=ece435c9870d04bab991d9ab7685bb44";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL =
  BASE_URL +
  "/discover/movie?with_genres=18&primary_release_year=2021&" +
  API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("main");
const noContent = document.getElementById("noContent");

let newServiceWorker;

getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    })

    .catch((err) => alertConection (err));
  }
  
  function alertConection(error){
    noContent.innerHTML =  `
    <div class="col text-center">
    <h1 class="title">No hay conexion a internet </h1>
    <div class="conexion">
    <img src="/assets/noconnection.png" class ="img-fluid" alt=Responsive image"></div>
    </div>
    `;
  }
  
function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">

        <div class="movie-info">
            <h3>${title}</h3>
        </div> 
        `;
    main.appendChild(movieElement);
  });
}



let launchUpdate = document.getElementById('launchUpdate');
launchUpdate.addEventListener('click', () => {
    newServiceWorker.postMessage({
        action: 'skipWaiting'
    })

    window.location.reload()
})
