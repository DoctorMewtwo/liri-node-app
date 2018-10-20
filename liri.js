require("dotenv").config()

var keys = require("./keys.js");

var spotify = new spotify(keys.spotify);

var command = process.argv[2];

if(command === "concert-this")
{

}
else if (command === "spotify-this-song")
{

}
else if (command === "movie-this")
{

}
else if (command === "do-what-it-says")
{

}
else
{
    console.log("Please enter a valid command");
}