const request = require("request");

const geoBase = "https://api.mapbox.com/search/geocode/v6/forward?q=";

const geoToken =
  "&access_token=pk.eyJ1IjoidG9tbXlqY2hlbiIsImEiOiJjbHZoNmhwdngxMnZiMmlzMmE3aWNldTFsIn0.A1YmcY47fX2jD2LQeYPejQ";

function geocode(address, callback) {
  const url = geoBase + address + geoToken + "&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Location not found!", undefined);
    } else {
      const { latitude, longitude } = body.features[0].properties.coordinates;
      callback(undefined, {
        latitude,
        longitude,
        location: body.features[0].properties.full_address,
      });
    }
  });
}

module.exports = geocode;
