let buttons = document.querySelector('.js-buttons');
let display = document.querySelector('.timer-display');
let running = false;
let interval;

create();

function create(){
  buttons.innerHTML = `
    <button class="start-button js-start-button">
      Start
    </button>
  `;

  document.querySelector('.js-start-button')
    .addEventListener('click',start);
}

let hours = 0,minutes = 0,seconds = 0,milliseconds = 0;

function start(){
  buttons.innerHTML =`
    <button class="lap-button js-lap-button">
      Lap
    </button>
    <button class="pause-button js-pause-button">
      Pause
    </button>
  `;
  running = true;
  interval = setInterval(run,10);

  document.querySelector('.js-pause-button')
    .addEventListener('click',()=>{
      clearInterval(interval);
      running = false;
      buttons.innerHTML =`
        <button class="pause-button js-reset-button">
          Reset
        </button>
        <button class="start-button js-resume-button">
          Resume
        </button>
      `;

      document.querySelector('.js-resume-button')
        .addEventListener('click',start);
    
      document.querySelector('.js-reset-button')
        .addEventListener('click',reset);
  });
}

function reset(){
  hours = 0,minutes = 0,seconds = 0,milliseconds = 0;
  display.innerHTML = "00 : 00 : 00 : 000";
  create();
}

function run(){
  if(running === true){
    milliseconds += 10;
    if(milliseconds === 1000) {
      milliseconds = 0;
      seconds++;
      if(seconds === 60) {
        seconds = 0;
        minutes++;
        if(minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 
              ? "00" + milliseconds
              : milliseconds < 100
                  ? "0" + milliseconds
                  : milliseconds;

    display.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
  }
}