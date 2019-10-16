class Timers {
  constructor(seconds) {
    this.seconds = seconds;
    this.running = false;
    this.t;
  }
  countdownWork() {
    this.seconds -= 1;
    if (this.seconds < 0) {
      clearInterval(this.countdown);
      return;
    } 
    console.log(this.seconds)
  }

  start() {
    this.running = true;
    this.t = setInterval(this.countdownWork.bind(this), 1000)
  }
}

class Values extends Timers {
  constructor(seconds) {
    super(seconds)
    this.valueWork = 5;
    this.valueRest = 5;
  }
}
const value = new Values();

