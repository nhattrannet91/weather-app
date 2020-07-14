const request = require("request");

const geocode = (address, callback) => {
    const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?limit=1&access_token=pk.eyJ1IjoibmhhdHRyYW5uZXQ5MSIsImEiOiJjazhsZTF2ZjEwYnNrM2Zud2lqYWZ1NDZhIn0.TYyakizGyMX7y106i_g7TQ`;
    request({url: geoURL, json: true}, (error, response) => {
        if(error){
            callback("Unable to access weather API")
            return;
        }

        if(response.body.message){
            callback("An error occured: " + response.body.message)
            return;
        }

        if(response.body.features.length === 0) {
            callback("Address not found");
            return;
        }

        const center = response.body.features[0].center;
        callback(undefined, {
            placeName: response.body.features[0].place_name,
            latitude: center[1],
            longitude: center[0]
        })
    });
}

module.exports = geocode;