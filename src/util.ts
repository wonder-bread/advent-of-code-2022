const fs = require("fs");
const readline = require("readline");

export const getInput = async (filepath: string) => {
  try {
    const input: string[] = [];

    const reader = readline.createInterface({
      input: fs.createReadStream(filepath || "./input.txt"),
      crlfDelay: Infinity,
    });

    for await (const line of reader) {
      input.push(line);
    }

    return input;
  } catch (e) {
    console.error(e);
  }
};
