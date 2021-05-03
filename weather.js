const weather = document.querySelector(".js-weather");
const currentWeather = document.querySelector(".js-weather__current");
const locationWeather = document.querySelector(".js-weather__location");

const API_KEY = "579edd8563fa9cdb9b905112ec3cf1ff";
const COORDS = "coords";
const selectedCity = "city";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      currentWeather.innerText = `현재온도 : ${temperature}도 & 현재위치 :${place}`;
    });
}
function getLocationWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const selectTemperature = json.main.temp;
      const selectPlace = json.name;
      locationWeather.innerText = `선택위치온도 : ${selectTemperature}도 & 선택위치 :${selectPlace}`;
    });
}

function saveCoords(coordObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordObj));
}

function saveCity() {
  const city = weather.value;
  localStorage.setItem(selectedCity, city);
  getLocationWeather(city);
}

function selectCity() {
  weather.addEventListener("change", saveCity);
}

function handleGeoSucces(position) {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude, longitude);
  const coordObj = { latitude, longitude };
  console.log(coordObj);
  saveCoords(coordObj);

  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("cant access geo location");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  const loadedCity = localStorage.getItem(selectedCity);
  if (loadedCoords === null || loadedCity === null) {
    askForCoords();
  } else {
    const parsecoords = JSON.parse(loadedCoords);
    const parseCity = loadedCity;
    getWeather(parsecoords.latitude, parsecoords.longitude);
    getLocationWeather(parseCity);
  }
}

function init() {
  loadCoords();
  selectCity();
}

init();
