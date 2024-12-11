type Point = {
  x: number;
  y: number;
};

function distancePoints(firstPoint: Point, secondPoint: Point): Point {
  const x = Math.abs(firstPoint.x - secondPoint.x);
  const y = Math.abs(firstPoint.y - secondPoint.y);
  return { x, y };
}

function isInMap(point: Point, width: number, height: number): boolean {
  return point.x >= 0 && point.x < width && point.y >= 0 && point.y < height;
}

function pointIsInArray(array: Point[], point: Point): boolean {
  return !!array.find((p) => p.x === point.x && p.y === point.y);
}

function getAntinode(
  point: Point,
  secondPoint: Point,
  distance: Point,
): Point {
  const y = point.y < secondPoint.y
    ? point.y - distance.y
    : point.y + distance.y;
  const x = point.x > secondPoint.x
    ? point.x + distance.x
    : point.x - distance.x;
  return { x, y };
}

function getAntinodes(
  point: Point,
  secondPoint: Point,
  distance: Point,
  width: number,
  height: number,
) {
  let isOut = false;
  const antinodes: Point[] = [];
  let currentPoint = point;
  while (!isOut) {
    const antinode = getAntinode(currentPoint, secondPoint, distance);
    if (isInMap(antinode, width, height)) {
      currentPoint = antinode;
      antinodes.push(antinode);
    } else {
      isOut = true;
    }
  }
  return antinodes;
}

function part1(
  mapAntennas: Map<string, Point[]>,
  width: number,
  height: number,
): Point[] {
  const antinodes: Point[] = [];
  for (const key of mapAntennas.keys()) {
    const points = mapAntennas.get(key);
    if (points) {
      for (let i = 0; i < points.length - 1; i++) {
        for (let j = 1; j < points.length; j++) {
          const firstPoint = points[i];
          const secondPoint = points[j];
          if (
            firstPoint.x !== secondPoint.x || secondPoint.y !== firstPoint.y
          ) {
            const distance = distancePoints(firstPoint, secondPoint);
            const firstAntenna = getAntinode(
              firstPoint,
              secondPoint,
              distance,
            );
            const secondAntenna = getAntinode(
              secondPoint,
              firstPoint,
              distance,
            );
            if (isInMap(firstAntenna, width, height)) {
              if (!pointIsInArray(antinodes, firstAntenna)) {
                antinodes.push(firstAntenna);
              }
            }
            if (isInMap(secondAntenna, width, height)) {
              if (!pointIsInArray(antinodes, secondAntenna)) {
                antinodes.push(secondAntenna);
              }
            }
          }
        }
      }
    }
  }
  return antinodes;
}

function part2(
  mapAntennas: Map<string, Point[]>,
  width: number,
  height: number,
): Point[] {
  const antinodes: Point[] = [];
  const antennas = getAntennaAntinodes(mapAntennas);
  for (const key of mapAntennas.keys()) {
    const points = mapAntennas.get(key);
    if (points) {
      for (let i = 0; i < points.length - 1; i++) {
        for (let j = 1; j < points.length; j++) {
          const firstPoint = points[i];
          const secondPoint = points[j];
          if (
            firstPoint.x !== secondPoint.x || secondPoint.y !== firstPoint.y
          ) {
            const distance = distancePoints(firstPoint, secondPoint);
            const antinodesFirst = getAntinodes(
              firstPoint,
              secondPoint,
              distance,
              width,
              height,
            );
            const antinodesSecond = getAntinodes(
              secondPoint,
              firstPoint,
              distance,
              width,
              height,
            );
            const newAntinodes = [...antinodesFirst, ...antinodesSecond].filter(
              (antinode) =>
                !antinodes.find((an) =>
                  an.x === antinode.x && antinode.y === an.y
                ) && !antennas.find((an) =>
                  an.x === antinode.x && antinode.y === an.y
                ),
            );
            antinodes.push(...newAntinodes);
          }
        }
      }
    }
  }
  return antinodes;
}

function getMapAntennas(lines: string[]): Map<string, Point[]> {
  const map = new Map<string, Point[]>();
  lines.forEach((line, lineIndex) => {
    line.split("").forEach((char, charIndex) => {
      if (char !== ".") {
        if (!map.get(char)) {
          map.set(char, [{ x: charIndex, y: lineIndex }]);
        } else {
          const points = map.get(char)!;
          map.set(char, [...points, { x: charIndex, y: lineIndex }]);
        }
      }
    });
  });
  return map;
}

function getAntennaAntinodes(map: Map<string, Point[]>): Point[] {
  const antennas: Point[] = [];
  for (const key of map.keys()) {
    if (map.get(key)!.length > 1) {
      antennas.push(...map.get(key)!);
    }
  }
  return antennas;
}

function debugMap(lines: string[], antinodes: Point[]) {
  lines.forEach((line, lineIndex) => {
    let linePrint = "";
    line.split("").forEach((char, charIndex) => {
      if (
        char === "." &&
        antinodes.find((anti) => anti.x === charIndex && anti.y === lineIndex)
      ) {
        linePrint += "#";
      } else {
        linePrint += char;
      }
    });
    console.log(linePrint);
  });
}

export async function showResultsDay08() {
  const file = await Deno.readTextFile("inputs/day08.txt");
  const lines = file.split("\n");
  const mapAntennas = getMapAntennas(lines);
  const width = lines[0].length;
  const height = lines.length;
  const antennas = getAntennaAntinodes(mapAntennas).length;

  const resultPart1 = part1(mapAntennas, width, height);
  const resultPart2 = part2(mapAntennas, width, height);
  console.log("Day 08");
  console.log("--------");
  console.log(`Result part1: ${resultPart1.length}`);
  console.log(`Result part2: ${resultPart2.length + antennas}`);
  console.log("--------");
}
