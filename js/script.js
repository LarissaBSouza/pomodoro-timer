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

    initElements() {

        this.timeDisplay = document.getElementById('timeDisplay');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.progressFill = document.getElementById('progressFill');
        this.notification = document.getElementById('notification');
        this.notificationTitle = document.getElementById('notificationTitle');
        this.notificationMessage = document.getElementById('notificationMessage');
        this.completedPomodorosEl = document.getElementById('completedPomodoros');
        this.totalFocusTimeEl = document.getElementById('totalFocusTime');
        this.totalFocusTimeEl = document.getElementById('totalFocusTime');

        this.modeButtons = document.querySelectorAll('.mode-btn');
        this.pomodoroTimeInput = document.getElementById('pomodoroTime');
        this.shortBreakTimeInput = document.getElementById('shortBreakTime');
        this.longBreakTimeInput = document.getElementById('longBreakTime');

    }

    initEventListeners() {

        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());

        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!this.isRunning) {
                    this.switchMode(e.target.dataset.mode);
                }
            });
        });
        
        [this.pomodoroTimeInput, this.shortBreakTimeInput, this.longBreakTimeInput].forEach(input => {
            input.addEventListener('change', () => {
                if (!this.isRunning) {
                    this.updateModeSettings();
                }
            });
        });
    }

    updateModeSettings() {

        this.modes.pomodoro = this.pomodoroTimeInput.value *60;
        this.modes.short = this.shortBreakTimeInput.value *60;
        this.modes.long = this.longBreakTimeInput.value *60;

        this.timeLeft = this.modes[this.currentMode];
        this.totalTime = this.modes[this.currentMode];
        this.updateDisplay();
    }

    switchMode(mode) {

        this.currentMode = mode;
        this.timeLeft = this.modes[mode];
        this.totalTime = this.modes[mode];
        
        this.modeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === mode) {
                btn.classList.add('active');
            }
        });

        this.updateDisplay();
    }

}