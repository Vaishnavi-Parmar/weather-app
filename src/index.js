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

function displayEmoji(response) {
    console.log(response);
    let conditionId = (response.data.weather[0].id);
    if (conditionId === "Thunderstorm") {
        document.querySelector("#current-emoji").innerHTML = `<img src="http://openweathermap.org/img/wn/11d@2x.png" alt="Thunderstorm">`;
    }
    if (conditionId === "Drizzle") {
        document.querySelector("#current-emoji").innerHTML = `<img src="http://openweathermap.org/img/wn/09d@2x.png" alt="Drizzle">`;
    }
    if (conditionId >= 500 && conditionId <= 504) {
        document.querySelector("#current-emoji").innerHTML = `<img src="http://openweathermap.org/img/wn/10d@2x.png" alt="Rain">`;
    }
    if (conditionId === 511) {
        document.querySelector("#current-emoji").innerHTML = `<img src="http://openweathermap.org/img/wn/13d@2x.png" alt="Rain">`;
    }
    if (conditionId >= 520 && conditionId <= 531) {
        document.querySelector("#current-emoji").innerHTML = `<img src="http://openweathermap.org/img/wn/09d@2x.png" alt="Rain">`;
    }
    if (conditionId >= 600 && conditionId <= 622) {
        document.querySelector("#current-emoji").innerHTML = `<img src="http://openweathermap.org/img/wn/13d@2x.png" alt="Snow">`;
    }
    if (conditionId >= 701 && conditionId <= 781) {
        document.querySelector("#current-emoji").innerHTML = `<img src="http://openweathermap.org/img/wn/50d@2x.png" alt="Mist/Fog">`;
    }
    if (conditionId === 800) {
        document.querySelector("#current-emoji").innerHTML = `<img src="http://openweathermap.org/img/wn/01d@2x.png" alt="Clear">`;
    }
    if (conditionId === 801) {
        document.querySelector("#current-emoji").innerHTML = `<img src="http://openweathermap.org/img/wn/02d@2x.png" alt="Clouds">`;
    }
    if (conditionId === 802) {
        document.querySelector("#current-emoji").innerHTML = `<img src="http://openweathermap.org/img/wn/03d@2x.png" alt="Clouds">`;
    }    
    if (conditionId === 803 || conditionId === 804) {
        document.querySelector("#current-emoji").innerHTML = `<img src="http://openweathermap.org/img/wn/04d@2x.png" alt="Clouds">`;
    }
}

function getWeatherCondition(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayEmoji);
}

// currrent weather conditions

let apiKey = "e34fefde45cfc920d23b842e21f42ce4";

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
    let temperature = Math.round(response.data.main.temp);
    document.querySelector("#current-temp").innerHTML = `${temperature}`;
}

function getTemperature (city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function displayCity(event) {
    event.preventDefault();
    let city = document.querySelector("#search-text-input").value;
    document.querySelector("#city").innerHTML = `${city}`
    getTemperature(city);
    getVisibility(city);
    getHumidity(city);
    getWindSpeed(city);
    getWeatherCondition(city)
}

let citySearch = document.querySelector("#button-addon2");
citySearch.addEventListener("click", displayCity);

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