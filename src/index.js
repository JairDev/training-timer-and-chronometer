import "./sass/style.scss";
import "./static/2227543.png";
import "./static/on-off.png";
import "./static/reloj.png";
import "./static/reloj.png";
import "./static/archer2.jpg";
import "./sound/BELL1.mp3";

import { Timers } from "./app/js/chro-count.js";

import { displayNumberTime } from "./app/js/ui.js";

import { items, fitnessButton, chronoButton } from "./app/js/ui.js";

let timeLogFitness;
let timeLogRest;
let seriesFit;
let seriesRest;

const timeWork = new Timers();
const timeRest = new Timers();
const chrono = new Timers();

function viewDefault() {
  chronoButton();
  items.buttonChrono.style.borderBottom = "2px solid rgb(60, 187, 177)";
}
document.addEventListener("DOMContentLoaded", viewDefault);

//events
items.formSeries.addEventListener("submit", e => {
  seriesFit = items.valueInputSeries.value;
  seriesRest = seriesFit;
  console.log(seriesFit);
  items.displayNumberSeries.textContent = `Cycles: ${seriesFit}`;
  items.formSeries.reset();
  e.preventDefault();
});

document.addEventListener("click", e => {
  items.buttonTimeFitness.forEach(butt => {
    if (e.target === butt && butt.matches(".down") && butt.matches(".active")) {
      butt.classList.remove("active");
    } else if (e.target === butt && butt.matches(".down")) {
      butt.classList.add("active");
      clearInterval(timeWork.countdown);
      timeLogFitness = butt.dataset.time;
      timeWork.countdownWork(timeLogFitness, 1, seriesFit, timeLogRest * 1000);
      if (timeLogRest) {
        setTimeout(() => {
          timeRest.countdownRest(timeLogRest, 1, seriesRest - 1, timeLogFitness * 1000);
        }, timeLogFitness * 1000);
      }
    }
  });

  items.buttonTimeCountDownRest.forEach(butt => {
    if (e.target === butt && butt.matches(".rest") && butt.matches(".active")) {
      butt.classList.remove("active");
    } else if (e.target === butt && butt.matches(".rest")) {
      butt.classList.add("active");
      clearInterval(timeRest.countdown);
      timeLogRest = butt.dataset.time;
      let displayTimeRest = displayNumberTime(timeLogRest);
      displayTimeRest.displayCountRest();
    }
  });

  if (e.target === items.buttonFitness) {
    fitnessButton();
    clearInterval(chrono.countForward);
    let displayNumberChro = displayNumberTime(0);
    displayNumberChro.displayTimerChrono();
    items.buttonFitness.style.borderBottom = "2px solid rgb(60, 187, 177)";
    items.buttonChrono.style.borderBottom = "none";
  }

  if (e.target === items.buttonChrono) {
    chronoButton();
    clearInterval(timeWork.countdown);
    clearInterval(timeRest.countdown);
    
    items.buttonChrono.style.borderBottom = "2px solid rgb(60, 187, 177)";
    items.buttonFitness.style.borderBottom = "none";
  }

  if (e.target === items.buttonReset) {
    chrono.chronometer(items.buttonReset.dataset.time);
    
   
  }
});

items.formTimeFitness.addEventListener("submit", e => {
  let value = items.valueInputFitness.value;
  timeWork.countdownWork(value * 60);
 
  items.formTimeFitness.reset();
  e.preventDefault();
});

items.formCountDownRest.addEventListener("submit", e => {
  let value = items.valueInputCountDownRest.value;
  timeRest.countdownRest(value * 60);
  
  items.formCountDownRest.reset();
  e.preventDefault();
});


