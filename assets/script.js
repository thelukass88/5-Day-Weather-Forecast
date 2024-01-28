var cityInput = document.querySelector("#city-search");
var searchButton = document.querySelector(".search-btn");

const getCoordinates = () => {
    var cityName = cityInput.value.trim();
    if(!cityName) return;

    console.log(cityName)
}

searchButton.addEventListener("click", getCoordinates);

// API Key
const apiKey = "Y048bc7be255772a31199cccc135b1113"; 