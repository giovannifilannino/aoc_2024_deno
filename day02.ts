enum LineStatus {
  IDLE,
  ASC,
  DESC,
}

function isLineSafe(line: string, fallback: boolean): boolean {
  let isSafe = true;
  let status: LineStatus = LineStatus.IDLE;
  let currentValue: number;
  const values = line.split(" ").filter((x) => x.length > 0);
  values.forEach((v) => {
    const parsedValue = Number.parseInt(v);
    if (currentValue === undefined) {
      currentValue = parsedValue;
    } else {
      if (currentValue < parsedValue) {
        if (status === LineStatus.IDLE) {
          status = LineStatus.ASC;
        } else if (status === LineStatus.DESC) {
          isSafe = false;
        }
      } else if (currentValue > parsedValue) {
        if (status === LineStatus.IDLE) {
          status = LineStatus.DESC;
        } else if (status === LineStatus.ASC) {
          isSafe = false;
        }
      }

      const diff = Math.abs(currentValue - parsedValue);
      if (diff < 1 || diff > 3) {
        isSafe = false;
      }
    }
    currentValue = parsedValue;
  });
  if (fallback && !isSafe) {
    for (let i = 0; i < values.length; i++) {
      const arrayToProof = removeElementFromArray(values, i);
      const isThisSubArraySafe = isLineSafe(arrayToProof, false);
      if (isThisSubArraySafe) {
        return true;
      }
    }
  }
  return isSafe;
}

function removeElementFromArray(array: Array<string>, index: number) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (i === index) {
      continue;
    } else {
      newArray.push(array[i]);
    }
  }
  return newArray.join(" ");
}

function part1(lines: string[]): number {
  return lines.filter((line) => isLineSafe(line, false)).length;
}

function part2(lines: string[]): number {
  return lines.filter((line) => isLineSafe(line, true)).length;
}

export async function showResultsDay02() {
  const file = await Deno.readTextFile("inputs/day02.txt");
  const lines = file.split("\n");

  const resultPart1 = part1(lines);
  const resultPart2 = part2(lines);
  console.log("Day 02");
  console.log("---------");
  console.log(`Result part1: ${resultPart1}`);
  console.log(`Result part2: ${resultPart2}`);
  console.log("---------");
}
