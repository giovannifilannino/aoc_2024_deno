function part1(
  orderingRule: Map<number, number[]>,
  pageToProduce: number[][],
): number {
  return pageToProduce.filter((page) => {
    let isOrdered = true;
    for (let i = page.length - 1; i > 0 && isOrdered; i--) {
      isOrdered = checkOrdering(page[i], page.slice(0, i), orderingRule);
    }
    return isOrdered;
  }).map((page) => {
    const middle = Math.floor(page.length / 2);
    return page[middle];
  }).reduce((acc, current) => acc + current, 0);
}

function checkOrdering(
  numberToCheck: number,
  restOfArray: number[],
  rules: Map<number, number[]>,
) {
  let result = true;
  const numbersAfterNumberToCheck = rules.get(numberToCheck);
  for (let i = 0; i < restOfArray.length && result; i++) {
    if (numbersAfterNumberToCheck?.includes(restOfArray[i])) {
      result = false;
    }
  }
  return result;
}

function part2(
  orderingRule: Map<number, number[]>,
  pageToProduce: number[][],
): number {
  return pageToProduce.filter((page) => {
    let isOrdered = true;
    for (let i = page.length - 1; i > 0 && isOrdered; i--) {
      isOrdered = checkOrdering(page[i], page.slice(0, i), orderingRule);
    }
    return !isOrdered;
  }).map((page) => {
    page.sort((a, b) => {
      const numbersAfterA = orderingRule.get(a);
      const numberAfterB = orderingRule.get(b);
      if (numbersAfterA?.includes(b)) {
        return -1;
      } else if (numberAfterB?.includes(a)) {
        return 1;
      }
      return 0;
    });
    return page;
  }).map((page) => {
    const middle = Math.floor(page.length / 2);
    return page[middle];
  }).reduce((acc, current) => acc + current, 0);
}

export async function showResultsDay05() {
  const file = await Deno.readTextFile("inputs/day05.txt");
  const lines = file.split("\n");
  const orderingRule = new Map<number, number[]>();
  const pageToProduce: number[][] = [];
  lines.forEach((line) => {
    if (line.indexOf("|") >= 0) {
      const [page, rule] = line.split("|");
      if (orderingRule.get(Number.parseInt(page)) !== undefined) {
        const currentRules = orderingRule.get(Number.parseInt(page));
        orderingRule.set(Number.parseInt(page), [
          ...currentRules!,
          Number.parseInt(rule),
        ]);
      } else {
        orderingRule.set(Number.parseInt(page), [Number.parseInt(rule)]);
      }
    } else {
      if (line) {
        pageToProduce.push(
          line.split(",").map((number) => Number.parseInt(number)),
        );
      }
    }
  });
  const resultPart1 = part1(orderingRule, pageToProduce);
  const resultPart2 = part2(orderingRule, pageToProduce);
  console.log("Day 05");
  console.log("--------");
  console.log(`Result part1: ${resultPart1}`);
  console.log(`Result part2: ${resultPart2}`);
  console.log("--------");
}
