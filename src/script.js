let artists;
const btnSearch = document.getElementById('btnSearch');
let attempts = 0;
let chosenArtist;
let artistContainer = document.getElementById('artistContainer');

window.onload = loadJSON;

async function loadJSON() {
    const response = await fetch('./artists/artists.json');
    artists = await response.json();
    console.log(artists);

    document.getElementById('numAttempts').innerHTML = "Attempts: " + attempts;
    chosenArtist = getRandomArtist();
}

btnSearch.addEventListener('click', function() {
    let searchedArtist = document.getElementById('artistName').value;

    if (searchedArtist != '') {
        searchForArtist(searchedArtist);
    } else {
        alert("You need to insert an artist");
    }
});

function searchForArtist(name) {
    if (attempts >= 10) {
        alert("You lost, it was " + chosenArtist.name);
        return;
    }

    for (let i = 0; i < artists.length; i++) {
        if (name === artists[i].name) {
            attempts++;
            document.getElementById('numAttempts').innerHTML = "Attempts: " + attempts;

            printArtistData(artists[i]);
        }
    }

    if (chosenArtist.name === name) {
        alert("You won");
    }

    document.getElementById('artistName').value = '';
}

function printArtistData(artist) {
    let artistCard = document.createElement('div');
    artistCard.classList.add('col-md-4', 'mb-4');

    let artistCardInner = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${artist.name}</h5>
                <p class="card-text">Year of debut: ${artist.yearDebut}${getSimilarity(artist.yearDebut, "yearDebut")}</p>
                <p class="card-text">Group size: ${artist.sizeGroup}${getSimilarity(artist.sizeGroup, "sizeGroup")}</p>
                <p class="card-text">Rank: ${artist.rank}${getSimilarity(artist.rank, "rank")}</p>
                <p class="card-text">Gender: ${artist.gender}${getSimilarity(artist.gender, "gender")}</p>
                <p class="card-text">Genre: ${artist.genre}${getSimilarity(artist.genre, "genre")}</p>
                <p class="card-text">Nationality: ${getFlag(artist.nationality)}${getSimilarity(artist.nationality, "nationality")}</p>
            </div>
        </div>
    `;

    artistCard.innerHTML = artistCardInner;
    artistContainer.appendChild(artistCard);
}

function getRandomArtist() {
    return artists[getRandomInt(artists.length)];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getSimilarity(data, typeData) {
    let similarity = '';

    if (typeData === "yearDebut") {
        if (data === chosenArtist.yearDebut)
            similarity = " 🟢 ";
        else if (data >= chosenArtist.yearDebut - 5 && data <= chosenArtist.yearDebut + 5)
            similarity = " 🟡 ";
    }

    if (typeData === "sizeGroup" && data === chosenArtist.sizeGroup)
        similarity = " 🟢 ";

    if (typeData === "rank") {
        if (data === chosenArtist.rank)
            similarity = " 🟢 ";
        else if (data >= chosenArtist.rank - 50 && data <= chosenArtist.rank + 50)
            similarity = " 🟡 ";
    }

    if (typeData === "gender" && data === chosenArtist.gender)
        similarity = " 🟢 ";

    if (typeData === "genre" && data === chosenArtist.genre)
        similarity = " 🟢 ";

    if (typeData === "nationality" && data === chosenArtist.nationality)
        similarity = " 🟢 ";

    return similarity;
}

function getFlag(nationality) {
    let flag = '<i class="flag-icon flag-icon-' + nationality + '"></i>';
    return flag;
}