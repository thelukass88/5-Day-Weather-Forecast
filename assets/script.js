var city = document.querySelector("#city-search");
var searchButton = document.querySelector(".search-btn");
var currentWeather = document.querySelector(".current-weather");
var forecastCards = document.querySelector(".forecast-cards")

// API Key
const apiKey = "048bc7be255772a31199cccc135b1113"; 

//
const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) { // HTML for the main weather card
        return `<div class="details">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { // HTML for the other five day forecast card
    return `<li class="card">
               <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
               <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
               <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
               <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
               <h6>Humidity: ${weatherItem.main.humidity}%</h6>
            </li>`;
    }
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

        // removes previous weather data
        city.value = "";
        currentWeather.innerHTML = "";
        forecastCards.innerHTML = "";


        //Five day forecast cards
        console.log(fiveDaysForecast);
        fiveDaysForecast.forEach((weatherItem, index) => {
            if(index === 0) {
                currentWeather.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));

            } else {
                forecastCards.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
            }
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

