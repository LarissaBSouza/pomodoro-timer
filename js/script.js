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

    start() {
        this.isRunning = true;
        this.startBtn.style.display = 'none';
        this.pauseBtn.style.display = 'inline-block';

        this.timer = setInterval(() => {
            this.timeLeft--;

            if (this.currentMode === 'pomodoro') {
                this.totalFocusTime++;
            }

            this.updateDisplay();

            if (this.timeLeft <= 0) {
                this.complete(); // Chama o complete separado
            }
        }, 1000);
    }

    pause() {
        this.isRunning = false;
        this.startBtn.style.display = 'inline-block';
        this.pauseBtn.style.display = 'none';
        clearInterval(this.timer);
    }

    reset() {
        this.pause();
        this.timeLeft = this.modes[this.currentMode];
        this.totalTime = this.modes[this.currentMode];
        this.updateDisplay();
    }

    complete() {
        this.pause();

        if (this.currentMode === 'pomodoro') {
            this.completedPomodoros++;
            this.updateStats();

            const nextMode = this.completedPomodoros % 4 === 0 ? 'long' : 'short';
            this.showNotification(
                'Sessão Completa',
                `Excelente trabalho! Hora de fazer uma ${nextMode === 'long' ? 'pausa longa' : 'pausa curta'}.`
            );
            this.playSound();
        } else {
            this.showNotification(
                'Pausa Finalizada',
                'Hora de voltar ao trabalho focado!'
            );
            this.playSound();
        }

        this.reset();
    }

    updateDisplay() {
        // 1. Atualiza o relógio (estava faltando)
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // Atualiza a barra de progresso
        const progress = ((this.totalTime - this.timeLeft) / this.totalTime) * 100;
        this.progressFill.style.width = `${progress}%`;
        
        // Atualiza título da aba
        document.title = `${this.timeDisplay.textContent} - Pomodoro Timer`;
    }

    updateStats() { // Método separado para organizar melhor
        this.completedPomodorosEl.textContent = this.completedPomodoros;
        const hours = Math.floor(this.totalFocusTime / 3600);
        const minutes = Math.floor((this.totalFocusTime % 3600) / 60);
        this.totalFocusTimeEl.textContent = `${hours}h ${minutes}m`;
    }

    showNotification(title, message) {
    
        this.notificationTitle.textContent = title;
        this.notificationMessage.textContent = message;
        this.notification.classList.add('show');

        if (Notification.permission === 'granted') {
            
            new Notification(title, { body: message });
        
        }

        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 5000);

    }

    playSound() {
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext) ();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    requestNotificationPermission() {
        // Correção do erro de digitação: Notification
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }    
}

const pomodoroTimer = new PomodoroTimer();