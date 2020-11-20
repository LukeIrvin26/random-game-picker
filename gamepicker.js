const fetch = require('node-fetch');
const open = require('open');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

fetch('https://api.rawg.io/api/games?page_size=1', {
  method: 'Get',
  headers: { 'User-Agent': 'Random Game Picker' },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    var count = data.count;
    var randomNumber = getRandomInt(count);
    fetch(`https://api.rawg.io/api/games?page=${randomNumber}&page_size=1`, {
      method: 'Get',
      headers: { 'User-Agent': 'Random Game Picker' },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        open('https://rawg.io/games/' + data.results[0].slug);
      })
      .catch((err) => {
        console.error('Bro your second call sucks dude: ' + err);
      });
  })
  .catch((err) => {
    console.error('Do you even code bro? ' + err);
  });
