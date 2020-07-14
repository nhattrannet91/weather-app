const request = require("request");

const weatherForecast = ({latitude, longitude}, callback) => {
    const weatherURL =`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&id=1566083&appid=3f82aa402017e8d451c5fc9256fe744f`;
    request({ url: weatherURL, json: true}, (error, response) => {
        if(error){
            callback("Unable to access the weather API");
            return;
        }

        if(!response.body.main){
            callback(response.body.message);
            return;
        }

        const {temp, humidity} = response.body.main;
        callback(undefined, `Its currently ${temp} degrees out. There is a ${humidity}% chance of rain.`)
    })
};

module.exports = weatherForecast;