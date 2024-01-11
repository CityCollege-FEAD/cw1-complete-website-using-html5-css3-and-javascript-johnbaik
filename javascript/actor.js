//Import actors array from movieConstants.js
import {actors} from './movieConstants.js';

const actorImg = document.getElementById('actor-img');
const actorName = document.getElementById('actor-name');
const actorBio = document.getElementById('actor-bio');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//Get actor-id from the URL parameters
let actorId = urlParams.get('actor-id');
let actor = findActorById(actorId);

//Set actor details in the HTML elements
actorImg.src = actor['image']
actorName.innerHTML = actor['name'];
actorBio.innerHTML = actor['bio'];

//Function to find an actor by their ID in the actors array
function findActorById(actorId) {
    let length = Object.keys(actors).length;
    //Iterate through the actors array to find the element with the actor-id
    for (let i = 0; i < length; i++) {
        if (actors[i]['id'].toString() === actorId.toString()) {
            return actors[i];
        }
    }
    return null;
}
