import {actors} from './movieConstants.js';

const actorImg = document.getElementById('actor-img');
const actorName = document.getElementById('actor-name');
const actorBio = document.getElementById('actor-bio');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let actorId = urlParams.get('actor-id');

let actor = findActorById(actorId);

actorImg.src = actor['image']
actorName.innerHTML = actor['name'];
actorBio.innerHTML = actor['bio'];

function findActorById(actorId) {
    let length = Object.keys(actors).length;
    for (let i = 0; i < length; i++) {
        if (actors[i]['id'].toString() === actorId.toString()) {
            return actors[i];
        }
    }
    return null;
}
