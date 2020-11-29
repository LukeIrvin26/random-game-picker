# random-game-picker

Simple node.JS script to fetch a random game from RAWG.io API or IGDB.com

IGDB.com is given priority as it has more relevant games for the most part. However RAWG will pop up too for the more obscure games.

Easy peasy, just make sure you do the following:

1. Run `npm install axios`
2. Run `npm install open`
3. Run `npm install weighted-random`
4. Run `node gamepicker.js`

You will be presented with the name of the game picked, as well as the release date (in case of games with similar names)
