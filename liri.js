require("dotenv").config()


var request = require("request");
var keys = require("./keys.js");

var spotify = new spotify(keys.spotify);

var search = "";

for(var i = 3; i < process.argv.length; i++)
{
    search += process.argv[i] + " ";
}

var command = process.argv[2];

if(command === "concert-this")
{

}
else if (command === "spotify-this-song")
{

}
else if (command === "movie-this")
{
    url = "http://www.omdbapi.com/?t=" + search + "&apikey=trilogy"
    request(url , function(error, response , body) {

        if(error)
        {
            console.log(error);
        }

        var jsonData = JSON.parse(body);

        var movieData = [
            "Movie: " + jsonData.Title,
            "Year: " + jsonData.Year,
            "IMDB Rating: " + jsonData.Ratings[0].value,
            "Rotten Tomatoes: " + jsonData.Ratings[1].value,
            "Country: " + jsonData.Country,
            "Language : " + jsonData.Language,
            "Plot: " + jsonData.Plot,
            "Actors : " + jsonData.Actors

          ].join("\n\n");

          console.log(movieData);
    })
}
else if (command === "do-what-it-says")
{

}
else
{
    console.log("Please enter a valid command");
}