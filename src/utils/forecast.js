const requestLib = require('request');

const forecastAsync = (latitude, longitude, callback) => {
    const forecastUrl = `http://api.weatherstack.com/current?access_key=0cc1bbf545161788888d1093fb20f1a7&query=${encodeURIComponent(latitude + ',' + longitude)}}&units=m`;

    requestLib(forecastUrl, { json: true }, (error, { body: data }) => {
        if (error) { 
            return callback('Unable to connect to the Forecast Service!!!', undefined);
        }

        if (!data || data.error) {
            return callback(data.error.info, undefined);
        }

        const location = data.location.name + ', ' + data.location.region + ', ' + data.location.country;
        const current = data.current;

        callback(null, {
            feelsLike: current.feelslike,
            humidity: current.humidity,
            location,
            observationTime: current.observation_time,
            temperature: current.temperature,
            type: current.weather_descriptions[0],
            windDirection: current.wind_dir,
            windSpeed: current.wind_speed
        });
    });
};

module.exports = forecastAsync;