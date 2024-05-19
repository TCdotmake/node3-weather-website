const request = require("request");
const forecast = ({ latitude, longitude, location }, callback) => {
  const base = `http://api.weatherapi.com/v1/current.json?key=115d89319506488097513704242804&q=`;

  const url = base + `${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(body.error.message, undefined);
    } else {
      callback(undefined, {
        location,
        latitude,
        longitude,
        time: body.location.localtime,
        temp: body.current.temp_f,
        condition: body.current.condition.text,
      });
    }
  });
};

module.exports = forecast;
