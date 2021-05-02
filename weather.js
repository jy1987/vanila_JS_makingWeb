const weather = document.querySelector(".js-weather");

const API_KEY = "579edd8563fa9cdb9b905112ec3cf1ff";
const COORDS = "coords";

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
      weather.innerText = `현재온도 : ${temperature}도 & 현재위치 :${place}`;
    });
}

function saveCoords(coordObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordObj));
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
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsecoords = JSON.parse(loadedCoords);
    getWeather(parsecoords.latitude, parsecoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
