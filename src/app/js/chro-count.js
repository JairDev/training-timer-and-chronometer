import { timeDisplay, items, displayNumSeries } from "./ui.js";

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

    items.displayTimeCount.style.color = "yellow";
    items.actionTextDisplay.textContent = "Prepare";
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

    this.intervalWork = setInterval(() => {
      this.secondsLeftWork = Math.round((this.now - Date.now()) / 1000);
      if (this.secondsLeftWork < 0) {
        this.currentCycle += 1;
        
        displayNumSeries(this.currentCycle);
        clearInterval(this.intervalWork);
        this.countdownRest(this.secondsRest);
        return;
      } else if (this.currentCycle === this.cycleSet) {
        clearInterval(this.intervalWork);
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
    items.displayTimeCount.style.color = "rgb(238, 66, 102)";
    items.actionTextDisplay.textContent = "Rest";

    this.intervalRest = setInterval(() => {
      this.secondsLeftRest = Math.round((this.now - Date.now()) / 1000);
   
      if (this.secondsLeftRest < 0) {
        clearInterval(this.intervalRest);
        this.countdownWork(this.secondsWork);
        return;
      } else if (this.currentCycle === this.cycleSet) {
        displayRest = timeDisplay(0);
        displayRest.displayTime();
        clearInterval(this.intervalRest);
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
    this.running = false;
  }
}

export class Chronometer {
  constructor() {
    this.run = false;
    this.intervalChrono;
    this.secondsChrono = 0;
    this.secondsForward = 0;
    this.pause = true;
  }

  chrono() {
    this.date = Date.now();
    this.now = this.date - this.secondsChrono * 1000;
    this.intervalChrono = setInterval(() => {
      this.secondsForward = Math.round((Date.now() - this.now) / 1000);
      console.log(this.secondsForward);
    }, 1000);
  }

  startChrono() {
    if (!this.run) {
      this.run = true;
      this.chrono();
    }
    console.log(this.run);
  }

  stopChrono() {
    if (this.run) {
      console.log("method stop");
      for (let i = 0; i < 100; i++) {
        clearInterval(i);
      }
    }
  }
}
