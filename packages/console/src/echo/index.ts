import colorize from '../colorize';

export default {
  text(...messages: string[]) {
    process.stdout.write(
      colorize(...messages)
        .white()
        .break()
        .toString(),
    );
  },
  success(...messages: string[]) {
    process.stdout.write(
      colorize(...messages)
        .green()
        .break()
        .toString(),
    );
  },
  error(...messages: string[]) {
    process.stdout.write(
      colorize(...messages)
        .red()
        .break()
        .toString(),
    );
  },
  warning(...messages: string[]) {
    process.stdout.write(
      colorize(...messages)
        .yellow()
        .break()
        .toString(),
    );
  },
  info(...messages: string[]) {
    process.stdout.write(
      colorize(...messages)
        .blue()
        .break()
        .toString(),
    );
  },
};
