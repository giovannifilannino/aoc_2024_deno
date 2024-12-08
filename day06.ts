type Point = {
  x: number;
  y: number;
};

type Direction = "up" | "down" | "left" | "right";

function findObstacle(
  obstacles: Point[],
  currentPosition: Point,
  direction: Direction,
) {
  const foundObstacle = obstacles.filter((obstacle) => {
    if (direction === "up") {
      return obstacle.x === currentPosition.x && obstacle.y < currentPosition.y;
    } else if (direction === "down") {
      return obstacle.x === currentPosition.x && obstacle.y > currentPosition.y;
    } else if (direction === "left") {
      return obstacle.y === currentPosition.y &&
        obstacle.x < currentPosition.x;
    } else {
      return obstacle.y === currentPosition.y && obstacle.x > currentPosition.x;
    }
  });
  if (foundObstacle.length === 1) {
    return foundObstacle[0];
  } else {
    if (direction === "up") {
      return foundObstacle.sort((a, b) => b.y - a.y)[0];
    } else if (direction === "down") {
      return foundObstacle.sort((a, b) => a.y - b.y)[0];
    } else if (direction === "left") {
      return foundObstacle.sort((a, b) => b.x - a.x)[0];
    } else {
      return foundObstacle.sort((a, b) => a.x - b.x)[0];
    }
  }
}

function part1(
  guard: Point,
  obstacles: Point[],
  width: number,
  height: number,
): { visitedPoints: Set<string>; loop: boolean } {
  let currentPosition = guard;
  let direction: Direction = "up";
  const visitedPoints: Set<string> = new Set();
  const visistedPointsRepeable: string[] = [];
  let loop = false;
  visitedPoints.add(`${currentPosition.x},${currentPosition.y}`);
  while (currentPosition.x >= 0 && currentPosition.y >= 0 && !loop) {
    if (direction === "up") {
      const obstacle = findObstacle(obstacles, currentPosition, direction);
      if (obstacle) {
        for (let i = currentPosition.y; i > obstacle.y; i--) {
          visitedPoints.add(`${currentPosition.x},${i}`);
          if (
            visistedPointsRepeable.indexOf(
              `${currentPosition.x},${i}:${direction}`,
            ) >= 0
          ) {
            loop = true;
            break;
          } else {
            visistedPointsRepeable.push(
              `${currentPosition.x},${i}:${direction}`,
            );
          }
        }
        currentPosition = { x: currentPosition.x, y: obstacle.y + 1 };
        direction = "right";
      } else {
        for (let i = currentPosition.y; i >= 0; i--) {
          visitedPoints.add(`${currentPosition.x},${i}`);
        }
        currentPosition = { x: -1, y: -1 };
      }
    } else if (direction === "down") {
      const obstacle = findObstacle(obstacles, currentPosition, direction);

      if (obstacle) {
        for (let i = currentPosition.y; i < obstacle.y; i++) {
          visitedPoints.add(`${currentPosition.x},${i}`);
          if (
            visistedPointsRepeable.indexOf(
              `${currentPosition.x},${i}:${direction}`,
            ) >= 0
          ) {
            loop = true;
            break;
          } else {
            visistedPointsRepeable.push(
              `${currentPosition.x},${i}:${direction}`,
            );
          }
        }
        currentPosition = { x: currentPosition.x, y: obstacle.y - 1 };
        direction = "left";
      } else {
        for (let i = currentPosition.y; i < height - 1; i++) {
          visitedPoints.add(`${currentPosition.x},${i}`);
        }
        currentPosition = { x: -1, y: -1 };
      }
    } else if (direction === "right") {
      const obstacle = findObstacle(obstacles, currentPosition, direction);

      if (obstacle) {
        for (let i = currentPosition.x; i < obstacle.x; i++) {
          visitedPoints.add(`${i},${currentPosition.y}`);
          if (
            visistedPointsRepeable.indexOf(
              `${i},${currentPosition.y}:${direction}`,
            ) >= 0
          ) {
            loop = true;
            break;
          } else {
            visistedPointsRepeable.push(
              `${i},${currentPosition.y}:${direction}`,
            );
          }
        }
        currentPosition = { x: obstacle.x - 1, y: currentPosition.y };
        direction = "down";
      } else {
        for (let i = currentPosition.x; i < width - 1; i++) {
          visitedPoints.add(`${i},${currentPosition.y}`);
        }
        currentPosition = { x: -1, y: -1 };
      }
    } else {
      const obstacle = findObstacle(obstacles, currentPosition, direction);
      if (obstacle) {
        for (let i = currentPosition.x; i > obstacle.x; i--) {
          visitedPoints.add(`${i},${currentPosition.y}`);
          if (
            visistedPointsRepeable.indexOf(
              `${i},${currentPosition.y}:${direction}`,
            ) >= 0
          ) {
            loop = true;
            break;
          } else {
            visistedPointsRepeable.push(
              `${i},${currentPosition.y}:${direction}`,
            );
          }
        }
        direction = "up";
        currentPosition = { x: obstacle.x + 1, y: currentPosition.y };
      } else {
        for (let i = currentPosition.x; i >= 0; i--) {
          visitedPoints.add(`${i},${currentPosition.y}`);
        }
        currentPosition = { x: -1, y: -1 };
      }
    }
  }
  if (loop) {
    return { visitedPoints: new Set(), loop };
  }
  return { visitedPoints: visitedPoints, loop };
}

function part2(
  guard: Point,
  obstacles: Point[],
  routes: Set<string>,
  width: number,
  height: number,
): number {
  let possibleObstacle = 0;
  for (const route of routes) {
    const [x, y] = route.split(",").map(Number);
    if (
      (x !== guard.x || y !== guard.y)
    ) {
      const result = part1(guard, [...obstacles, { x, y }], width, height);
      if (result.loop) {
        possibleObstacle++;
      }
    }
  }
  return possibleObstacle;
}

export async function showResultsDay06() {
  const file = await Deno.readTextFile("inputs/day06.txt");
  const lines = file.split("\n");
  const obstacles: Array<Point> = [];
  let guard: Point = { x: 0, y: 0 };
  const width = lines[0].length;
  const height = lines.length;
  lines.forEach((line: string, lineIndex: number) => {
    line.split("").forEach((char, charIndex) => {
      if (char === "#") {
        obstacles.push({ x: charIndex, y: lineIndex });
      } else if (char === "^") {
        guard = { x: charIndex, y: lineIndex };
      }
    });
  });

  const { visitedPoints } = part1(guard, obstacles, width, height);
  // const resultPart2 = part2(guard, obstacles, visitedPoints, width, height); // TODO Improve part2
  console.log("Day 06");
  console.log("--------");
  console.log(`Result part1: ${visitedPoints.size}`);
  //console.log(`Result part2: ${resultPart2}`);
  console.log("--------");
}
