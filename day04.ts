const XMAS = "XMAS";

function part1(lines: string[]): number {
  let xmas = 0;
  lines.forEach((line, index) => {
    const lineSplit = line.split("");
    console.log(line);
    lineSplit.forEach((char, charIndex) => {
      if (char === "X") {
        const foundHorizontally = checkHorizontal(lineSplit, charIndex);
        const foundVertifcally = checkVertical(lines, index, charIndex);
        const foundDiagonally = checkDiagonal(lines, index, charIndex);
        xmas += foundHorizontally;
        xmas += foundVertifcally;
        xmas += foundDiagonally;
        console.log(
          `(${index}, ${charIndex})`,
          foundDiagonally,
          foundVertifcally,
          foundHorizontally,
        );
      }
    });
  });
  return xmas;
}

function checkHorizontal(lines: string[], index: number): number {
  let found = 0;
  let right = "";
  let left = "";

  if (index + 3 < lines.length) {
    right = lines[index] + lines[index + 1] + lines[index + 2] +
      lines[index + 3];
  }
  if (index - 3 >= 0) {
    left = lines[index] + lines[index - 1] + lines[index - 2] +
      lines[index - 3];
  }
  found += XMAS === right ? 1 : 0;
  found += XMAS === left ? 1 : 0;
  return found;
}

function checkVertical(
  lines: string[],
  index: number,
  charIndex: number,
): number {
  let found = 0;
  let top = "";
  let bottom = "";
  if (index + 3 < lines.length) {
    top = lines[index][charIndex] + lines[index + 1][charIndex] +
      lines[index + 2][charIndex] +
      lines[index + 3][charIndex];
  }
  if (index - 3 >= 0) {
    bottom = lines[index][charIndex] + lines[index - 1][charIndex] +
      lines[index - 2][charIndex] + lines[index - 3][charIndex];
  }
  found += XMAS === top ? 1 : 0;
  found += XMAS === bottom ? 1 : 0;

  return found;
}

function checkDiagonal(lines: string[], index: number, charIndex: number) {
  let found = 0;
  let topRight = "";
  let topLeft = "";
  let bottomRight = "";
  let bottomLeft = "";
  if (charIndex + 3 < lines[index].length && index + 3 < lines.length) {
    topRight = lines[index][charIndex] + lines[index + 1][charIndex + 1] +
      lines[index + 2][charIndex + 2] + lines[index + 3][charIndex + 3];
  }
  if (charIndex - 3 >= 0 && index + 3 < lines.length) {
    topLeft = lines[index][charIndex] + lines[index + 1][charIndex - 1] +
      lines[index + 2][charIndex - 2] + lines[index + 3][charIndex - 3];
  }
  if (charIndex + 3 < lines[index].length && index - 3 >= 0) {
    bottomRight = lines[index][charIndex] +
      lines[index - 1][charIndex + 1] + lines[index - 2][charIndex + 2] +
      lines[index - 3][charIndex + 3];
  }
  if (charIndex - 3 >= 0 && index - 3 >= 0) {
    bottomLeft = lines[index][charIndex] +
      lines[index - 1][charIndex - 1] + lines[index - 2][charIndex - 2] +
      lines[index - 3][charIndex - 3];
  }
  found += XMAS === topRight ? 1 : 0;
  found += XMAS === topLeft ? 1 : 0;
  found += XMAS === bottomRight ? 1 : 0;
  found += XMAS === bottomLeft ? 1 : 0;
  return found;
}

function part2(): number {
  return 0;
}

export async function showResultsDay04() {
  const file = await Deno.readTextFile("inputs/day04.txt");
  const lines = file.split("\n");

  const resultPart1 = part1(lines);
  const resultPart2 = part2();
  console.log("Day 04");
  console.log("--------");
  console.log(`Result part1: ${resultPart1}`);
  console.log(`Result part2: ${resultPart2}`);
  console.log("--------");
}
