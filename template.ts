function part1(): number {
  return 0;
}

function part2(): number {
  return 0;
}

export async function showResultsDay0X() {
  const file = await Deno.readTextFile("inputs/day0X.txt");
  const lines = file.split("\n");

  const resultPart1 = part1();
  const resultPart2 = part2();
  console.log("Day 0X");
  console.log("--------");
  console.log(`Result part1: ${resultPart1}`);
  console.log(`Result part2: ${resultPart2}`);
  console.log("--------");
}
