const body = document.querySelector("body");
const IMAGE_NUMBER = 7;

function getRandNumber(a) {
  const e = Math.random(a);
  const rand = Math.ceil(Math.random(e) * IMAGE_NUMBER);
  return rand;
}
let initNumber = 1;

function makeImg() {
  const id = 2;
  const img = new Image();
  if (id <= IMAGE_NUMBER) {
    img.src = `images/${id}.jpg`;
    img.classList.add("bgImage");
    body.prepend(img);
  }
  initNumber += 1;
  console.log(id);
}

function paintImage(a) {
  const random = getRandNumber(a);
  const img = new Image();
  img.src = `images/${random}.jpg`;
  img.classList.add("bgImage");
  body.prepend(img);
}

function init() {
  /* setInterval(getRandNumber, 1000);*/
  makeImg();
}

init();
