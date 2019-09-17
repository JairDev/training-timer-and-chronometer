import { displayNumberTime, items, displayNumSeries } from "./ui.js";
// class containing countdown methods of workout time, rest time and chronometer;

export class Timers {
  constructor(countdown, countForward) {
    this.countdown = countdown;
    this.countForward = countForward;
  }

  chronometer(seconds) {
    this.seconds = seconds;
    this.date = Date.now();
    this.now = this.date - this.seconds * 1000;

    clearInterval(this.countForward); //delete running time
    this.countForward = setInterval(() => {
      this.secondsForward = Math.round((Date.now() - this.now) / 1000);
      let displayNumberChro = displayNumberTime(this.secondsForward);
      displayNumberChro.displayTimerChrono();
    }, 1000);

    items.buttonStop.addEventListener("click", () => {
      //stop the chronometer time
      this.secondsStop = this.secondsForward;
      if (this.secondsStop > seconds) {
        clearInterval(this.countForward);
      }
    });

    items.buttonRestart.addEventListener("click", () => {
      //restart the chronometer time
      this.secondsRestart = this.secondsForward;
      if (this.secondsRestart > seconds) {
        this.chronometer(this.secondsRestart);
      }
    });
  }

  countdownWork(seconds, count, series, wait) {
    this.seconds = seconds;
    this.count = count;
    this.series = series;
    this.wait = wait;
    this.date = Date.now();
    this.now = this.date + this.seconds * 1000;

    let displayNumberWork = displayNumberTime(this.seconds);
    displayNumberWork.displayCountWork();

    this.countdown = setInterval(() => {
      this.secondsLeft = Math.round((this.now - Date.now()) / 1000);
      if (this.secondsLeft < 0 && count < series) {
        //if series, repeat cycle //
        displayNumSeries(count);
        items.sound.play();
        setTimeout(() => {
          count++;
          this.countdownWork(seconds, count, series, wait);
        }, wait);
        clearInterval(this.countdown);
        return;
      } else if (this.secondsLeft < 0 && count <= series) {
        //finish cycle//
        items.buttonTimeFitness.forEach(butt => {
          butt.classList.remove("active");
        });
        items.sound.play();
        displayNumSeries(count);
        clearInterval(this.countdown);
        return;
      } else if (this.secondsLeft < 0 && !series) {
        // not cycle //
        items.buttonTimeFitness.forEach(butt => {
          butt.classList.remove("active");
        });
        items.sound.play();
        clearInterval(this.countdown);
        return;
      }
      displayNumberWork = displayNumberTime(this.secondsLeft);
      displayNumberWork.displayCountWork();
    }, 1000);
  }

  countdownRest(seconds, countrest, seriesrest, waitrest) {
    this.seconds = seconds;
    this.countrest = countrest;
    this.seriesrest = seriesrest;
    this.waitrest = waitrest;
    this.date = Date.now();
    this.now = this.date + this.seconds * 1000;

    let displayNumberRest = displayNumberTime(this.seconds);
    displayNumberRest.displayCountRest();

    this.countdown = setInterval(() => {
      this.secondsLeft = Math.round((this.now - Date.now()) / 1000);
      if (this.secondsLeft < 0 && countrest < seriesrest) {
        //if series, repeat cycle //
        setTimeout(() => {
          countrest++;
          this.countdownRest(seconds, countrest, seriesrest, waitrest);
        }, waitrest);

        clearInterval(this.countdown);
        return;
      } else if (this.secondsLeft < 0 && countrest <= seriesrest) {
        //finish cycle//
        items.buttonTimeCountDownRest.forEach(butt => {
          butt.classList.remove("active");
        });
        clearInterval(this.countdown);
        return;
      } else if (this.secondsLeft < 0 && !seriesrest) {
        // not cycle //
        items.buttonTimeCountDownRest.forEach(butt => {
          butt.classList.remove("active");
        });
        clearInterval(this.countdown);
        return;
      }

      displayNumberRest = displayNumberTime(this.secondsLeft);
      displayNumberRest.displayCountRest();
    }, 1000);
  }
}
