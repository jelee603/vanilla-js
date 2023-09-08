import { renderList, saveStartTime, deleteStartTime } from './list.js';

document.cookie = 'crossCookie=bar; SameSite=None; Secure';

const message = document.getElementById('message');
const text = document.getElementById('text');
const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const main = document.getElementById('main');

const isMobile = window.navigator.userAgent.includes('Mobile');
const floating = document.getElementById('floating');
if (isMobile) {
  floating.style.bottom = 0;
} else {
  floating.style.top = 0;
}
main.classList.add(isMobile ? 'main-wide' : 'main');
const handleScroll = (e) => {
  const top = window.scrollY;
  if (isMobile) {
    floating.style.bottom = 0;
  } else {
    floating.style.top = `${top}px`;
  }
};
document.addEventListener('scroll', handleScroll);

const MINUTE_TO_SEC = 60;
const HOUR_TO_SEC = 60 * MINUTE_TO_SEC;
const DEFAULT_TIME = 2 * HOUR_TO_SEC;
const QUOTE_INTERVAL_TIME = 7;

let restedTime = DEFAULT_TIME;

const padToZero = (number) => {
  if (number >= 10) {
    return number;
  } else {
    return `0${number}`;
  }
};

const parseTime = (seconds) => {
  const HH = parseInt(seconds / HOUR_TO_SEC);
  const MM = parseInt((seconds - HH * HOUR_TO_SEC) / MINUTE_TO_SEC);
  const SS = parseInt(seconds - HH * HOUR_TO_SEC - MM * MINUTE_TO_SEC);

  return `${HH}:${padToZero(MM)}:${padToZero(SS)}`;
};

const renderTimer = (seconds) => {
  text.innerHTML = parseTime(seconds);
};

const toggleButton = (isActive) => {
  if (isActive) {
    start.setAttribute('hidden', true);
    cancel.removeAttribute('hidden');
  } else {
    start.removeAttribute('hidden');
    cancel.setAttribute('hidden', true);
  }
};

const myWorker = new Worker('worker.js');
const startTimer = () => {
  myWorker.postMessage('start');
  myWorker.onmessage = () => {
    if (restedTime <= 0) {
      cancel.setAttribute('hidden', true);
      return;
    }

    restedTime--;
    renderTimer(restedTime);
  };
};

const cancelTimer = () => {
  restedTime = DEFAULT_TIME;
  myWorker.postMessage('stop');
  renderTimer(restedTime);
};

const showMessage = (json) => {
  function* generator() {
    const { data } = json;
    for (let quote of data) {
      yield quote;
    }
  }

  function renderQuote() {
    const { value, done } = iterable.next();
    if (done === true) {
      iterable = generator();
    } else {
      message.innerHTML = value;
    }
  }

  let iterable = generator();
  renderQuote();
  setInterval(renderQuote, QUOTE_INTERVAL_TIME * 1000);
};

// initialize
renderTimer(restedTime);
renderList();

start.addEventListener('click', () => {
  toggleButton(true);
  startTimer();
  saveStartTime();
  renderList();
});
cancel.addEventListener('click', () => {
  toggleButton(false);
  cancelTimer();
  deleteStartTime();
  renderList();
});

fetch('./mock.json')
  .then((response) => response.json())
  .then(showMessage);

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlide(n) {
  showSlides((slideIndex += n));
}

const prev = document.getElementById('prev');
prev.addEventListener('click', () => plusSlide(-1));

const next = document.getElementById('next');
next.addEventListener('click', () => plusSlide(1));

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

const dot = document.getElementsByClassName('dot');

for (let i = 0; i < dot.length; i++) {
  dot[i].addEventListener('click', () => currentSlide(i + 1));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName('mySlides');
  let dots = document.getElementsByClassName('dot');
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}
