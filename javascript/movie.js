import { allMoviesArray, actors } from './movieConstants.js';

const movieImg = document.getElementById('movie-img');
const movieTitle = document.getElementById('movie-title');
const movieYear = document.getElementById('movie-year');
const movieDuration = document.getElementById('movie-duration');
const movieType = document.getElementById('movie-type');
const movieDescription = document.getElementById('movie-description');
const movieActorList = document.getElementById('movie-actors-list');
const movieTrailer = document.getElementById('trailer-video');

//Clear the existing content of movieActorList
movieActorList.innerHTML = "";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let movieId = urlParams.get('movie-id');
//Find the movie object by movie id
let movie = findMovieById(movieId);

//Update the HTML content with the movie details
movieImg.src = movie['image'];
movieTitle.innerHTML = movie['title'];
movieYear.innerHTML = movie['year'];
movieDuration.innerHTML = movie['duration'];
movieType.innerHTML = movie['type'];
movieDescription.innerHTML = movie['description'];
movieTrailer.src = movie['trailer'];

let movieActors = movie['actors'];
//Display the list of actors of the movie
for (let i = 0; i < movieActors.length; i++) {
    let actor = findActorById(movieActors[i]);

    //Create elements for actor details
    let movieActor = document.createElement("li");
    let actorReference = document.createElement("a");
    let actorImg = document.createElement("img");
    let actorName = document.createElement("h1");

    //Create a link to the actor's page
    actorReference.href = "actor.html?actor-id=" + actor['id'].toString();
    actorImg.src = actor['image'];
    actorImg.alt = 'actor ' + i.toString();
    actorName.innerHTML = actor['name'];

    movieActor.className = "movie-actor";
    actorImg.className = "actor-image";
    actorName.className = "actor-name";


    actorReference.appendChild(actorImg);
    movieActor.appendChild(actorReference);
    movieActor.appendChild(actorName);
    movieActorList.appendChild(movieActor);
}

function findActorById(actorId) {
    let length = Object.keys(actors).length;
    for (let i = 0; i < length; i++) {
        if (actors[i]['id'].toString() === actorId.toString()) {
            return actors[i];
        }
    }
    return null;
}

function findMovieById(movieId) {
    let length = Object.keys(allMoviesArray).length;
    for (let i = 0; i < length; i++) {
        if (allMoviesArray[i]['id'].toString() === movieId.toString()) {
            return allMoviesArray[i];
        }
    }
    return null;
}
