var city = document.querySelector("#city-search");
var searchButton = document.querySelector(".search-btn");

// API Key
const apiKey = "048bc7be255772a31199cccc135b1113"; 

const getCoordinates = () => {
    var cityName = city.value.trim();
    if(!cityName) return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;;

    fetch(API_URL).then(res => res.json()).then(data => {
        console.log(data)
    }).catch(() => {
        alert("An error occured while fetching the coordinates!");
    })

}

searchButton.addEventListener("click", getCoordinates);

