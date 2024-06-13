#!/usr/bin/env node

const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .version("1.0.0")
  .description("wc")
  .option("-l, --line <type>", "file count line numbers")
  .option("-c, --bytes <type>", "file print the byte counts")
  .option("-w, --words <type>", "print the word counts")
  .action((options) => {
    if (options.line) {
      try {
        const data = fs.readFileSync(options.line, "utf8");
        const list = data.split("\n");

        console.log(`${list.length - 1} ${options.line}`);
      } catch (err) {
        console.error(`Can't read file: ${err}`);
      }
    }

    if (options.bytes) {
      fs.stat(options.bytes, (err, stats) => {
        if (err) {
          console.error(`Can't read file: ${err.message}`);
          return;
        }
        console.log(`${stats.size} ${options.bytes}`);
      });
    }

    if (options.words) {
      try {
        const data = fs.readFileSync(options.words, "utf8");
        const list = data.split(" ");

        console.log(`${list.length - 1} ${options.words}`);
      } catch (err) {
        console.error(`Can't read file: ${err}`);
      }
    }
  });

program.parse(process.argv);

if (process.argv.length < 3) {
  program.help();
}
