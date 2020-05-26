const API_KEY = `b9f3730c8d60e1a5d1b1f8d4401967df`;
let weatherLocationBtn = document.getElementById("weatherLocationBtn");

let URI;
(function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    }
})();

function showLocation(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    URI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`;
    showWeather(URI);
}

// code below made by example: https://dev.to/drewclem/building-a-weather-app-with-vanilla-javascript-19p9
function fToC (fahrenheit) {
    return Math.floor((fahrenheit - 32) * 5 / 9);
}

function cToF (celsius) {
    return Math.floor(celsius * 9 / 5 + 32);
}

function toggleTemp(event) {
    let tempCypher = event.target.previousElementSibling.innerHTML;

    if(event.target.innerHTML === '°C') {
        event.target.previousElementSibling.innerHTML = 
        cToF(tempCypher);
        event.target.innerHTML = '°F';
    } else if (event.target.innerHTML === '°F') {
        event.target.previousElementSibling.innerHTML = 
        fToC(tempCypher);
        event.target.innerHTML = '°C';
    }
}

// end of code by example

function showWeather() {
    fetch(URI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const main = document.getElementById("main");
            main.innerHTML = `
                <h1>${data.name}</h1>
                <br>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                <br>
                <div>
                <p class="temperature">${Number(data.main.temp).toFixed()}</p>
                <p class="toggle-btn" onclick="toggleTemp(event)">°C</p>
                </div>
                <p class="main-weather-description">${data.weather[0].main}</p>
                <p class="feels-like">Feels like: ${Number(data.main.feels_like).toFixed()} °C</p>
                <p class="humidity">Humidity ${data.main.humidity} %</p>
                <p class="air-pressure">Air pressure ${data.main.pressure} hPa</p>
                <p class="wind">Wind ${data.wind.speed} m/s</p>
                <p class="clouds">Clouds: ${data.clouds.all} %</p>
                <p class="visibility">Visibility: ${data.visibility} m</p>
                <br>
                <p class="general-description">Weather in ${data.name}: ${data.weather[0].description}.</p>
            `;
        })
        .catch(function (error) {
            console.log(error);
        })
}


function searchWeather() {
    let weatherLocationInput = document.getElementById("weatherLocationInput");
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherLocationInput.value}&units=metric&APPID=${API_KEY}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const main = document.getElementById("main");
            main.innerHTML = `
                <h1>${data.name}</h1>
                <br>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                <br>
                <div>
                <p class="temperature">${Number(data.main.temp).toFixed()}</p>
                <p class="toggle-btn" onclick="toggleTemp(event)">°C</p>
                </div>
                <p class="main-weather-description">${data.weather[0].main}</p>
                <p class="feels-like">Feels like: ${Number(data.main.feels_like).toFixed()} °C</p>
                <p class="humidity">Humidity ${data.main.humidity} %</p>
                <p class="air-pressure">Air pressure ${data.main.pressure} hPa</p>
                <p class="wind">Wind ${data.wind.speed} m/s</p>
                <p class="clouds">Clouds: ${data.clouds.all} %</p>
                <p class="visibility">Visibility: ${data.visibility} m</p>
                <br>
                <p class="general-description">Weather in ${data.name}: ${data.weather[0].description}.</p>
            `;
        })
        .catch(function (error) {
            console.log(error);
        })
}

weatherLocationBtn.addEventListener("click", searchWeather, false)
document.body.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        searchWeather();
    }
}, false)