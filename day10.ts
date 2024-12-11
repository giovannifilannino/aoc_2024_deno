const CORRECT_TRAIL = "0123456789";

type Point = {
  y: number;
  x: number;
};

function getNrOfTrails(
  currentPoint: Point,
  lines: string[],
  lastIndex: boolean,
  hikeTrail: string[] = [],
  memo: string[] = [],
): number {
  const currentChar = lines[currentPoint.y][currentPoint.x];
  if (currentChar != hikeTrail[hikeTrail.length - 1]) {
    hikeTrail.push(
      `${currentChar}:${currentPoint.x + 1}:${currentPoint.y + 1}`,
    );
  }
  const currentNumber = parseInt(currentChar);
  let topHikeTrail = 0;
  let bottomHikeTrail = 0;
  let leftHikeTrail = 0;
  let rightHikeTrail = 0;
  if (currentPoint.y - 1 >= 0) {
    const topNumber = lines[currentPoint.y - 1][currentPoint.x];
    if (parseInt(topNumber) === currentNumber + 1) {
      topHikeTrail = getNrOfTrails(
        { x: currentPoint.x, y: currentPoint.y - 1 },
        lines,
        lastIndex,
        [...hikeTrail],
        memo,
      );
    }
  }
  if (currentPoint.x - 1 >= 0) {
    const leftNumber = lines[currentPoint.y][currentPoint.x - 1];
    if (parseInt(leftNumber) === currentNumber + 1) {
      leftHikeTrail = getNrOfTrails(
        { x: currentPoint.x - 1, y: currentPoint.y },
        lines,
        lastIndex,
        [...hikeTrail],
        memo,
      );
    }
  }
  if (currentPoint.y + 1 < lines.length) {
    const bottomNumber = lines[currentPoint.y + 1][currentPoint.x];
    if (parseInt(bottomNumber) === currentNumber + 1) {
      bottomHikeTrail = getNrOfTrails(
        { x: currentPoint.x, y: currentPoint.y + 1 },
        lines,
        lastIndex,
        [...hikeTrail],
        memo,
      );
    }
  }
  if (currentPoint.x + 1 < lines[0].length) {
    const rigthNumber = lines[currentPoint.y][currentPoint.x + 1];
    if (parseInt(rigthNumber) === currentNumber + 1) {
      rightHikeTrail = getNrOfTrails(
        { x: currentPoint.x + 1, y: currentPoint.y },
        lines,
        lastIndex,
        [...hikeTrail],
        memo,
      );
    }
  }
  if (hikeTrail.length === 10) {
    const value = hikeTrail.map((el) => el.split(":")[0]).join("");
    const key = generateKey(hikeTrail, lastIndex);
    const isNew = !memo.includes(key);
    if (value === CORRECT_TRAIL && isNew) {
      memo.push(key);
      return 1;
    }
  }
  return bottomHikeTrail + topHikeTrail + leftHikeTrail + rightHikeTrail;
}

function generateKey(hikeTrail: string[], lastIndex: boolean): string {
  const coordinates = hikeTrail.map((el) => el.split(":").slice(1).join(":"));
  return lastIndex ? coordinates[coordinates.length - 1] : coordinates.join("");
}

function part1(heads: Point[], lines: string[]): number {
  let nrOfTrails = 0;
  for (const head of heads) {
    const trails = getNrOfTrails(head, lines, true);
    nrOfTrails += trails;
  }
  return nrOfTrails;
}

function part2(heads: Point[], lines: string[]): number {
  let nrOfTrails = 0;
  for (const head of heads) {
    const trails = getNrOfTrails(head, lines, false);
    nrOfTrails += trails;
  }
  return nrOfTrails;
}

function getTrailheads(lines: string[]) {
  const heads: Point[] = [];
  lines.forEach((line, lineIndex) => {
    line.split("").forEach((char, charIndex) => {
      if (char === "0") {
        heads.push({ x: charIndex, y: lineIndex });
      }
    });
  });
  return heads;
}

export async function showResultsDay10() {
  const file = await Deno.readTextFile("inputs/day10.txt");
  const lines = file.split("\n");
  const trailheads = getTrailheads(lines);

  const resultPart1 = part1(trailheads, lines);
  const resultPart2 = part2(trailheads, lines);
  console.log("Day 10");
  console.log("--------");
  console.log(`Result part1: ${resultPart1}`);
  console.log(`Result part2: ${resultPart2}`);
  console.log("--------");
}
