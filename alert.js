//date
let now = new Date();
let date = document.querySelector(".date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

date.innerHTML = `${day} <br /> ${hours}:${minutes}`;

// API City/Weather

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let clickMeButton = document.querySelector("#search-form");
clickMeButton.addEventListener("submit", showCity);

function searchCity(city) {
  let apiKey = "4541f2db0002e46944bf1a3fd19b5071";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4541f2db0002e46944bf1a3fd19b5071&units=metric`;
  axios.get(apiURL).then(showTemp);
}

searchCity("London");

function showTemp(response) {
  console.log(response.data);

  document.querySelector(".cityName").innerHTML = response.data.name;

  let tempCelsius = response.data.main.temp;

  let temperatureelement = document.querySelector("#temperature");
  let temperature = Math.round(tempCelsius);
  temperatureelement.innerHTML = temperature;

  let descriptionelement = document.querySelector("#description");
  descriptionelement.innerHTML = response.data.weather[0].description;

  let humidityelement = document.querySelector("#humidity");
  humidityelement.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windelement = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windelement.innerHTML = `Wind: ${wind} m/sec`;

  let iconelement = document.querySelector("#icon");
  iconelement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  function showTemperature1(event) {
    event.preventDefault();
    let Fahrenheit = document.querySelector("#temperature");
    let fahrenheitTemperature = (tempCelsius * 9) / 5 + 32;
    Fahrenheit.innerHTML = Math.round(fahrenheitTemperature);
  }

  let tempFahrenheit = document.querySelector(".fahrenheit-link");
  tempFahrenheit.addEventListener("click", showTemperature1);

  function showTemperature2(event) {
    event.preventDefault();
    let Celsius = document.querySelector("#temperature");
    Celsius.innerHTML = Math.round(tempCelsius);
  }

  let tempteratureCelsius = document.querySelector(".celsius-link");
  tempteratureCelsius.addEventListener("click", showTemperature2);
}

//API Location
function showWeather(response) {
  console.log(response.data);
  event.preventDefault();
  let cityPosition = document.querySelector(".cityName");
  cityPosition.innerHTML = response.data.name;
  showTemp(response);
}

function retrievePosition(position) {
  let apiKey = "4541f2db0002e46944bf1a3fd19b5071";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentPosition);

//API in cards
