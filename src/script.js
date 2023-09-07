let artists;
const btnSearch = document.getElementById('btnSearch');
let attempts = 0;
let chosenArtist;
window.onload = loadJSON;

async function loadJSON() {
    const response = await fetch('./artists/artists.json');
    artists = await response.json();
    console.log(artists);

    document.getElementById('numAttempts').innerHTML = "Attempts: " + attempts;
    chosenArtist = getRandomArtist();
    console.log("Artist to guess: " + chosenArtist.name);
}

btnSearch.addEventListener('click', function() {
    let searchedArtist = document.getElementById('artistName').value;

    if(searchedArtist != '')
        searchForArtist(searchedArtist);
    else
        alert("You need to insert an artist");
});

function searchForArtist(name) {

    if(attempts >= 10)
        return;

    for(let i = 0; i < artists.length; i++) {
        if(name === artists[i].name)
            printArtistData(artists[i]);
    }

    if(chosenArtist.name === name)
        alert("You won");

    // clear search bar
    document.getElementById('artistName').value = '';

    // increase number of attempts
    attempts++;
    document.getElementById('numAttempts').innerHTML = "Attempts: " + attempts;
}

function printArtistData(artist) {
    let output = document.getElementById('sample');
    let newArtist = '<br> <b>' + artist.name + '</b> <br>' +
                    "Year of debut: " + artist.yearDebut + getSimilarity(artist.yearDebut, "yearDebut") + '<br>' +
                    "Group size: " + artist.sizeGroup + getSimilarity(artist.sizeGroup, "sizeGroup") + '<br>' + 
                    "Rank: " + artist.rank + getSimilarity(artist.rank, "rank") + '<br>' +
                    "Gender: " + artist.gender + getSimilarity(artist.gender, "gender") + '<br>' +
                    "Genre: " + artist.genre + getSimilarity(artist.genre, "genre") + '<br>';
    
    output.innerHTML = newArtist + output.innerHTML;
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

    if(typeData === "sizeGroup" && data === chosenArtist.sizeGroup)
        similarity = " 🟢 ";

    if (typeData === "rank") {
        if (data === chosenArtist.rank)
            similarity = " 🟢 ";
        else if (data >= chosenArtist.rank - 50 && data <= chosenArtist.rank + 50)
            similarity = " 🟡 ";
    }    

    if(typeData === "gender" && data === chosenArtist.gender)
        similarity = " 🟢 ";

    if(typeData === "genre" && data === chosenArtist.genre)
        similarity = " 🟢 ";

    if(typeData === "nationality" && data === chosenArtist.nationality)
        similarity = " 🟢 ";

    return similarity;
}