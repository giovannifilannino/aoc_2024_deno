const regex = new RegExp(`mul\\(\\d{1,3},\\d{1,3}\\)`, "g");
const numberRegex = new RegExp("(\\d)+", "g");
const regex2 = new RegExp(`(do|don't)\\(\\)|mul\\(\\d{1,3},\\d{1,3}\\)`, "g");

function part1(content: string): number {
  const result = content.matchAll(regex);
  return result.map((mul) => {
    const numbers = mul.toString().matchAll(numberRegex);
    return numbers.reduce((a, b) => a * Number.parseInt(b.toString()), 1);
  }).reduce((a, b) => a + b);
}

function part2(content: string): number {
  const result = content.matchAll(regex2);
  let stop = false;
  return result.map((mul) => {
    if (mul.toString().indexOf(`don't`) >= 0) {
      stop = true;
    } else if (mul.toString().indexOf(`do()`) >= 0) {
      stop = false;
    } else {
      if (!stop) {
        const numbers = mul.toString().matchAll(numberRegex);
        return numbers.reduce((a, b) => a * Number.parseInt(b.toString()), 1);
      }
    }
    return undefined;
  }).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
}

export async function showResultsDay03() {
  const file = await Deno.readTextFile("inputs/day03.txt");
  const resultPart1 = part1(file);
  const resultPart2 = part2(file);
  console.log("Day 03");
  console.log("--------");
  console.log(`Result part1: ${resultPart1}`);
  console.log(`Result part2: ${resultPart2}`);
  console.log("--------");
}
