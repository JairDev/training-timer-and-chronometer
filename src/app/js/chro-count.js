import { timeDisplay, items, displayNumSeries } from "./ui.js";

let secondsChrono = 0;
let intervalChrono;
let pause = true;
export class Timers {
  constructor(secondsWork, secondsRest, cycleSet = 1, prepare = 5) {
    this.running = false;
    this.intervalPrepare;
    this.intervalWork;
    this.intervalRest;
    this.secondsWork = secondsWork;
    this.secondsRest = secondsRest;
    this.currentCycle = 0;
    this.cycleSet = cycleSet;
    this.prepare = prepare;
  }

  prepareCount() {
    let displayPrepare = timeDisplay(this.prepare);
    displayPrepare.displayTime();

    items.displayTimeCount.style.color = "rgb(255, 252, 89)";
    items.actionTextDisplay.textContent = "Prepare";
    items.actionTextDisplay.style.color = "rgb(255, 252, 89)";
    items.actionTextDisplay.classList.add("active");

    this.prepare -= 1;
    if (this.prepare < 0) {
      clearInterval(this.intervalPrepare);
      this.countdownWork();
      return;
    }
  }

  countdownWork() {
    this.date = Date.now();
    this.now = this.date + this.secondsWork * 1000;

    let displayNumberWork = timeDisplay(this.secondsWork);
    displayNumberWork.displayTime();
    items.actionTextDisplay.textContent = "Training";
    items.actionTextDisplay.style.color = "rgb(60, 187, 177)";

    this.intervalWork = setInterval(() => {
      this.secondsLeftWork = Math.round((this.now - Date.now()) / 1000);
      if (this.secondsLeftWork < 0 && !this.secondsRest) {
        clearInterval(this.intervalWork);
        items.actionTextDisplay.classList.remove("active");
        items.buttonTimeFitness.forEach(butt => {
          butt.classList.remove("active");
        });
        items.sound.play();
        return;
      } else if (this.currentCycle === this.cycleSet) {
        clearInterval(this.intervalWork);
      } else if (this.secondsLeftWork < 0 && this.secondsRest) {
        this.currentCycle += 1;
        displayNumSeries(this.currentCycle);
        clearInterval(this.intervalWork);
        this.countdownRest(this.secondsRest);
        items.buttonTimeFitness.forEach(butt => {
          butt.classList.remove("active");
        });
        items.sound.play();
        return;
      }

      displayNumberWork = timeDisplay(this.secondsLeftWork);
      displayNumberWork.displayTime();
    }, 1000);
  }

  countdownRest() {
    this.date = Date.now();
    this.now = this.date + this.secondsRest * 1000;

    let displayRest = timeDisplay(this.secondsRest);
    displayRest.displayTime();
    items.actionTextDisplay.textContent = "Rest";
    items.displayTimeCount.style.color = "rgb(238, 66, 102)";
    items.actionTextDisplay.style.color = "rgb(238, 66, 102)";

    this.intervalRest = setInterval(() => {
      this.secondsLeftRest = Math.round((this.now - Date.now()) / 1000);

      if (this.secondsLeftRest < 0) {
        clearInterval(this.intervalRest);
        this.countdownWork(this.secondsWork);
        items.buttonTimeCountDownRest.forEach(butt => {
          butt.classList.remove("active");
        });
        return;
      } else if (this.currentCycle === this.cycleSet) {
        displayRest = timeDisplay(0);
        displayRest.displayTime();
        clearInterval(this.intervalRest);
        items.actionTextDisplay.classList.remove("active");
        return;
      }
      displayRest = timeDisplay(this.secondsLeftRest);
      displayRest.displayTime();
      items.displayTimeCount.style.color = "rgb(238, 66, 102)";
    }, 1000);
  }

  startFit() {
    if (!this.running && this.secondsWork) {
      clearInterval(this.intervalPrepare);
      this.running = true;
      this.intervalPrepare = setInterval(this.prepareCount.bind(this), 1000);
    }
  }
  stop() {
    for (let i = 0; i < 100; i++) {
      clearInterval(i);
    }
    this.prepare = 0;
    this.running = false;
    let displayPrepare = timeDisplay(this.prepare);
    displayPrepare.displayTime();
    items.actionTextDisplay.classList.remove("active");
  }
}

const chronometer = function() {
  secondsChrono += 1;
  let chronoDisplay = timeDisplay(secondsChrono);
  chronoDisplay.chronoDisplayTime();
};

export const startChrono = function() {
  clearInterval(intervalChrono);
  pause = !pause;
  if (!pause) {
    intervalChrono = setInterval(chronometer, 1000);
  }
};

export const reset = function() {
  console.log("reset");
  secondsChrono = 0;
  pause = true;
  let chronoDisplay = timeDisplay(secondsChrono);
  chronoDisplay.chronoDisplayTime();
  
};
