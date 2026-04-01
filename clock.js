/**
 * Rakendus: Digitaalne Lauakell
 * Autor: Elisabet Peterson
 * Koodi loomisel on kasutatud Gemini AI abi.
Promptid:
1. "Anna elektroonilise kella ideid, mida saaks teha js-iga"
2. "Struktrureeri koodi, et asjad oleksid loogiliselt ja näeksid viisakamad välja"
 */

class DigitalClock {
    constructor() {
        this.fontSize = 15; // vw 
        this.is24Hour = true;
        this.fonts = ['monospace', 'serif', 'sans-serif', 'cursive'];
        this.currentFontIndex = 0;
        
        // Elementide leidmine
        this.clockElement = document.getElementById('clock-display');
        this.dateElement = document.getElementById('date-full');
        this.dayElement = document.getElementById('day-name');
        
        this.init();
    }

    init() {
        this.updateTime();
        this.addEventListeners();
        // Uuenda kella iga sekundi järel
        setInterval(() => this.updateTime(), 1000);
    }

    updateTime() {
        const now = new Date();
        let h = now.getHours();
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');

        if (!this.is24Hour) {
            h = h % 12 || 12;
        }
        
        document.getElementById('hours').innerText = String(h).padStart(2, '0');
        document.getElementById('minutes').innerText = m;
        document.getElementById('seconds').innerText = s;

        // Kuupäeva uuendamine
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.dayElement.innerText = now.toLocaleDateString('et-EE', { weekday: 'long' });
        this.dateElement.innerText = now.toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    // Atribuutide muutmise meetodid 
    changeFontSize(delta) {
        this.fontSize += delta;
        this.clockElement.style.fontSize = this.fontSize + "vw";
    }

    toggleFormat() {
        this.is24Hour = !this.is24Hour;
        this.updateTime();
    }

    changeBgColor() {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        document.body.style.backgroundColor = randomColor;
    }

    changeTextColor() {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        document.body.style.color = randomColor;
    }

    changeFont() {
        this.currentFontIndex = (this.currentFontIndex + 1) % this.fonts.length;
        document.body.style.fontFamily = this.fonts[this.currentFontIndex];
    }

    addEventListeners() {
        document.getElementById('btn-font-plus').addEventListener('click', () => this.changeFontSize(2));
        document.getElementById('btn-font-minus').addEventListener('click', () => this.changeFontSize(-2));
        document.getElementById('btn-color-bg').addEventListener('click', () => this.changeBgColor());
        document.getElementById('btn-color-text').addEventListener('click', () => this.changeTextColor());
        document.getElementById('btn-format').addEventListener('click', () => this.toggleFormat());
        document.getElementById('btn-font-family').addEventListener('click', () => this.changeFont());

        // Klaviatuuri otseteed
        window.addEventListener('keydown', (e) => {
            if (e.key === '+') this.changeFontSize(1);
            if (e.key === '-') this.changeFontSize(-1);
        });
    }
}

// Käivita kell
const myClock = new DigitalClock();