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

// current weather emoji // IN PROGRESS

let apiKey = "e34fefde45cfc920d23b842e21f42ce4";

function displayEmoji(response) {
    let conditionIcon = (response.data.weather[0].icon);
    let conditionDecscription = (response.data.weather[0].description);
    document.querySelector("#current-emoji").innerHTML = `<img src="https://openweathermap.org/img/wn/${conditionIcon}@2x.png" alt="${conditionDecscription}">`;
}

function getWeatherCondition(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayEmoji);
}

// currrent weather conditions

function displayVisibility(response) {
    let visibility = Math.round(response.data.visibility);
    if (visibility === 10000) {
        document.querySelector("#visibility").innerHTML = `Very good`;
    }
    if (visibility < 10000 && visibility >= 7500) {
        document.querySelector("#visibility").innerHTML = `Good`;        
    }
    if (visibility < 7500 && visibility >= 5000) {
        document.querySelector("#visibility").innerHTML = `Ok`;        
    }
    if (visibility < 5000 && visibility >= 2500) {
        document.querySelector("#visibility").innerHTML = `Poor`;        
    }
    if (visibility < 2500 && visibility >= 0) {
        document.querySelector("#visibility").innerHTML = `Very poor`;        
    }
}

function getVisibility(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayVisibility);
}


function displayHumidity(response) {
    let humidity = Math.round(response.data.main.humidity);
    document.querySelector("#humidity").innerHTML = `${humidity}%`;
}

function getHumidity(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayHumidity);
}


function displayWindSpeed(response) {
    let windSpeed = Math.round(response.data.wind.speed);
    document.querySelector("#wind-speed").innerHTML = `${windSpeed} m/s`;
}

function getWindSpeed(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWindSpeed);
}

// weather for searched city // DONE

function displayTemperature(response) {
    celsiusTemperature = response.data.main.temp;
    let temperature = Math.round(celsiusTemperature);
    document.querySelector("#current-temp").innerHTML = `${temperature}`;
}

function getTemperature(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function displayCity(response) {
    let city = response.data.name;
    document.querySelector("#city").innerHTML = `${city}`;
    getTemperature(city);
    getVisibility(city);
    getHumidity(city);
    getWindSpeed(city);
    getWeatherCondition(city);
}

function search(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayCity);
}

function handleSearch(event) {
    event.preventDefault();
    let city = document.querySelector(".form-control").value;
    document.querySelector("#city").innerHTML = `${city}`
    search(city);
}

// temperature unit conversion // IN PROGRESS

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let currentTemperature = document.querySelector("#current-temp");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
    let temperatureUnits = document.querySelector("#temp-units");
    temperatureUnits.innerHTML = `°f`;
}

let celsiusTemperature = null;

let citySearch = document.querySelector("#search-button");
citySearch.addEventListener("click", handleSearch);

let celsiusToFahrenheitConversion = document.querySelector("#fahrenheit-button");
celsiusToFahrenheitConversion.addEventListener("click", displayFahrenheitTemperature);

search("London");

// weather for current city // DONE

function displayCurrentCity(city) {
    document.querySelector("#city").innerHTML = `${city}`
}

function getCurrentLocationName(response) {
    let city = (response.data.name);
    displayCurrentCity(city);
    getTemperature(city);
    getVisibility(city);
    getHumidity(city);
    getWindSpeed(city);
    getWeatherCondition(city);
}

function getLatitudeAndLongitude(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(getCurrentLocationName);
}

function findCurrentLocation() {
    navigator.geolocation.getCurrentPosition(getLatitudeAndLongitude);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", findCurrentLocation);