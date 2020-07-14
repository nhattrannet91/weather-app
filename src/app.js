const express = require("express");
const hbs = require("hbs");
const path = require("path");
const geocode = require("./utils/geocode");
const weatherForecast = require("./utils/weatherForecast");

const app = express();
const port = process.env.port || 3000;
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../public/templates/views"))
hbs.registerPartials(path.join(__dirname, "../public/templates/partials"));
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        createdBy: "Nhat Tran"
    });
});

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "The address was not provided" });
    }

    geocode(req.query.address, (error, {placeName, latitude, longitude} = {}) => {
       if(error){
           return res.send({ error: error });
       } 

       weatherForecast({latitude: latitude, longitude: longitude}, (err, weatherMessage) => {
           if(err){
               return res.send({ error: err });
           }

           return (res.send({
               placeName: placeName,
               forecast: weatherMessage
           }))
       });
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        createdBy: "Nhat Tran"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        createdBy: "Nhat Tran"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404 - Page not found",
        createdBy: "Nhat Tran"
    });
});

app.listen(port, () => { 
    console.log("Server is up at port " + port);
})