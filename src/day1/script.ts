const { getInput } = require("../util");

type FormattedAccumulatorType = {
  count: number;
  sums: number[];
};

const formatInput: Function = (input: string[]) =>
  input.reduce(
    (acc: FormattedAccumulatorType, line: string) => {
      if (line === "") {
        acc.sums.push(acc.count);
        acc.count = 0;
      } else {
        acc.count += parseInt(line);
      }
      return acc;
    },
    {
      count: 0,
      sums: [],
    }
  ).sums;

const solvePartOne: Function = (input: number[]) => Math.max(...input);

const solvePartTwo: Function = (input: number[]) =>
  input
    .sort((a: number, b: number) => a - b)
    .reverse()
    .slice(0, 3)
    .reduce((acc: number, calorieCount: number) => acc + calorieCount, 0);

const main: Function = async () => {
  const input: string[] = await getInput("../../src/day1/input.txt");
  const formattedInput: number[] = formatInput(input);

  const partOneSolution: number = solvePartOne(formattedInput);
  const partTwoSolution: number = solvePartTwo(formattedInput);

  console.log(`Solution for part one: ${partOneSolution}.`);
  console.log(`Solution for part two: ${partTwoSolution}.`);
};

main();
