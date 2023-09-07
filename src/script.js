window.onload = loadJSON;
let artists = null;

async function loadJSON() {
    const response = await fetch("./artists/artists.json");
    artists = await response.json();
    console.log(artists);
}