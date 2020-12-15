// curernt local time & date

let now = new Date();

function currentDay() {
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
    let currentDay = days[now.getDay()];
    let currentDayValue = document.querySelector("#current-day");
    currentDayValue.innerHTML = `${currentDay} | `;
}

function currentClockTime() {
    let currentHours = now.getHours();
    let currentMinutes = now.getMinutes();
    let currentClockTimeValue = document.querySelector("#current-time");
    if (currentHours.toString().length === 1) {
      currentHours = "0" + currentHours;
    }
    if (currentMinutes.toString().length === 1) {
      currentMinutes = "0" + currentMinutes;
    }
    currentClockTimeValue.innerHTML = `${currentHours}:${currentMinutes}`;
}

currentDay();
currentClockTime();

// weather for searched city // DONE

function displaySearchedCityTemperature(response) {
    let searchedCityTemperature = Math.round(response.data.main.temp);
    let tempValue = document.querySelector("#current-temp");
    tempValue.innerHTML = `${searchedCityTemperature}`;
}

function getSearchedCityTemperature (searchedCity) {
    let apiKey = "e34fefde45cfc920d23b842e21f42ce4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displaySearchedCityTemperature);
}

function displaySearchedCity(event) {
    event.preventDefault();
    let searchedCity = document.querySelector("#search-text-input").value;
    let city = document.querySelector("#city");
    city.innerHTML = `${searchedCity}`
    getSearchedCityTemperature(searchedCity);
}

let citySearch = document.querySelector("#button-addon2");
citySearch.addEventListener("click", displaySearchedCity);

// weather for current city // DONE

function displayCurrentCity(response) {
    let currentCityName = response.data.name;
    let currentCity = document.querySelector("#city");
    currentCity.innerHTML = `${currentCityName}`
}

function getCurrentCity(latitude, longitude) {
    let apiKey = "e34fefde45cfc920d23b842e21f42ce4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayCurrentCity);
}

function displayCurrentTemperature(response) {
    let currentTemperature = Math.round(response.data.main.temp);
    let tempValue = document.querySelector("#current-temp");
    tempValue.innerHTML = `${currentTemperature}`;
}

function getCurrentTemperature(latitude, longitude) {
    let apiKey = "e34fefde45cfc920d23b842e21f42ce4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCurrentTemperature);
}

function logPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getCurrentTemperature(latitude, longitude);
    getCurrentCity(latitude, longitude);
}

function findCurrentLocation() {
    navigator.geolocation.getCurrentPosition(logPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", findCurrentLocation);

// temperature unit conversion // NEEDS FIXING

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempValue = document.querySelector("#current-temp");
  let tempValueUnit = document.querySelector("#temp-units");
  let tempC = document.querySelector("#current-temp");
  let tempF = (tempC * 9) / 5 + 32;
  tempF = Math.round(tempF);
  tempValue = tempValue.innerHTML = `${tempF}`;
  tempValueUnit = tempValueUnit.innerHTML = `°f`;
}

let celsiusToFahrenheitConversion = document.querySelector("#fahrenheit-button");
celsiusToFahrenheitConversion.addEventListener("click", convertToFahrenheit);