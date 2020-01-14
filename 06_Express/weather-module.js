module.exports =
{
    apiURI ='https://api.openweathermap.org/data/2.5/weather?q=Yongin,kr&units=metric&appid=',
    apiKey ='9a27ff40da7fd1937a24392ed49263a5',
    
    getWeather: function(callback)
    {
        var request = require('request');
        var weatherURI = this.apiURI + this.apiKey;
        request(weatherURI, function(error, response, data)
        {
            if(error)
            {
                throw error;
            }
            var result = JSON.parse(data);
            let weatherInfo =`도시명: ${result.name}, 기온: ${result.main.temp} &deg; 체감:${result.main.feels_like}`;
            weatherInfo +=`<img src="http://openweatermap.org/img/w/${result.weather[0].icon}.png" height="50" width="50">`;
            callback(weatherInfo);
        });
    }
}

