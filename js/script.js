class PomodoroTimer {

    constructor() {

        this.modes = {

            pomodoro: 25 * 60,
            short: 5 * 60,
            long: 15 * 60
        };

        this.currentMode = 'pomodoro';
        this.timeLeft = this.modes.pomodoro;
        this.totalTime = this.modes.pomodoro;
        this.isRunning = false;
        this.timer = null;

        this.completedPomodoros = 0;
        this.totalFocusTime = 0;

        this.initElements();
        this.initEventListeners();
        this.updateDisplay();
        this.requestNotificationPermission();

    }
}