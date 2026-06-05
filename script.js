/**
 * Daily-Study-Timer (최종 리팩토링 버전)
 * 기능: 공부 타이머, 휴식 모드 전환, 공부 시간 로컬 저장, 다크 모드 지원
 */

class StudyTimer {
    constructor() {
        // 설정값 관리 (상수 객체)
        this.config = { STUDY_MINUTES: 25, BREAK_MINUTES: 5 };
        this.studyTime = this.config.STUDY_MINUTES * 60;
        this.breakTime = this.config.BREAK_MINUTES * 60;
        
        this.time = this.studyTime;
        this.isStudy = true;
        this.interval = null;
        this.totalMinutes = Number(localStorage.getItem("totalMinutes")) || 0;

        this.initElements();
        this.loadSettings();
        this.updateDisplay();
        this.updateTotalTime();
    }

    // DOM 요소 초기화 및 이벤트 연결
    initElements() {
        this.timerDisplay = document.getElementById("timer");
        this.modeDisplay = document.getElementById("mode");
        this.totalDisplay = document.getElementById("totalTime");
        
        document.getElementById("startBtn").onclick = () => this.start();
        document.getElementById("pauseBtn").onclick = () => this.pause();
        document.getElementById("resetBtn").onclick = () => this.reset();
        document.getElementById("darkModeBtn").onclick = () => this.toggleDarkMode();
    }

    // 초기 설정 불러오기
    loadSettings() {
        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark");
        }
    }

    updateDisplay() {
        const mins = Math.floor(this.time / 60);
        const secs = this.time % 60;
        this.timerDisplay.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }

    updateTotalTime() {
        this.totalDisplay.textContent = `오늘 공부 시간: ${this.totalMinutes}분`;
    }

    start() {
        if (this.interval) return;
        this.interval = setInterval(() => {
            if (this.time > 0) {
                this.time--;
                this.updateDisplay();
            } else {
                this.switchMode();
            }
        }, 1000);
    }

    pause() {
        clearInterval(this.interval);
        this.interval = null;
    }

    reset() {
        this.pause();
        this.isStudy = true;
        this.time = this.studyTime;
        this.modeDisplay.textContent = "Study Mode";
        this.updateDisplay();
    }

    // 모드 전환 로직
    switchMode() {
        this.pause();
        
        // 공부 모드 종료 시 시간 기록
        if (this.isStudy) {
            this.totalMinutes += this.config.STUDY_MINUTES;
            localStorage.setItem("totalMinutes", this.totalMinutes);
            this.updateTotalTime();
        }

        this.isStudy = !this.isStudy;
        this.time = this.isStudy ? this.studyTime : this.breakTime;
        this.modeDisplay.textContent = this.isStudy ? "Study Mode" : "Break Mode";
        
        alert(this.isStudy ? "다시 공부 시작!" : "휴식 시간!");
        this.updateDisplay();
    }

    toggleDarkMode() {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("darkMode", isDark);
    }
}

// 애플리케이션 실행
const timerApp = new StudyTimer();
