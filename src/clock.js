const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h2");
const welcome = clockContainer.querySelector("h1");
const plans = document.querySelector(".js-toDoForm");
const whatPlans = plans.querySelector("h2");

function getTime() {
  const date = new Date();
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  if (seconds % 2 === 0) {
    clockTitle.style.color = "pink";
    welcome.style.color = "white";
    whatPlans.style.color = "white";
  } else {
    clockTitle.style.color = "white";
    welcome.style.color = "pink";
    whatPlans.style.color = "pink";
  }

  clockTitle.innerText = ` ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  setInterval(getTime, 1000);
  getTime();
}

init();
