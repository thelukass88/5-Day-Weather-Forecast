var city = document.querySelector("#city-search");
var searchButton = document.querySelector(".search-btn");
var forecastCards = document.querySelector(".forecast-cards")

// API Key
const apiKey = ""; 

//
const createWeatherCard = (weatherItem) => {
    return `<li class="card">
               <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
               <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
               <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
               <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
               <h6>Humidity: ${weatherItem.main.humidity}%</h6>
            </li>`;
}

//fetch  forecast weather sing latitude and longitude to identify entered city
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
            forecastCards.insertAdjacentHTML("beforeend", createWeatherCard(weatherItem));
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

