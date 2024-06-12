#!/usr/bin/env node

const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .version("1.0.0")
  .description("wc")
  .option("-l, --line <type>", "file", "count line numbers")
  .action((options) => {
    if (options.line) {
      try {
        const data = fs.readFileSync(options.line, "utf8");

        const list = data.split("\n");

        console.log(`${list.length - 1} ${options.line}`);
      } catch (err) {
        console.error(`can't read file: ${err}`);
      }
    }
  });

program.parse(process.argv);

if (process.argv.length < 3) {
  program.help();
}
