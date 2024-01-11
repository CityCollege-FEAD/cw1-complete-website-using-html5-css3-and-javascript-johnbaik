//Import actors array and allMoviesArray from movieConstants.js
import {allMoviesArray, actors} from './movieConstants.js';

const carouselItemLists = document.getElementsByClassName('carousel-item-list');
const movieCarouselItemImg = document.getElementsByClassName('movie-carousel-item-img');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const leftButtons = document.getElementsByClassName('left-carousel-button'); //we should add event listeners to call the slide function because the carousel.js is type module
const rightButtons = document.getElementsByClassName('right-carousel-button');

//Adding event listeners to left and right carousel buttons
addEventListenerToLeftButtons();
addEventListenerToRightButtons();

//Get actor-id from the URL parameters
let actorId = urlParams.get('actor-id');
let totalMovies = 0;

//get the total number of movies if there is actor-id (all movies or actor's movies)
if (actorId != null && actorId !== "undefined") {
    totalMovies = actors[actorId]['movies'].length;
} else {
    totalMovies = Object.keys(allMoviesArray).length;
}

//Initial check and adjustment for carousel size
checkToResize();

//Add a resize event listener
window.addEventListener("resize", checkToResize);

function checkToResize() {

        let actorId = urlParams.get('actor-id');
        let totalMovies = 0;

        //get movies
        if (actorId != null && actorId !== "undefined") {
            let actor = findActorById(actorId)
            totalMovies = actor['movies'].length;
        } else {
            totalMovies = Object.keys(allMoviesArray).length;
        }
        let currentNumOfMovies = carouselItemLists[0].children.length;
        let currentMovieImageWidth = movieCarouselItemImg[0].width;
        let currentWindowWidth = carouselItemLists[0].offsetWidth - (movieCarouselItemImg.length * (currentMovieImageWidth * 0.15));

        let numOfMoviesCanFits = Math.floor((currentWindowWidth) / (currentMovieImageWidth))

        //check if should show left and right button
        if (totalMovies <= numOfMoviesCanFits) {
            for (let buttonIndex = 0; buttonIndex < leftButtons.length; buttonIndex++) {
                leftButtons[buttonIndex].style.display = "none";
            }
            for (let buttonIndex = 0; buttonIndex < rightButtons.length; buttonIndex++) {
                rightButtons[buttonIndex].style.display = "none";
            }
        } else {
            for (let buttonIndex = 0; buttonIndex < leftButtons.length; buttonIndex++) {
                leftButtons[buttonIndex].style.display = "flex";
            }
            for (let buttonIndex = 0; buttonIndex < rightButtons.length; buttonIndex++) {
                rightButtons[buttonIndex].style.display = "flex";
            }
        }

        if (currentNumOfMovies !== numOfMoviesCanFits) {
            //The minimum number of movies in the carousel should be 2
            if (numOfMoviesCanFits >= 2) {
                resizeImageSlider(numOfMoviesCanFits);
            }

        }
}

function resizeImageSlider(numOfMoviesFits) {

    let actorId = urlParams.get('actor-id');
    let movieIds = {};

    if (actorId != null && actorId !== "undefined") {
        movieIds = findActorById(actorId)['movies'];
    } else {
        movieIds = Object.values(allMoviesArray).map(function (movie) {
            return movie.id;
        });
    }

    let maxCarouselItems = Math.min(...[movieIds.length, numOfMoviesFits]); //The maximum number of movies should fit
    console.log(maxCarouselItems);
    for (let carouselItemListIndex = 0; carouselItemListIndex < carouselItemLists.length; carouselItemListIndex++) {

        carouselItemLists[carouselItemListIndex].innerHTML = "";
        for (let carouselItemIndex = 0; carouselItemIndex < maxCarouselItems; carouselItemIndex++) {
            //For each item construct the HTML elements and append them to the list
            let img = document.createElement("img");
            img.className = "movie-carousel-item-img";
            let movie = findMovieById(movieIds[carouselItemIndex]);
            img.src = movie["image"];
            img.setAttribute("movie-id", movie['id'].toString())
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.href = "movie.html?movie-id=" + movie['id'].toString();
            li.className = "carousel-item";
            let span = document.createElement("span");
            span.innerHTML = "More Info";
            a.appendChild(span);
            a.appendChild(img);
            li.appendChild(a);
            carouselItemLists[carouselItemListIndex].appendChild(li);
        }
    }
}

function slideLeft(carouselListId) {
    let actorId = urlParams.get('actor-id');
    let movieIds = {};

    if (actorId != null && actorId !== "undefined") {
        movieIds = findActorById(actorId)['movies'];

    } else {
        movieIds = Object.values(allMoviesArray).map(function (movie) {
            return movie.id;
        });
    }

    let carouselItemList = document.getElementById(carouselListId);

    carouselItemList.children[0].remove();
    let numOfMovies = carouselItemList.children.length;
    let lastChild = carouselItemList.children[numOfMovies - 1];
    let url = new URL(lastChild.children[0].href);
    let lastMovieId = url.searchParams.get("movie-id");

    //Get the array index by the movie id
    let index = movieIds.findIndex(num => num.toString() === lastMovieId.toString());

    //Get the last movie id that should be in the carousel
    if (index >= movieIds.length - 1) {//rotate
        lastMovieId = movieIds[0];
    } else {
        lastMovieId = movieIds[(index + 1)];
    }

    //Contract the movie item and append it to the list
    let img = document.createElement("img");
    img.className = "movie-carousel-item-img";
    let movie = findMovieById(lastMovieId);
    img.src = movie["image"];
    img.setAttribute("movie-id", lastMovieId.toString())

    let li = document.createElement("li");
    li.className = "carousel-item";
    let a = document.createElement("a");
    a.href = "movie.html?movie-id=" + lastMovieId.toString();
    let span = document.createElement("span");
    span.innerHTML = "More Info";
    a.appendChild(span);
    a.appendChild(img);
    li.appendChild(a);

    carouselItemList.appendChild(li);
}

function slideRight(carouselListId) {
    let carouselItemList = document.getElementById(carouselListId);
    let length = carouselItemList.children.length;
    carouselItemList.children[length - 1].remove();

    let firstChild = carouselItemList.children[0]; //a tag
    let url = new URL(firstChild.children[0].href);
    let firstMovieId = url.searchParams.get("movie-id");

    let actorId = urlParams.get('actor-id');
    let movieIds = {};

    if (actorId != null && actorId !== "undefined") {
        movieIds = findActorById(actorId)['movies'];
    } else {
        movieIds = Object.values(allMoviesArray).map(function (movie) {
            return movie.id;
        });
    }

    let index = movieIds.findIndex(num => num.toString() === firstMovieId.toString());

    //Get the first movie id that should be in the carousel
    if (index === 0) {
        firstMovieId = movieIds[movieIds.length - 1];
    } else {
        firstMovieId = movieIds[(index - 1)];
    }

    let img = document.createElement("img");

    img.src = findMovieById(firstMovieId)["image"];

    img.setAttribute("movie-id", firstMovieId.toString())

    img.className = "movie-carousel-item-img";

    let li = document.createElement("li");
    li.className = "carousel-item";
    let a = document.createElement("a");
    a.href = "movie.html?movie-id=" + firstMovieId.toString();
    let span = document.createElement("span");
    span.innerHTML = "More Info";
    a.appendChild(span);
    a.appendChild(img);
    li.appendChild(a);

    carouselItemList.prepend(li);
}

//Search the list to find the actor item with the specific id
function findActorById(actorId) {
    let length = Object.keys(actors).length;
    for (let i = 0; i < length; i++) {
        if (actors[i]['id'].toString() === actorId.toString()) {
            return actors[i];
        }
    }
    return null;
}
//Search the list to find the movie item with the specific id

function findMovieById(movieId) {
    let length = Object.keys(allMoviesArray).length;
    for (let i = 0; i < length; i++) {
        if (allMoviesArray[i]['id'].toString() === movieId.toString()) {
            return allMoviesArray[i];
        }
    }
    return null;
}

function addEventListenerToRightButtons() {
    for (let buttonIndex = 0; buttonIndex < rightButtons.length; buttonIndex++) {
        rightButtons[buttonIndex].addEventListener('click', function () {
            slideRight(rightButtons[buttonIndex].getAttribute("list"))
        });
    }
}

function addEventListenerToLeftButtons() {
    for (let buttonIndex = 0; buttonIndex < leftButtons.length; buttonIndex++) {
        leftButtons[buttonIndex].addEventListener('click', function () {
            slideLeft(leftButtons[buttonIndex].getAttribute("list"))
        });
    }
}