import { getInput } from "../util";

enum PointsAwarded {
  Loss = 0,
  Draw = 3,
  Victory = 6,
}

const RPS_CONVERSION_MAP: { [key: string]: string } = {
  A: "R",
  X: "R",
  B: "P",
  Y: "P",
  C: "S",
  Z: "S",
};

const RPS_TYPE_POINTS_MAP: { [key: string]: number } = {
  X: 1,
  Y: 2,
  Z: 3,
};

const WINNING_SETUPS: { [key: string]: boolean } = {
  RS: true,
  PR: true,
  SP: true,
};

const OUTCOME_TYPE_POINTS_MAP: { [key: string]: number } = {
  X: PointsAwarded.Loss,
  Y: PointsAwarded.Draw,
  Z: PointsAwarded.Victory,
};

const OUTCOME_TYPE_NEEDED_RPS_POINTS_MAP: {
  [key: string]: { [key: string]: number };
} = {
  X: {
    A: RPS_TYPE_POINTS_MAP.Z,
    B: RPS_TYPE_POINTS_MAP.X,
    C: RPS_TYPE_POINTS_MAP.Y,
  },
  Y: {
    A: RPS_TYPE_POINTS_MAP.X,
    B: RPS_TYPE_POINTS_MAP.Y,
    C: RPS_TYPE_POINTS_MAP.Z,
  },
  Z: {
    A: RPS_TYPE_POINTS_MAP.Y,
    B: RPS_TYPE_POINTS_MAP.Z,
    C: RPS_TYPE_POINTS_MAP.X,
  },
};

const formatInput: Function = (input: string[]) =>
  input.map((line: string) => line.split(" "));

const calculateResultsPartOne = (opponentRps: string, selfRps: string) => {
  const convertedOpponentRps: string = RPS_CONVERSION_MAP[opponentRps];
  const convertedSelfRps: string = RPS_CONVERSION_MAP[selfRps];
  let outcome: number = PointsAwarded.Loss;

  if (convertedOpponentRps === convertedSelfRps) {
    outcome = PointsAwarded.Draw;
  }

  const outcomeStr: string = `${convertedSelfRps}${convertedOpponentRps}`;
  if (WINNING_SETUPS[outcomeStr]) {
    outcome = PointsAwarded.Victory;
  }

  return outcome + RPS_TYPE_POINTS_MAP[selfRps];
};

const calculateResultsPartTwo = (opponentRps: string, outcome: string) =>
  OUTCOME_TYPE_POINTS_MAP[outcome] +
  OUTCOME_TYPE_NEEDED_RPS_POINTS_MAP[outcome][opponentRps];

const solvePartOne: Function = (input: string[][]) =>
  input.reduce(
    (acc: number, line: string[]) =>
      acc + calculateResultsPartOne(line[0], line[1]),
    0
  );

const solvePartTwo: Function = (input: string[][]) =>
  input.reduce(
    (acc: number, line: string[]) =>
      acc + calculateResultsPartTwo(line[0], line[1]),
    0
  );

const main: Function = async () => {
  try {
    const input: string[] | undefined = await getInput(
      "../../src/day2/input.txt"
    );
    const formattedInput: string[][] = formatInput(input);

    const partOneSolution: number = solvePartOne(formattedInput);
    const partTwoSolution: number = solvePartTwo(formattedInput);

    console.log(`Solution for part one: ${partOneSolution}.`);
    console.log(`Solution for part two: ${partTwoSolution}.`);
  } catch (err) {
    console.error(err);
  }
};

main();
