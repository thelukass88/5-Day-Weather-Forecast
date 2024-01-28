var city = document.querySelector("#city-search");
var searchButton = document.querySelector(".search-btn");

// API Key
const apiKey = "048bc7be255772a31199cccc135b1113"; 

const createWeatherCard = (weatherItem) => {
    return '';
}

const getWeatherData = (cityName, lat, lon) => {
    const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
        
        console.log(data);
        
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }

        });

        console.log(fiveDaysForecast);
        fiveDaysForecast.forEach(weatherItem => {
            createWeatherCard(weatherItem);
        });

  
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    })
}

//Coordinates fetch
const getCoordinates = () => {
    var cityName = city.value.trim();
    if(!cityName) return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;;

    // Fetch provides city coordinates 
    fetch(API_URL).then(res => res.json()).then(data => {
        if(!data.length) return alert(`No coordinates found for ${cityName}`);
        const { name, lat, lon } = data[0];
        getWeatherData(name, lat, lon);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    })

}

searchButton.addEventListener("click", getCoordinates);

