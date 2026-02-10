let studyTime = 25 * 60;
let breakTime = 5 * 60;
let time = studyTime;
let isStudy = true;
let interval = null;
let totalMinutes = Number(localStorage.getItem("totalMinutes))||0;

const timer = document.getElementById("timer");
const mode = document.getElementById("mode");
const totalTimeDisplay = document.getElementById("totalTime");

function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timer.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function updateTotalTime() {
  totalTimeDisplay.textContent = `오늘 공부 시간: ${totalMinutes}분`;
}

document.getElementById("startBtn").onclick = () => {
  if (interval) return;

  interval = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(interval);
      interval = null;

      if (isStudy) {
        totalMinutes += 25;
        localStorage.setItem(:totalMinutes",totalMinutes);
        updateTotalTime();
      }

      isStudy = !isStudy;
      time = isStudy ? studyTime : breakTime;
      mode.textContent = isStudy ? "Study Mode" : "Break Mode";

      alert(isStudy ? "다시 공부 시작!" : "휴식 시간!");
      updateDisplay();
    }
  }, 1000);
};

document.getElementById("pauseBtn").onclick = () => {
  clearInterval(interval);
  interval = null;
};

document.getElementById("resetBtn").onclick = () => {
  clearInterval(interval);
  interval = null;
  isStudy = true;
  time = studyTime;
  mode.textContent = "Study Mode";
  updateDisplay();
};

updateDisplay();

updateTotalTime();

const darkBtn = document.getElementById("darkModeBtn");

darkBtn.onclick = () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
};

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}
