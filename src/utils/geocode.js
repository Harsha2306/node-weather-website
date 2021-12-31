const request = require("request");
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaGFyc2hhNTU1IiwiYSI6ImNreHB0bG14ZjAybGsycm1wbTZwcTM1dXYifQ.QaehWGPD5WiVF0w1b2y8dg&limit=1`;
  request(url, (error, response, body) => {
    if (error) {
      callback(`Some thing went wrong Error NO (${error.errno})`, undefined);
    } else if (
      JSON.parse(body).features &&
      JSON.parse(body).features.length === 0
    )
      callback("No matching results", undefined);
    else if (JSON.parse(body) && JSON.parse(body).message)
      callback("Not Found", undefined);
    else {
      const data = JSON.parse(body);
      callback(undefined, {
        lat: data.features[0].center[1],
        lon: data.features[0].center[0],
        location: data.features[0].place_name,
      });
    }
  });
};
module.exports = geoCode;
