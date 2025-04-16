const breakDecrementBtn = document.getElementById("break-decrement");
const breakIncrementBtn = document.getElementById("break-increment");
const breakLength = document.getElementById("break-length");

const sessionDecrementBtn = document.getElementById("session-decrement");
const sessionIncrementBtn = document.getElementById("session-increment");
const sessionLength = document.getElementById("session-length");

const timeLeft = document.getElementById("time-left");

const startStopBtn = document.getElementById("start_stop");
const resetBtn = document.getElementById("reset");

const beep = document.getElementById("beep");

let breakLengthValue = 5;
let sessionLengthValue = 25;

let isStarted = false;
let isPaused = false;
let isSession = true; // Флаг для отслеживания режима сессии или перерыва
let interval;
let time = sessionLengthValue * 60;

//break increment and decrement
breakIncrementBtn.addEventListener("click", () => {
  if (breakLengthValue >=60) {
    return;
  } else {
  breakLengthValue += 1;
  breakLength.innerText = breakLengthValue;
  }
});

breakDecrementBtn.addEventListener("click", () => {
  if (breakLengthValue <=1) {
    return;
  } else {
    breakLengthValue -= 1;
    breakLength.innerText = breakLengthValue;
  }
});

//session increment and decrement
sessionIncrementBtn.addEventListener("click", () => {
  if (sessionLengthValue >=60) {
    return;
  } else {
    sessionLengthValue += 1;
    sessionLength.innerText = sessionLengthValue;
    timeLeft.innerText= `${sessionLengthValue}:00`;
  } 
  });
  
  sessionDecrementBtn.addEventListener("click", () => {
    if (sessionLengthValue <=1) {
      return;
    } else {
        sessionLengthValue -= 1;
        sessionLength.innerText = sessionLengthValue;
        timeLeft.innerText= `${sessionLengthValue}:00`;
    }
  });

// Обновление времени на экране
function updateCount() {
  if (time < 0) {
    clearInterval(interval);
    beep.currentTime = 0;
    beep.play();
    if (isSession) {
      isSession = false;
      time = breakLengthValue * 60;
      timeLeft.innerText = `${breakLengthValue}:00`;
    } else {
      isSession = true;
      time = sessionLengthValue * 60;
      timeLeft.innerText = `${sessionLengthValue}:00`;
    }
    setTimeout(() => {
      interval = setInterval(updateCount, 1000);
    }, 1000); // Ждем 1 секунду перед переключением на следующий режим
    return;
  }
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  timeLeft.innerHTML = `${minutes}:${seconds}`;
  time--;
}

// Отключение/включение кнопок
function toggleControls(state) {
  breakIncrementBtn.disabled = state;
  breakDecrementBtn.disabled = state;
  sessionIncrementBtn.disabled = state;
  sessionDecrementBtn.disabled = state;
}

// Запуск таймера
const startWatch = () => {
  if (!isStarted) {
    clearInterval(interval);
    time = sessionLengthValue * 60;
    startStopBtn.innerText = "Pause";
    isStarted = true;
    updateCount();
    toggleControls(true);
    interval = setInterval(updateCount, 1000);
  } else if (isStarted && !isPaused) {
    startStopBtn.innerText = "Start";
    clearInterval(interval);
    isPaused = true;
  } else {
    startStopBtn.innerText = "Pause";
    isPaused = false;
    interval = setInterval(updateCount, 1000);
  }
};

// Сброс таймера
const resetWatch = () => {
  clearInterval(interval);
  isStarted = false;
  isPaused = false;
  beep.pause();
  beep.currentTime = 0;
  toggleControls(false);
  breakLengthValue = 5;
  sessionLengthValue = 25;
  time = sessionLengthValue * 60;
  breakLength.innerText = 5;
  sessionLength.innerText = 25;
  timeLeft.innerHTML = `${sessionLengthValue}:00`;
};

// Слушатель событий для кнопок
document.addEventListener("click", (e) => {
  const element = e.target;
  if (element.id === "start_stop") startWatch();
  if (element.id === "reset") resetWatch();
});

updateCount();
