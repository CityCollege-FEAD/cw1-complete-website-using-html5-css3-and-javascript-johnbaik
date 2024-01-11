//Import actors array from movieConstants.js
import {actors} from './movieConstants.js';

const actorsList = document.getElementById("actors-list");
//Clear any existing content within the actors-list element
actorsList.innerHTML = "";

let numOfActors = Object.keys(actors).length

//Iterate through each actor to create and display actor details
for (let i = 0; i < numOfActors; i++) {
    //Create HTML elements for actor details
    let actorItem = document.createElement("li");
    let actorReference = document.createElement("a");
    let actorImage = document.createElement("img");
    let actorSection = document.createElement("section");
    let actorName = document.createElement("h1");
    let actorMovies = document.createElement("p");

    let actorId = actors[i]['id'];

    //Creating a link to the individual actor's page using their ID
    actorReference.href = "actor.html?actor-id=" + actorId.toString();

    //Set attributes for the actor image
    actorImage.src = actors[i]['image'];
    actorImage.alt = "actor image";
    actorImage.className = "actor-image";

    actorName.innerHTML = actors[i]['name'];
    actorName.className = "actor-name";
    actorMovies.innerHTML = "Movies: " + actors[i]['movies'].length;
    actorMovies.className = "actor-movies";

    //Constructing the actor details section
    actorReference.appendChild(actorImage);
    actorSection.appendChild(actorName);
    actorSection.appendChild(actorMovies);
    actorSection.className = "actor-details";

    //Constructing the overall actor item
    actorItem.className = "actor-item";

    //Appending the actor item to the actors-list
    actorItem.appendChild(actorReference);
    actorItem.appendChild(actorSection);
    actorsList.appendChild(actorItem);
}