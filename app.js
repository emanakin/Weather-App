const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    console.log(req.body.cityName)
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5a3bb5dcfbaa3f2e4e62fbe00d0ca88b&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const icon = weatherData.weather[0].icon;
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            res.write("<h1>The tempature in "+city+" is " + temp + " degrees Celcius</h1>");
            res.write("<p>"+city+" is currently " + desc + ".</p>");
            res.write("<img src="+imageURL+' alt="Image of weather">');

            res.send();
        });

    });
});

app.listen(3000, function(){
    console.log("Server running on port 300")
});