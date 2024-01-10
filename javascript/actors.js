import {actors} from './movieConstants.js';

const actorsList = document.getElementById("actors-list");
actorsList.innerHTML = "";

let numOfActors = Object.keys(actors).length

for (let i = 0; i < numOfActors; i++) {

    let actorItem = document.createElement("li");
    let actorReference = document.createElement("a");
    let actorImage = document.createElement("img");
    let actorSection = document.createElement("section");
    let actorName = document.createElement("h1");
    let actorMovies = document.createElement("p");

    let actorId = actors[i]['id']; // due to I have only 5 actors and I want to show you more items I duplicate these. In other case the modulo does not need
    actorReference.href = "actor.html?actor-id=" + actorId.toString();

    actorImage.src = actors[i]['image'];
    actorImage.alt = "actor image";
    actorImage.className = "actor-image";

    actorName.innerHTML = actors[i]['name'];
    actorName.className = "actor-name";
    actorMovies.innerHTML = "Movies: "+actors[i]['movies'].length;
    actorMovies.className = "actor-movies";

    actorReference.appendChild(actorImage);
    actorSection.appendChild(actorName);
    actorSection.appendChild(actorMovies);
    actorSection.className = "actor-details";

    actorItem.className = "actor-item";
    actorItem.appendChild(actorReference);
    actorItem.appendChild(actorSection);
    actorsList.appendChild(actorItem);
}