const request = require("request");

const geocode = (address, callback) => {
  const mapOptions = {
    location: encodeURIComponent(address),
    access_token:
      "pk.eyJ1Ijoia3NjaDA0NzkiLCJhIjoiY2p5N2tqeGFsMDBoZTNocDE4NDZjenBodSJ9.p_biBXx7YHGgmzVvnsWY0Q"
  };
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
    mapOptions.location
  }.json?access_token=${mapOptions.access_token}`;

  request({ url, json: true }, (error, response, { message, features }) => {
    if (error) {
      callback(`Unable to connect to location services`, undefined);
    } else if (message) {
      callback(`${message}`, undefined);
    } else if (features.length === 0) {
      callback(`Unable to find the location. Try another search`, undefined);
    } else {
      const data = {
        longitude: features[0].center[1],
        latitude: features[0].center[0],
        location: features[0].place_name
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
