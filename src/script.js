let artists;
const btnSearch = document.getElementById('btnSearch');
let attempts = 0;
let chosenArtist;
let artistContainer = document.getElementById('artistContainer');
let addedArtists = new Set();

window.onload = loadJSON;

async function loadJSON() {
    const response = await fetch('./artists/artists.json');
    artists = await response.json();
    console.log(artists);

    document.getElementById('numAttempts').innerHTML = "Attempts: " + attempts;
    chosenArtist = getRandomArtist();
    console.log("Artist to guess: " + chosenArtist.name);
}

const searchInput = document.getElementById("artistName");
const suggestionList = document.getElementById("suggestionList");

let suggerimentiMostrati = 0;

searchInput.addEventListener("input", function () {
    const userInput = searchInput.value.toLowerCase();
    suggestionList.innerHTML = "";
    suggerimentiMostrati = 0;

    const suggerimenti = artists.filter(artist => {
        if (suggerimentiMostrati < 5 && artist.name.toLowerCase().includes(userInput)) {
            suggerimentiMostrati++;
            return true;
        }
        return false;
    });

    suggerimenti.forEach(suggerimento => {
        const suggerimentoElement = document.createElement("div");
        suggerimentoElement.textContent = suggerimento.name;
        suggerimentoElement.addEventListener('click', function() {
            document.getElementById('artistName').value = suggerimento.name;
            suggestionList.innerHTML = ""; // Svuota la lista dei suggerimenti quando si seleziona un nome.
            searchForArtist(suggerimento.name); // Chiamare automaticamente la funzione searchForArtist quando viene selezionato un nome.
        });
        suggestionList.appendChild(suggerimentoElement);
    });
});

btnSearch.addEventListener('click', function() {
    let searchedArtist = document.getElementById('artistName').value;
    searchedArtist = searchedArtist.trim();

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

    if (addedArtists.has(name)) {
        alert("You already guessed this artist.");
        return;
    }

    for (let i = 0; i < artists.length; i++) {
        if (name === artists[i].name) {
            attempts++;
            document.getElementById('numAttempts').innerHTML = "Attempts: " + attempts;

            printArtistData(artists[i]);
            addedArtists.add(name); // Aggiungi l'artista all'insieme dei nomi già inseriti.
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
                <p class="card-text">${attempts}° attempt</p>
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
    artistContainer.prepend(artistCard); // Usa 'prepend' per aggiungere il nuovo artista in cima alla lista.
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
        if(data > chosenArtist.yearDebut)
            similarity += " ⬇️ ";
        else if (data < chosenArtist.yearDebut)
            similarity += " ⬆️ ";
    }

    if (typeData === "sizeGroup" && data === chosenArtist.sizeGroup)
        similarity = " 🟢 ";

    if (typeData === "rank") {
        if (data === chosenArtist.rank)
            similarity = " 🟢 ";
        else if (data >= chosenArtist.rank - 50 && data <= chosenArtist.rank + 50)
            similarity = " 🟡 ";
        if(data > chosenArtist.rank)
            similarity += " ⬆️ ";
        else if (data < chosenArtist.rank)
            similarity += " ⬇️ ";
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