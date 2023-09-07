window.onload = loadJSON;
let artists = null;
let btnSearch = document.getElementById('btnSearch');

async function loadJSON() {
    const response = await fetch('./artists/artists.json');
    artists = await response.json();
    console.log(artists);
}

btnSearch.addEventListener('click', function() {
    let searchedArtist = document.getElementById('artistName').value;
    console.log("You searched for: " + searchedArtist);
});