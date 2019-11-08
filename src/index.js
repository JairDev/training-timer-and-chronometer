import "./sass/style.scss";
import "./static/2227543.png";
import "./static/on-off.png";
import "./static/reloj.png";
import "./static/reloj.png";
import "./sound/BELL1.mp3";

import { Timers, startChrono, reset } from "./app/js/chro-count.js";

import {
  items,
  fitnessButton,
  chronoButton,
  timeDisplay
} from "./app/js/ui.js";

let modeChrono = false;
let modeFitness = false;
let timeLogFitness;
let timeLogRest;
let cycleFit;

function viewDefault() {
  modeFitness = true;
  fitnessButton();
  items.buttonFitness.style.borderBottom = "2px solid rgb(60, 187, 177)";
}
document.addEventListener("DOMContentLoaded", viewDefault);

//events
items.formSeries.addEventListener("submit", e => {
  cycleFit = parseInt(items.valueInputSeries.value);
  items.displayNumberSeries.textContent = `Cycles: ${cycleFit}`;
  items.formSeries.reset();
  e.preventDefault();
});

document.addEventListener("click", e => {
  items.buttonTimeFitness.forEach(butt => {
    if (e.target === butt && butt.matches(".down") && butt.matches(".active")) {
      butt.classList.remove("active");
    } else if (e.target === butt && butt.matches(".down")) {
      butt.classList.add("active");
      timeLogFitness = butt.dataset.time;
      let timeWork = new Timers(timeLogFitness, timeLogRest, cycleFit);
    }
  });

  items.buttonTimeCountDownRest.forEach(butt => {
    if (e.target === butt && butt.matches(".rest") && butt.matches(".active")) {
      butt.classList.remove("active");
    } else if (e.target === butt && butt.matches(".rest")) {
      butt.classList.add("active");
      timeLogRest = butt.dataset.time;
      let timeRest = new Timers(timeLogFitness, timeLogRest, cycleFit);
    }
  });

  if (e.target === items.buttonFitness) {
    modeFitness = true;
    fitnessButton();
    let displayNumberChro = timeDisplay(0);
    displayNumberChro.chronoDisplayTime();
    items.buttonFitness.style.borderBottom = "2px solid rgb(60, 187, 177)";
    items.buttonChrono.style.borderBottom = "none";
    modeChrono = false;
  }

  if (e.target === items.buttonChrono) {
    modeChrono = true;
    chronoButton();
    items.buttonChrono.style.borderBottom = "2px solid rgb(60, 187, 177)";
    items.buttonFitness.style.borderBottom = "none";
    modeFitness = false;
  }

  if (e.target === items.buttonStart) {
    if (modeChrono) {
      startChrono();
    } else if (modeFitness) {
      let ready = new Timers(timeLogFitness, timeLogRest, cycleFit);
      ready.startFit();
    }
  }
  if (e.target === items.buttonReset) {
    if (modeChrono) {
      reset();
    } else if (modeFitness) {
      let stopFit = new Timers(timeLogFitness, timeLogRest, cycleFit);
      stopFit.stop();
    }
  }
});

items.formTimeFitness.addEventListener("submit", e => {
  let value = items.valueInputFitness.value;
  timeLogFitness = value * 60;
  items.displayTimeInputFit.textContent = `${value}m`
  items.formTimeFitness.reset();
  e.preventDefault();
});

items.formCountDownRest.addEventListener("submit", e => {
  let value = items.valueInputCountDownRest.value;
  timeLogRest = value * 60;
  items.displayTimeInputRest.textContent = `${value}m`
  items.formCountDownRest.reset();
  e.preventDefault();
});
