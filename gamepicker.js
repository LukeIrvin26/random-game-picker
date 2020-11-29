const open = require('open');
const axios = require('axios');
const weightedRand = require('weighted-random');

const IGDB = {
  id: 0,
  weight: 75,
};

const rawgIO = {
  id: 1,
  weight: 25,
};

const twitchClientID = '0mstfatfihg4u4l8owrvse0vxzwcpq';
const twitchClientSecret = 'u3sgd1pwl1l61fp3dd7dsspbtxkxg7';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

async function getIGDBGame(id, token) {
  try {
    var response = await axios({
      url: 'https://api.igdb.com/v4/games',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': twitchClientID,
        Authorization: `Bearer ${token}`,
      },
      data: `fields *; where id = ${id};`,
    });
    return response.data[0];
  } catch (err) {
    console.error(err);
  }
}

async function authenticateTwitch() {
  try {
    const response = await axios({
      url: `https://id.twitch.tv/oauth2/token?client_id=${twitchClientID}&client_secret=${twitchClientSecret}&grant_type=client_credentials`,
      method: 'POST',
    });

    return response.data.access_token;
  } catch (err) {
    console.error(err);
  }
}

async function getMaxID(authToken) {
  try {
    const response = await axios({
      url: 'https://api.igdb.com/v4/games',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': twitchClientID,
        Authorization: `Bearer ${authToken}`,
      },
      data: 'fields *; sort id desc; limit 1;',
    });

    return response.data[0].id;
  } catch (err) {
    console.error(err);
  }
}

async function getRawgCount() {
  try {
    const response = await axios({
      url: 'https://api.rawg.io/api/games?page_size=1',
      method: 'GET',
      headers: { 'User-Agent': 'Random Game Picker' },
    });

    return response.data.count;
  } catch (err) {
    console.error(err);
  }
}

async function fetchRawgSlug(number) {
  try {
    const response = await axios({
      url: `https://api.rawg.io/api/games?page=${number}&page_size=1`,
      method: 'GET',
      headers: { 'User-Agent': 'Random Game Picker' },
    });

    return response.data.results[0].slug;
  } catch (err) {
    console.error(err);
  }
}

async function pickGame() {
  var whichDB = weightedRand([IGDB.weight, rawgIO.weight]);

  if (whichDB === IGDB.id) {
    try {
      var twitchAuthToken = await authenticateTwitch();
      var maxID = await getMaxID(twitchAuthToken);
      var idToGet = getRandomInt(1, maxID);
      var game = await getIGDBGame(idToGet, twitchAuthToken);
      while (isEmptyObject(game)) {
        idToGet = getRandomInt(1, maxID);
        game = await getIGDBGame(idToGet, twitchAuthToken);
      }

      open(game.url);
    } catch (err) {
      console.error(err);
    }
  } else if (whichDB === rawgIO.id) {
    var count = await getRawgCount();
    var randomNumber = getRandomInt(1, count);
    var slug = await fetchRawgSlug(randomNumber);
    open('https://rawg.io/games/' + slug);
  }
}

pickGame();
