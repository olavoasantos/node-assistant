import {
  bgBlack,
  bgBlue,
  bgCyan,
  bgGreen,
  bgMagenta,
  bgRed,
  bgWhite,
  bgYellow,
  black,
  blink,
  blue,
  bright,
  cyan,
  dim,
  green,
  hidden,
  magenta,
  red,
  reset,
  reverse,
  underscore,
  white,
  yellow,
} from './constants';

export default (...value: string[]) => {
  let config = '';
  let message = value.length > 0 ? value.join(' ') : '';
  return {
    toString() {
      return config + message + reset;
    },
    append(...args: string[]) {
      message += args.join(' ');
      return this;
    },
    appendConfig(...args: string[]) {
      config += args.join('');
      return this;
    },
    break(n: number = 1) {
      this.append('\n'.repeat(n));
      return this;
    },
    tab(n: number = 1) {
      this.append('  '.repeat(n));
      return this;
    },
    pad(n: number = 1) {
      this.append(' '.repeat(n));
      return this;
    },
    left() {
      const pad = ' '.repeat(Number(process.stdout.columns) - message.length);
      this.append(pad);
      return this;
    },
    right() {
      const pad = ' '.repeat(Number(process.stdout.columns) - message.length);
      message = pad + message;
      return this;
    },
    justify() {
      const arg = message.split(' ');
      const count = arg.length > 1 ? arg.length : 2;
      const length = arg.join('').length;
      const width = Number(process.stdout.columns);
      const size = Math.floor((width - length) / (count - 1));
      const pad = ' '.repeat(size);
      message = arg.join(pad).padEnd(width, ' ');
      return this;
    },
    center() {
      const pad = ' '.repeat(Math.floor((Number(process.stdout.columns) - message.length) / 2));
      message = message.length % 2 === 0 ? pad + message + pad : ' ' + pad + message + pad;
      return this;
    },
    reset() {
      this.appendConfig(reset);
      return this;
    },
    bright() {
      this.appendConfig(bright);
      return this;
    },
    dim() {
      this.appendConfig(dim);
      return this;
    },
    underscore() {
      this.appendConfig(underscore);
      return this;
    },
    blink() {
      this.appendConfig(blink);
      return this;
    },
    reverse() {
      this.appendConfig(reverse);
      return this;
    },
    hidden() {
      this.appendConfig(hidden);
      return this;
    },
    black() {
      this.appendConfig(black);
      return this;
    },
    red() {
      this.appendConfig(red);
      return this;
    },
    green() {
      this.appendConfig(green);
      return this;
    },
    yellow() {
      this.appendConfig(yellow);
      return this;
    },
    blue() {
      this.appendConfig(blue);
      return this;
    },
    magenta() {
      this.appendConfig(magenta);
      return this;
    },
    cyan() {
      this.appendConfig(cyan);
      return this;
    },
    white() {
      this.appendConfig(white);
      return this;
    },
    bgBlack() {
      this.appendConfig(bgBlack);
      return this;
    },
    bgRed() {
      this.appendConfig(bgRed);
      return this;
    },
    bgGreen() {
      this.appendConfig(bgGreen);
      return this;
    },
    bgYellow() {
      this.appendConfig(bgYellow);
      return this;
    },
    bgBlue() {
      this.appendConfig(bgBlue);
      return this;
    },
    bgMagenta() {
      this.appendConfig(bgMagenta);
      return this;
    },
    bgCyan() {
      this.appendConfig(bgCyan);
      return this;
    },
    bgWhite() {
      this.appendConfig(bgWhite);
      return this;
    },
  };
};
