import { getInput } from "../util";

const formatInputPartOne: Function = (input: string[]) =>
  input.map((line: string) => [
    line.slice(0, line.length / 2),
    line.slice(line.length / 2, line.length),
  ]);

const formatInputPartTwo: Function = (input: string[]) =>
  input.reduce(
    (acc: { finalArr: string[][]; temp: string[] }, line, index) => {
      acc.temp.push(line);

      if (index % 3 === 2) {
        acc.finalArr.push(acc.temp);
        acc.temp = [];
      }

      return acc;
    },
    { finalArr: [], temp: [] }
  );

const findCommonCharacter: Function = (
  stringOne: string,
  stringTwo: string,
  stringThree?: string
) =>
  new Set(
    [...stringOne].filter(
      (char: string) =>
        stringTwo.includes(char) && (!stringThree || stringThree.includes(char))
    )
  );

const LOWERCASE_OFFSET: number = 96;
const UPPERCASE_OFFSET: number = 38;
const getItemPriority: Function = (item: number) =>
  item >= 97 ? item - LOWERCASE_OFFSET : item - UPPERCASE_OFFSET;

const solvePartOne: Function = (input: string[][]) =>
  input.reduce(
    (acc: number, line) =>
      acc + getItemPriority([...findCommonCharacter(...line)][0].charCodeAt(0)),
    0
  );

const solvePartTwo: Function = (input: string[][]) =>
  input.reduce(
    (acc: number, line) =>
      acc + getItemPriority([...findCommonCharacter(...line)][0].charCodeAt(0)),
    0
  );

const main: Function = async () => {
  try {
    const input: string[] | undefined = await getInput(
      "../../src/day3/input.txt"
    );

    const formattedInputPartOne: string[][] = formatInputPartOne(input);
    const partOneSolution: number = solvePartOne(formattedInputPartOne);

    const {
      finalArr: formattedInputPartTwo,
    }: { finalArr: string[][]; temp: string[] } = formatInputPartTwo(input);
    const partTwoSolution: number = solvePartTwo(formattedInputPartTwo);

    console.log(`Solution for part one: ${partOneSolution}.`);
    console.log(`Solution for part two: ${partTwoSolution}.`);
  } catch (err) {
    console.error(err);
  }
};

main();
