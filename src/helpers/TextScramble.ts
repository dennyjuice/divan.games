export default class TextScramble {
  private el: any;

  private readonly chars: string;

  private queue: any[] | undefined;

  private resolve: ((value: unknown) => void) | undefined;

  private frameRequest: number | undefined;

  private frame: number | undefined;

  constructor(el: any) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText = (newText: string) => {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => {
      this.resolve = resolve;
      return this.resolve;
    });
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    if (typeof this.frameRequest === 'number') {
      cancelAnimationFrame(this.frameRequest);
    }

    this.frame = 0;
    this.update();
    return promise;
  };

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0, num = this.queue!.length; i < num!; i++) {
      const { from, to, start, end } = this.queue![i];
      let { char } = this.queue![i];

      if (this.frame! >= end) {
        // eslint-disable-next-line no-plusplus
        complete++;
        output += to;
      } else if (this.frame! >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue![i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue!.length) {
      // @ts-ignore
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      // eslint-disable-next-line no-plusplus
      this.frame!++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}
