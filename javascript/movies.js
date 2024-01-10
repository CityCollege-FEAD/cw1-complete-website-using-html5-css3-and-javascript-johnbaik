import {allMoviesArray} from './movieConstants.js';

const moviesList = document.getElementById("movies-list");
document.getElementById('filter-button').addEventListener('click', showFilters);

moviesList.innerHTML = "";

let numOfMovies = Object.keys(allMoviesArray).length

for (let i = 0; i < numOfMovies; i++) {

    let movieItem = document.createElement("li");
    let movieReference = document.createElement("a");
    let movieImage = document.createElement("img");
    let movieSection = document.createElement("section");
    let movieTitle = document.createElement("h1");
    let movieYear = document.createElement("p");

    movieReference.href = "movie.html?movie-id=" + allMoviesArray[i]['id'].toString();

    movieImage.src = allMoviesArray[i]['image'];
    movieImage.alt = "movie image";
    movieImage.className = "movie-image";

    movieTitle.innerHTML = allMoviesArray[i]['title'];
    movieTitle.className = "movie-title";
    movieYear.innerHTML = allMoviesArray[i]['year'];
    movieYear.className = "movie-year";

    movieReference.appendChild(movieImage);
    movieSection.appendChild(movieTitle);
    movieSection.appendChild(movieYear);
    movieSection.className = "movie-details";

    movieItem.className = "movie-item";
    movieItem.appendChild(movieReference);
    movieItem.appendChild(movieSection);
    moviesList.appendChild(movieItem);
}

function showFilters() {
    let filters = document.getElementById("filters");
    filters.style.display = "flex";
}