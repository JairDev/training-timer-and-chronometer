export const items = {
  sound: document.querySelector(".audio"),

  buttonChrono: document.querySelector(".button_chrono"),
  buttonFitness: document.querySelector(".button_count"),

  buttonTimeFitness: document.querySelectorAll(".button_slide.down"),
  buttonTimeCountDownRest: document.querySelectorAll(".button_slide.rest"),

  readyTimeFitness: document.querySelector(".button_ready.chrono"),
  readyCountDownRest: document.querySelector(".button_ready.rest"),

  formSeries: document.querySelector(".form_series"),
  valueInputSeries: document.querySelector(".input_series"),
  displayNumberSeries: document.querySelector(".display_series"),
  numberSeries: document.querySelector(".number_series"),

  formTimeFitness: document.querySelector("#form-time-down"),
  formCountDownRest: document.querySelector("#form-time-rest"),
  valueInputFitness: document.querySelector(".input-down"),
  valueInputCountDownRest: document.querySelector(".input-rest"),

  buttonStart: document.querySelector(".start"),
  buttonReset: document.querySelector(".reset"),

  displayTextMode: document.querySelector(".mode-text"),
  displayTimeChrono: document.querySelector(".display_number_chrono"),
  displayTimeCount: document.querySelector(".display_number_count"),
  actionTextDisplay: document.querySelector(".action_text_display"),
  displayParentButtChrono: document.querySelector(".parent_stop_start"),
  displaySeries: document.querySelector(".series"),

  parentFitnessPanel: document.querySelector(".parent_controls.panel-fit"),
  parentFitnessRestPanel: document.querySelector(".parent_controls.panel-rest")
};

export const displayNumSeries = num => {
  let display = `Cycles: ${num}`;
  items.displayNumberSeries.textContent = display;
};

//display items if click on button fitness timer
export const fitnessButton = () => {
  const display = items.buttonFitness.dataset.text;
  items.displayTextMode.textContent = display;
  items.displaySeries.classList.add("active");
  items.displayTimeChrono.classList.add("inactive");
  items.displayTimeCount.classList.remove("inactive");
  // items.displayParentButtChrono.classList.add("inactive");

  items.parentFitnessPanel.classList.add("active");
  items.parentFitnessRestPanel.classList.add("active");
};

//display items if click on button chrono
export const chronoButton = () => {
  const display = items.buttonChrono.dataset.text;
  items.displayTextMode.textContent = display;
  items.displaySeries.classList.remove("active");
  items.displayTimeChrono.classList.remove("inactive");
  items.displayTimeCount.classList.add("inactive");
  // items.displayParentButtChrono.classList.remove("inactive");
  items.parentFitnessPanel.classList.remove("active");
  items.parentFitnessRestPanel.classList.remove("active");
};

export const timeDisplay = function(
  seconds,
  minutes,
  hours,
  secondsRemaining,
  minutesRemaining,
  forwardSeconds,
  forwardMinutes,
  forwardHours,
  display
) {
  return {
    seconds,
    minutes,
    hours,
    secondsRemaining,
    minutesRemaining,
    forwardSeconds,
    forwardMinutes,
    forwardHours,
    display,

    displayTime() {
      this.minutes = Math.floor(this.seconds / 60);
      this.minutesRemaining = this.minutes % 60;
      this.secondsRemaining = this.seconds % 60;
      this.display = `${this.minutesRemaining < 10 ? "0" : ""}${
        this.minutesRemaining
      }:${this.secondsRemaining < 10 ? "0" : ""}${this.secondsRemaining}`;
      items.displayTimeCount.textContent = this.display;
      items.displayTimeCount.style.color = "rgb(60, 187, 177)";
    },

    chronoDisplayTime() {
      this.minutes = Math.floor(this.seconds / 60);
      this.hours = Math.floor(this.minutes / 60);
      this.forwardSeconds = this.seconds % 60;
      this.forwardMinutes = this.minutes % 60;
      this.forwardHours = this.hours % 60;
      this.display = `${this.forwardHours < 10 ? "0" : ""}${
        this.forwardHours
      }:${this.forwardMinutes < 10 ? "0" : ""}${this.forwardMinutes}:${
        this.forwardSeconds < 10 ? "0" : ""
      }${this.forwardSeconds}`;
      items.displayTimeChrono.textContent = this.display;
    }
  };
};
