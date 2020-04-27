const fetch = require('node-fetch');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

fetch('https://api.rawg.io/api/games?page_size=1')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    var count = data.count;
    var randomNumber = getRandomInt(count);
    fetch(`https://api.rawg.io/api/games?page=${randomNumber}&page_size=1`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.results[0].name + ' ' + data.results[0].released);
      })
      .catch((err) => {
        console.error('Bro your second call sucks dude: ' + err);
      });
  })
  .catch((err) => {
    console.error('Do you even code bro? ' + err);
  });
