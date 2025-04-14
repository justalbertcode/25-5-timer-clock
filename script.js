const breakDecrementBtn = document.getElementById("break-decrement");
const breakIncrementBtn = document.getElementById("break-increment");
const breakLength = document.getElementById("break-length");

const sessionDecrementBtn = document.getElementById("session-decrement");
const sessionIncrementBtn = document.getElementById("session-increment");
const sessionLength = document.getElementById("session-length");

const timeLeft = document.getElementById("time-left");
const startStopBtn = document.getElementById("start-stop");
const resetBtn = document.getElementById("reset");

const breakLengthDefaultValue = 5;
let breakLengthValue = 5;

const sessionLengthDefaultValue = 25;
let sessionLengthValue = 25;

//reset 
function resetValue() {
  breakLength.innerText = breakLengthDefaultValue;
  sessionLength.innerText = sessionLengthDefaultValue;
  breakLength.classList.add('reset');
  sessionLength.classList.add('reset');

  setTimeout(()=>{
    breakLength.classList.remove('reset');
    sessionLength.classList.remove('reset');
  }, 200);
}

resetBtn.addEventListener("click", resetValue);


//break increment and decrement
breakIncrementBtn.addEventListener("click", () => {
  breakLengthValue += 1;
  breakLength.innerText = breakLengthValue;
});

breakDecrementBtn.addEventListener("click", () => {
  if (breakLengthValue === 0) {
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
  });
  
  sessionDecrementBtn.addEventListener("click", () => {
    if (sessionLengthValue === 0) {
      return;
    } else {
        sessionLengthValue -= 1;
        sessionLength.innerText = sessionLengthValue;
    }
  });