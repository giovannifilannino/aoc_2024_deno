function part1(firstList: number[], secondList: number[]) {
  const sorted_first_list = firstList.sort();
  const sorted_second_list = secondList.sort();
  let part1_result = 0;
  for (let i = 0; i < sorted_first_list.length; i++) {
    part1_result += Math.abs(sorted_first_list[i] - sorted_second_list[i]);
  }
  return part1_result;
}

function part2(first_list: number[], resultsMap: Map<number, number>): number {
  return first_list.map((v) => v * (resultsMap.get(v) ?? 0)).reduce(
    (a, b) => a + b,
    0,
  );
}

export async function showResultsDay01() {
  const test_file = await Deno.readTextFile("inputs/day01.txt");
  const lines = test_file.split("\n");
  const firstList: number[] = [];
  const secondList: number[] = [];
  const resultsMap = new Map<number, number>();
  lines.filter((l) => l).forEach((l) => {
    const cols = l.split(" ").filter((s) => s.length > 0);
    const secondNumber = Number.parseInt(cols[1]);
    const mapSecondNumber = resultsMap.get(secondNumber);
    if (mapSecondNumber) {
      resultsMap.set(secondNumber, mapSecondNumber + 1);
    } else {
      resultsMap.set(secondNumber, 1);
    }
    firstList.push(Number.parseInt(cols[0]));
    secondList.push(secondNumber);
  });

  const resultPart1 = part1(firstList, secondList);
  const resultPart2 = part2(firstList, resultsMap);

  console.log("Day01");
  console.log("---------");
  console.log(`Result part1: ${resultPart1}`);
  console.log(`Result part2: ${resultPart2}`);
  console.log("---------");
}
