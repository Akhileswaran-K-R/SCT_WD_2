let buttons = document.querySelector('.js-buttons');
let display = document.querySelector('.timer-display');
let running = false;
let interval1,interval2;
let t = `
  <div class="lap-timings lap-header">
    <div>Lap</div>
    <div>Lap times</div>
    <div>Overall time</div>
  </div>
`;
let lapDisplay = document.querySelector('.js-lap-data');
let countLap = 0;

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
let laphours = 0,lapminutes = 0,lapseconds = 0,lapmilliseconds = 0;

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
  interval1 = setInterval(run,100);
  interval2 = setInterval(lapRun,100);

  document.querySelector('.js-pause-button')
    .addEventListener('click',()=>{
      clearInterval(interval1);
      clearInterval(interval2);
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

  document.querySelector('.js-lap-button')
    .addEventListener('click',lap);
}

function lapRun(){
  if(running === true){
    lapmilliseconds += 10;
    if(lapmilliseconds === 100) {
      lapmilliseconds = 0;
      lapseconds++;
      if(lapseconds === 60) {
        lapseconds = 0;
        lapminutes++;
        if(lapminutes === 60) {
          lapminutes = 0;
          laphours++;
        }
      }
    }
  }
}

function lap(){
  countLap++;
  let lm = lapminutes < 10 ? "0" + lapminutes : lapminutes;
  let ls = lapseconds < 10 ? "0" + lapseconds : lapseconds;
  let lms = lapmilliseconds < 10 ? "0" + lapmilliseconds : lapmilliseconds;

  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;
  
  t+=`
    <div class="lap-timings js-lap-timings">
      <div>${(countLap < 10) ? "0"+countLap : countLap}</div>
      <div>${lm}:${ls}:${lms}</div>
      <div class="overall-time">${m}:${s}:${ms}</div>
    </div>
  `;
  
  laphours = 0,lapminutes = 0,lapseconds = 0,lapmilliseconds = 0;
  lapDisplay.innerHTML = t;
}

function reset(){
  hours = 0,minutes = 0,seconds = 0,milliseconds = 0;
  laphours = 0,lapminutes = 0,lapseconds = 0,lapmilliseconds = 0;
  display.innerHTML = "00 : 00 : 00 : 00";
  countLap = 0;
  t=`
    <div class="lap-timings lap-header">
      <div>Lap</div>
      <div>Lap times</div>
      <div>Overall time</div>
    </div>
  `;
  lapDisplay.innerHTML = '';

  create();
}

function run(){
  if(running === true){
    milliseconds += 10;
    if(milliseconds === 100) {
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
    let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    display.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
  }
}