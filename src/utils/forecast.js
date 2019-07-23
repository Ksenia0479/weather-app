const request = require("request");

const forecast = ({ longitude, latitude }, callback) => {
  const url = `https://api.darksky.net/forecast/c3101975220f9ad3f37c71245688874c/${longitude},${latitude}?lang=en`;

  request({ url, json: true }, (e, response, { error, currently }) => {
    if (e) {
      callback("Unable to connect to location services", undefined);
    } else if (error) {
      callback(error, undefined);
    } else {
      const forecastNote = `It's currently ${
        currently.temperature
      } degrees out, ${currently.summary}. There is a ${
        currently.precipProbability
      } change of rain`;
      callback(undefined, forecastNote);
    }
  });
};

module.exports = forecast;
