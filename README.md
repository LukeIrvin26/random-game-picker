# random-game-picker

Simple node.JS script to fetch a random game from RAWG.io API or IGDB.com

IGDB.com is given priority as it has more relevant games for the most part. However RAWG will pop up too for the more obscure games.
Make sure you have [NodeJS](https://nodejs.org/en/) installed.

To start getting random games, do the following:

1. Run `npm install axios`
2. Run `npm install open`
3. Run `npm install weighted-random`
4. [Sign up](https://dev.twitch.tv/login) for a Twitch account if you do not already have one, otherwise, login.
5. [Enable Two Factor](https://www.twitch.tv/settings/security) auth on your Twitch account.
6. [Register](https://dev.twitch.tv/console/apps/create) an application for your gamepicker app.
   1. OAuth Redirect URLs can just be `http://localhost.
   2. Category can be `Application Integration`
7. Once registered, [manage](https://dev.twitch.tv/console/apps) your application you just created
8. Generate a Client Secret.
9.  Open `gamepicker.bat` and change the line `cd [YOUR_PATH_HERE]` to reflect the directory where the folder was cloned to. (This is useful because you can move the batch file elsewhere, and create shortcuts to run the batch file)
10. Open `gamepicker.js` and change the constants `twitchClientID` and `twitchClientSecret` to reflect the client ID and the client secret you generated. These can both be found on the screen that you generated the secret on in Step 9.
11. Run `node gamepicker.js`

Your default browser will automatically open to the page on either [IGDB](https://www.igdb.com) or [RAWG.io](https://rawg.io) for the game that was selected!
Have fun gaming!!
