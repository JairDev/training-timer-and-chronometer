// //@ts-check
// //buttons mode chrono or fitnnes timer
// const buttonChrono = document.querySelector(".button_chrono");
// const buttonCount = document.querySelector(".button_count");
// // buttons init time working out or rest time
// const buttonTimeDown = document.querySelectorAll(".button_time.down");
// const buttonTimeRest = document.querySelectorAll(".button_time.rest");
// //buttons "go" enter minutes form input
// const readyChrono = document.querySelector(".button_ready.chrono");
// const readyRest = document.querySelector(".button_ready.rest");

// const valueRest = document.querySelector(".input-rest");
// const valueDown = document.querySelector(".input-down");

// const buttonStop = document.querySelector(".stop");
// const buttonRestart = document.querySelector(".restart");
// const buttonReset = document.querySelector(".reset");

// const displayTextMode = document.querySelector(".mode-text");
// const displayTimeChrono = document.querySelector(".display_number_chrono");
// const displayTimeCount = document.querySelector(".display_number_count");
// const displayTimeRest = document.querySelector(".display_number_rest");
// const displayParentButtChrono = document.querySelector(".parent_stop_start");
// const displaySeries = document.querySelector(".series");



// const parentChrono = document.querySelector(".parent_controls.chrono");
// const parentRest = document.querySelector(".parent_controls.rest");

//mode chrono
// const buttChro = function() {
//   let display = "Chronometer";
//   displayTextMode.textContent = display;
//   buttonReset.style.cursor = "pointer";
//   displayParentButtChrono.classList.remove('inactive');
//   displaySeries.classList.remove('active');
//   displayTimeChrono.classList.remove('inactive');
//   displayTimeCount.classList.add('inactive');
//   if (display) {
//     // console.log("button enabled");
//     buttonReset.disabled = false;
//   }
//   displayTimerChrono(0)
//   // delete countdown & restCountDown
//   if (countdown || restCountDown) {
//     clearInterval(countdown);
//     clearInterval(restCountDown);
//     countdownTime(0);
//     countdownRest(0);
//   }
//   //remove laterals panel countdown time, rest time & display rest number
//   parentChrono.classList.remove("active");
//   parentRest.classList.remove("active");
//   displayTimeRest.classList.remove("active");
//   console.log('butt chrono')
// };

// // //mode countdown
// const buttCount = function() {
//   let display = "Fitnnes timer";
//   displayTextMode.textContent = display;
//   displayParentButtChrono.classList.add('inactive');
//   displaySeries.classList.add('active');
//   displayTimeChrono.classList.add('inactive');
//   displayTimeCount.classList.remove('inactive');
//   if (display) {
//     // console.log("button disabled");
//     buttonReset.disabled = true;
//     buttonReset.style.cursor = "not-allowed";
//   }
//   //delete count chronometer

//   chronometer(0);
//   clearInterval(countForward);
//   displayCountDown(0);
//   //display laterals panel countdown time, rest time & display rest number
//   parentChrono.classList.add("active");
//   parentRest.classList.add("active");
//   displayTimeRest.classList.add("active");
// };

//slider buttons
let timeRest = 0; //countdownrest log
let startCountdown;
const slider = function() {
  // let startCountdown;
  if (this.matches(".rest") && this.matches(".active")) {
    this.classList.remove("active"); //remove class style
  } else if (this.matches(".down") && this.matches(".active")) {
    this.classList.remove("active");
  } else if (this.matches(".down")) {
    this.classList.add("active"); //add class style
    startCountdown = parseInt(this.dataset.time);
    countdownTime(startCountdown); //start countdown
    // console.log(startCountdown);
    setTimeout(() => {
      console.log("rest time " + timeRest);
      countdownRest(timeRest); //start countdownRest after ending countdown
    }, startCountdown * 1000);
  } else {
    this.classList.add("active");
    timeRest = parseInt(this.dataset.time);
    console.log("let timerest " + timeRest);
    displayCountRest(timeRest);
  }
};

//chronometer count
let countForward;
let secondsForward;
const chronometer = function(seconds) {
  let date = Date.now();
  let now = date - seconds * 1000;

  clearInterval(countForward); //clears some running time
  countForward = setInterval(() => {
    secondsForward = Math.round((Date.now() - now) / 1000);
    displayTimerChrono(secondsForward);
  }, 1000);

  buttonStop.addEventListener("click", function() {
    //stop the chronometer time
    let secondsStop = secondsForward;
    if (secondsStop > seconds) {
      clearInterval(countForward);
    }
  });

  buttonRestart.addEventListener("click", function() {
    //restart the chronometer time
    let secondsRestart = secondsForward;
    if (secondsRestart > seconds) {
      chronometer(secondsRestart);
    }
  });
};

//display chronometer
const displayTimerChrono = function(seconds) {
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let forwardSeconds = seconds % 60;
  let forwardMinutes = minutes % 60;
  let forwardHours = hours % 60;
  let display = `${forwardHours < 10 ? "0" : ""}${forwardHours}:${
    forwardMinutes < 10 ? "0" : ""
  }${forwardMinutes}:${forwardSeconds < 10 ? "0" : ""}${forwardSeconds}`;
  displayTimeChrono.textContent = display;
};

// start chronometer
const startChrono = function() {
  let start = parseInt(this.dataset.time);
  chronometer(start); //start chronometer
  console.log("start chrono");
};

//countdownTime
let countdown;
let seriesCount = 1;
const countdownTime = function(seconds) {
  let date = Date.now();
  let now = date + seconds * 1000;
  displayCountDown(seconds);
  clearInterval(countdown); //clears some running time
  countdown = setInterval(() => {
    let secondsLeft = Math.round((now - Date.now()) / 1000);
    // if (secondsLeft < 0) {
    //   clearInterval(countdown);
    //   return;
    // } else if (secondsLeft === 0) {
    //   buttonTimeDown.forEach(function(butt) {
    //     butt.classList.remove("active");
    //   });
    // }
    if(secondsLeft <= 0) {
      const series = (dsf) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('serie number: ' + seriesCount);
            seriesCount++;
            if(seriesCount < 4) {
              resolve(countdownTime(10));
            }else {
              reject('Finished series')
              clearInterval(countdown)
            }
          }, 0);
        })
      }
      series()
      .then(resolveValue => {
        console.log(resolveValue)
      })
      .catch(rejectValue => {
        console.log(rejectValue)
      })
    }
    // console.log("function down " + secondsLeft);
    displayCountDown(secondsLeft);
  }, 1000);
  
};

//display countdown
const displayCountDown = function(seconds) {
  let minutes = Math.floor(seconds / 60);
  // let hours = Math.floor(minutes / 60);
  let secondsRemaining = seconds % 60;
  let minutesRemaining = minutes % 60;
  // let hoursRemaining = hours % 60;
  let display = `${
    minutesRemaining < 10 ? "0" : ""
  }${minutesRemaining}:${secondsRemaining < 10 ? "0" : ""}${secondsRemaining}`;
  displayTimeCount.textContent = display;
};

//countdownRest
let restCountDown;
const countdownRest = function(seconds) {
  displayCountRest(seconds);
  let date = Date.now();
  let now = date + seconds * 1000;
  displayCountRest(seconds);
  clearInterval(restCountDown); //clears some running time
  restCountDown = setInterval(() => {
    let secondsLeft = Math.round((now - Date.now()) / 1000);
    // if (secondsLeft < 0) {
    //   clearInterval(restCountDown);
      
    //   return;
    // };
    // let seriesCount = 0;
      if (secondsLeft < 0) {
        clearInterval(restCountDown);
        return;
      };
      
    
    console.log("function rest " + secondsLeft);
    displayCountRest(secondsLeft);
  }, 1000);
};

//display countdownRest
const displayCountRest = function(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secondsRemaining = seconds % 60;
  let display = `${minutes}:${
    secondsRemaining < 10 ? "0" : ""
  }${secondsRemaining}`;
  displayTimeRest.textContent = display;
};

//button ready chrono
function goCountDown(e) {
  let time = valueDown.value;
  countdownTime(time * 60);
  console.log(time);
  // setTimeout(() => {

  //   countdownRest(timeRest);
  // }, startCountdown * 1000);
}

// button ready rest
function goRest(e) {
  timeRest = valueRest.value * 60;
  displayCountRest(timeRest);
  console.log(timeRest);
}

buttonChrono.addEventListener("click", buttChro);
buttonCount.addEventListener("click", buttCount);

buttonTimeRest.forEach(button => button.addEventListener("click", slider));
buttonTimeDown.forEach(button => button.addEventListener("click", slider));

readyChrono.addEventListener("click", goCountDown);
readyRest.addEventListener("click", goRest);

buttonReset.addEventListener("click", startChrono);
