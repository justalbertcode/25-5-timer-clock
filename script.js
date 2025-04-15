const breakDecrementBtn = document.getElementById("break-decrement");
const breakIncrementBtn = document.getElementById("break-increment");
const breakLength = document.getElementById("break-length");

const sessionDecrementBtn = document.getElementById("session-decrement");
const sessionIncrementBtn = document.getElementById("session-increment");
const sessionLength = document.getElementById("session-length");

const timeLeft = document.getElementById("time-left");
const startStopBtn = document.getElementById("start-stop");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

const beep = document.getElementById("beep");

const breakLengthDefaultValue = 5;
let breakLengthValue = 5;

const sessionLengthDefaultValue = 25;
let sessionLengthValue = 25;

const sessionDurationMinutes = 25;
let isStarted = false;
let isPaused = true;
let interval;
let time = sessionLengthValue * 60;

//break increment and decrement
breakIncrementBtn.addEventListener("click", () => {
  breakLengthValue += 1;
  breakLength.innerText = breakLengthValue;
});

breakDecrementBtn.addEventListener("click", () => {
  if (breakLengthValue === 1) {
    return;
  } else {
    breakLengthValue -= 1;
    breakLength.innerText = breakLengthValue;
  }
});

//session increment and decrement
sessionIncrementBtn.addEventListener("click", () => {
    sessionLengthValue += 1;
    sessionLength.innerText = sessionLengthValue;
    timeLeft.innerText= `${sessionLengthValue}:00`;
    
  });
  
  sessionDecrementBtn.addEventListener("click", () => {
    if (sessionLengthValue === 1) {
      return;
    } else {
        sessionLengthValue -= 1;
        sessionLength.innerText = sessionLengthValue;
        timeLeft.innerText= `${sessionLengthValue}:00`;
        
    }
  });

 
  function updateCount() {
    if (time < 0) {
      clearInterval(interval);
      isPaused = true;
      toggleControls(false);
      beep.currentTime = 0;
      beep.play();
      return;
    }
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timeLeft.innerHTML = `${minutes}:${seconds}`;
    time--;
  }
  
  function toggleControls(state) {
    breakIncrementBtn.disabled = state;
    breakDecrementBtn.disabled = state;
    sessionIncrementBtn.disabled = state;
    sessionDecrementBtn.disabled = state;
    pauseBtn.disabled = !state;
  }
  
   
  const startWatch = () => {
    if (!isPaused) return; 
    isPaused = false;
    toggleControls(true);
    // Только если это первый старт — устанавливаем time
    if (!isStarted) {
      
      clearInterval(interval);
      time = sessionLengthValue * 60;
      isStarted = true;
      updateCount();
    }
  
    interval = setInterval(updateCount, 1000);
  };


  const pauseWatch = () => {
    clearInterval(interval);
    isPaused = true;
    beep.pause();
    beep.currentTime = 0;
  };
  
  const resetWatch = () => {
    isStarted = false;
    isPaused = true;
    toggleControls(false);
    breakLengthValue = breakLengthDefaultValue;
    sessionLengthValue = sessionLengthDefaultValue;
    time = sessionLengthValue * 60;
    breakLength.innerText = breakLengthValue;
    sessionLength.innerText = sessionLengthValue;
    timeLeft.innerHTML = `${sessionLengthValue}:00`;
    clearInterval(interval);

    breakLength.innerText = breakLengthDefaultValue;
    sessionLength.innerText = sessionLengthDefaultValue;
    breakLength.classList.add('reset');
    sessionLength.classList.add('reset');
    timeLeft.classList.add('reset');

  setTimeout(()=>{
    breakLength.classList.remove('reset');
    sessionLength.classList.remove('reset');
    timeLeft.classList.remove('reset');
  }, 200);
  };

document.addEventListener("click", (e) => {
  const element = e.target;
  if (element.id === "start-stop") startWatch();
  if (element.id === "pause") pauseWatch();
  if (element.id === "reset") resetWatch();
});

updateCount();