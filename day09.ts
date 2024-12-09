function getChecksum(disk: string[]): number {
  return disk.reduce((a, b, i) => a + (isNaN(parseInt(b)) ? 0 : parseInt(b)) * i, 0);
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

function part2(): number {
  return 0;
}

function convertStringToMapMemory(content: string): string[] {
  const chunkyDisk: string[][] = content 
  .split("")
  .map((x, i) => Array(parseInt(x)).fill(i % 2 === 0 ? Math.floor(i / 2) : "."));

  return chunkyDisk.flat();
}

export async function showResultsDay09() {
  const file = await Deno.readTextFile("inputs/day09.txt");
  const content = convertStringToMapMemory(file);

  const resultPart1 = part1(content);
  const resultPart2 = part2();
  console.log("Day 09");
  console.log("--------");
  console.log(`Result part1: ${resultPart1}`);
  console.log(`Result part2: ${resultPart2}`);
  console.log("--------");
}
