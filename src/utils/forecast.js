const request = require("request");
const forescast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=cb8bb6cb5e2ba039c5bf1288a5606d43&query=${latitude},${longitude}&units=m`;
  request(url, (error, response, body) => {
    if (error) {
      callback(`Some thing went wrong Error NO (${error.errno})`, undefined);
    } else if (JSON.parse(body) && JSON.parse(body).success === false) {
      callback(
        `${JSON.parse(body).error.info} Error No (${
          JSON.parse(body).error.code
        })`,
        undefined
      );
    } else {
      const data = JSON.parse(body);
      callback(undefined, {
        forecast: data.current.weather_descriptions[0],
      });
    }
  });
};

module.exports = forescast;
