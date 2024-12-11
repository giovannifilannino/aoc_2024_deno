function getChecksum(disk: string[]): number {
  return disk.reduce(
    (a, b, i) => a + (isNaN(parseInt(b)) ? 0 : parseInt(b)) * i,
    0,
  );
}

function part1(content: string[]): number {
  const defragmentingDisk: string[] = [...content];

  let emptyIndex = defragmentingDisk.indexOf(".");
  let lastIndex = defragmentingDisk.length - 1;

  while (emptyIndex !== -1 && lastIndex !== 0 && emptyIndex <= lastIndex) {
    while (defragmentingDisk[lastIndex] === ".") {
      lastIndex--;
    }

    defragmentingDisk[emptyIndex] = defragmentingDisk[lastIndex];
    defragmentingDisk[lastIndex] = ".";

    emptyIndex = defragmentingDisk.indexOf(".");
    lastIndex--;
  }

  const result = defragmentingDisk;
  return getChecksum(result);
}

function part2(content: string[][]): number {
  let defragmentingDisk: string[][] = [...content];

  let cursor = defragmentingDisk.length - 1;

  while (cursor >= 0) {
    if (defragmentingDisk[cursor].includes(".")) {
      cursor--;
      continue;
    }

    const emptyIndex = defragmentingDisk.findIndex(
      (x, i) =>
        i < cursor && x.includes(".") &&
        x.length >= defragmentingDisk[cursor].length,
    );

    if (emptyIndex === -1) {
      cursor--;
      continue;
    }

    const diff = defragmentingDisk[emptyIndex].length -
      defragmentingDisk[cursor].length;

    defragmentingDisk[emptyIndex] = [...defragmentingDisk[cursor]];
    defragmentingDisk[cursor] = Array(defragmentingDisk[cursor].length).fill(
      ".",
    );

    if (diff !== 0) {
      defragmentingDisk = [
        ...defragmentingDisk.slice(0, emptyIndex + 1),
        Array(diff).fill("."),
        ...defragmentingDisk.slice(emptyIndex + 1),
      ];
      cursor++;
    }

    cursor--;
  }

  return getChecksum(defragmentingDisk.flat());
}

function convertStringToMapMemory(content: string): string[][] {
  const chunkyDisk: string[][] = content
    .split("")
    .map((x, i) =>
      Array(parseInt(x)).fill(i % 2 === 0 ? Math.floor(i / 2) : ".")
    );
  return chunkyDisk;
}

export async function showResultsDay09() {
  const file = await Deno.readTextFile("inputs/day09.txt");
  const content = convertStringToMapMemory(file);

  const resultPart1 = part1(content.flat());
  const resultPart2 = part2(content);
  console.log("Day 09");
  console.log("--------");
  console.log(`Result part1: ${resultPart1}`);
  console.log(`Result part2: ${resultPart2}`);
  console.log("--------");
}
