fetch('./artists/artists.json')
  .then(response => response.json())
  .then(data => {
    // Ora il contenuto del file JSON è stato estratto e è disponibile nella variabile 'data'.
    console.log(data);
  })
  .catch(error => {
    console.error('Errore nel caricamento del file JSON', error);
  });
