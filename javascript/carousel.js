import {allMoviesArray, actors} from './movieConstants.js';

const carouselItemLists = document.getElementsByClassName('carousel-item-list');
const movieCarouselItemImg = document.getElementsByClassName('movie-carousel-item-img');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


const leftButtons = document.getElementsByClassName('left-carousel-button'); // we should add event listeners to call the slide function because the carousel.js is type module
const rightButtons = document.getElementsByClassName('right-carousel-button');

addEventListenerToLeftButtons();

addEventListenerToRightButtons();

let actorId = urlParams.get('actor-id');
let totalMovies = 0;

if (actorId != null && actorId !== "undefined") {
    totalMovies = actors[actorId]['movies'].length;
} else {
    totalMovies = Object.keys(allMoviesArray).length;
}

checkToResize();

window.addEventListener("resize", checkToResize);

function checkToResize() {

        let actorId = urlParams.get('actor-id');
        let totalMovies = 0;

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

    let maxCarouselItems = Math.min(...[movieIds.length, numOfMoviesFits]);
    console.log(maxCarouselItems);
    for (let carouselItemListIndex = 0; carouselItemListIndex < carouselItemLists.length; carouselItemListIndex++) {

        carouselItemLists[carouselItemListIndex].innerHTML = "";
        for (let carouselItemIndex = 0; carouselItemIndex < maxCarouselItems; carouselItemIndex++) {
            let img = document.createElement("img");
            img.className = "movie-carousel-item-img";
            console.log(movieIds[carouselItemIndex]);
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
    console.log('movieIds ' + movieIds);

    let carouselItemList = document.getElementById(carouselListId);

    carouselItemList.children[0].remove();
    let numOfMovies = carouselItemList.children.length;
    let lastChild = carouselItemList.children[numOfMovies - 1];
    let url = new URL(lastChild.children[0].href);
    let lastMovieId = url.searchParams.get("movie-id");

    console.log('Math.max(...movieIds) ' + Math.max(...movieIds));

    let index = movieIds.findIndex(num => num.toString() === lastMovieId.toString());

    if (index >= movieIds.length - 1) {
        lastMovieId = movieIds[0];
    } else {
        console.log('index ' + index)
        lastMovieId = movieIds[(index + 1)];
    }
    console.log('lastMovieId ' + lastMovieId)
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
    console.log('movieIds ' + movieIds);
    console.log('firstMovieId ' + firstMovieId);

    let index = movieIds.findIndex(num => num.toString() === firstMovieId.toString());

    console.log('index ' + index);
    console.log('movieIds.length-1 ' + (movieIds.length - 1));

    if (index === 0) {
        firstMovieId = movieIds[movieIds.length - 1];
    } else {
        firstMovieId = movieIds[(index - 1)];
    }
    console.log('firstMovieId ' + firstMovieId);

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