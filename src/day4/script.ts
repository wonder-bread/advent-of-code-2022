import { getInput } from "../util";

const formatInput: Function = (input: string[]) =>
  input.map((line: string) =>
    line
      .split(",")
      .map((splitLine: string) =>
        splitLine.split("-").map((num: string) => parseInt(num))
      )
  );

const isBetween: Function = (numRange: number[], num: number) =>
  num >= numRange[0] && num <= numRange[1];

const encapsulatedBetween: Function = (
  numRange: number[],
  numGroup: number[]
) => numGroup.every((num: number) => isBetween(numRange, num));

const overlapBetween: Function = (numRange: number[], numGroup: number[]) =>
  numGroup.some((num: number) => isBetween(numRange, num));

const solvePartOne: Function = (input: number[][][]) =>
  input.reduce(
    (acc: number, line: number[][]) =>
      encapsulatedBetween(line[0], line[1]) ||
      encapsulatedBetween(line[1], line[0])
        ? acc + 1
        : acc,
    0
  );

const solvePartTwo: Function = (input: number[][][]) =>
  input.reduce(
    (acc: number, line: number[][]) =>
      overlapBetween(line[0], line[1]) || overlapBetween(line[1], line[0])
        ? acc + 1
        : acc,
    0
  );

const main: Function = async () => {
  try {
    const input: string[] | undefined = await getInput(
      "../../src/day4/input.txt"
    );
    const formattedInput: number[][][] = formatInput(input);

    const partOneSolution: number = solvePartOne(formattedInput);
    const partTwoSolution: number = solvePartTwo(formattedInput);

    console.log(`Solution for part one: ${partOneSolution}.`);
    console.log(`Solution for part two: ${partTwoSolution}.`);
  } catch (err) {
    console.error(err);
  }
};

main();
