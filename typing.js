export class Typing {
    static Create(elementId) {
        const element = document.getElementById(elementId);

        if (!element) {
            throw new Error(`Element with id ${elementId} doesn't exists`);
        }

        if (!element.classList.contains("typewrite")) {
            throw new Error(`Element with id ${elementId} must have the css class typewrite`);
        }

        const words = element.getAttribute('data-type');
        const period = element.getAttribute('data-period');

        if (!words) {
            throw new Error("Must inform data-type attribute with words");
        }
        if (!period) {
            throw new Error("Must inform data-period attribute with period");
        }

        // INJECT CSS
        const css = document.createElement("style");
        css.setAttribute("type", "text/css");
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #000}";
        document.body.appendChild(css);

        return new Typing(element, JSON.parse(words), period);
    }
    constructor(element, words, period) {
        this.words = words;
        this.loopNum = 0;
        this.element = element;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
        this.tick = this.tick.bind(this);
        this.timeout = null;
        this.observerWordsChange();
        this.tick();
    }

    observerWordsChange() {
        const observer = new MutationObserver((mutationList, observer) => {
            for(let mutation of mutationList){
                if (mutation.type === "attributes" && mutation.attributeName == "data-type") {
                    this.words = JSON.parse(mutation.target.getAttribute("data-type"));
                }
            }
        });

        observer.observe(this.element, { attributes: true });
    }

    tick() {
        const i = this.loopNum % this.words.length;
        const fullTxt = this.words[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = `<span class="wrap">${this.txt}</span>`;

        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        this.timeout = setTimeout(() => {
            this.tick();
        }, delta);
    }

    stop() {
        clearTimeout(this.timeout);
    }
}