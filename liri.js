require("dotenv").config()


var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");


var spotify = new Spotify(keys.spotify);


var search = "";


var command = process.argv[2];

function MovieThis(search) {

    url = "http://www.omdbapi.com/?t=" + search + "&apikey=trilogy"
    request(url, function (error, response, body) {

        if (error) {
            console.log(error);
        }
        var jsonData = JSON.parse(body);

        var movieData = [
            "Movie: " + jsonData.Title,
            "Year: " + jsonData.Year,
            "IMDB Rating: " + jsonData.Ratings[0].Value,
            "Rotten Tomatoes: " + jsonData.Ratings[1].Value,
            "Country: " + jsonData.Country,
            "Language : " + jsonData.Language,
            "Plot: " + jsonData.Plot,
            "Actors : " + jsonData.Actors

        ].join("\n\n");

        console.log(movieData);
    });

}

function ConcertThis(band)
{
console.log(band);
 request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp" , function(error , data) {

 if(error)
 {
     console.log(error);
 }

 console.log(data);
 });
}

function SpotifyThis(song)
{
    spotify.search({ type : "track" , query : song}, function(error,data)
{
    if(error)
    {
        console.log(error);
    }
     var songD = data.tracks.items[0];
     var songData = [
             "Artist(s): " + songD.album.artists[0].name,
             "Name: " + songD.name,
             "Spotify Link: " + songD.album.external_urls.spotify,
             "Album: " + songD.album.name
         ].join("\n\n");
    console.log(songData);

})

}


function CommandLine(command)
{
    for (var i = 3; i < process.argv.length; i++) {
        search += process.argv[i] + " ";
    }
    if (command === "concert-this") {
        ConcertThis(search);
    }
    else if (command === "spotify-this-song") {
        SpotifyThis(search);
    }
    else if (command === "movie-this") {
        MovieThis(search);
    }
    else if (command === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (error, data) {

            if (error) {
                console.log(error);
            }
    
            console.log(data);
            var data2 = data.split(",");
            command = data2[0];
            search = data2[1];
            CommandLine(command);
    
        })
    }
    else {
        console.log("Please enter a valid command");
    }
}

CommandLine(command);
