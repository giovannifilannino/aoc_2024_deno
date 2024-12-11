function generateUpdatedArray(elements: string[]): string[] {
  return elements.map((el) => {
    if (el === "0") {
      return "1";
    } else if (el.length % 2 === 0) {
      const firstHalf = el.slice(0, el.length / 2);
      const secondHalf = el.slice(el.length / 2);
      const result = [
        parseInt(firstHalf).toString(),
        parseInt(secondHalf).toString(),
      ];
      return result;
    } else {
      const result = (parseInt(el) * 2024).toString();
      return result;
    }
  }).flat();
}

function part1(elements: string[], blinks: number): number {
  let updatedArray = [...elements];
  for (let i = 0; i < blinks; i++) {
    updatedArray = generateUpdatedArray(updatedArray);
  }
  return updatedArray.length;
}

function computeChanges(
  element: number,
  steps: number,
  cache = new Map<number, number | number[]>(),
): number {
  if (steps <= 0) {
    return 1;
  }
  const foundEl = cache.get(element);
  if (!foundEl) {
    if (element === 0) {
      return computeChanges(1, steps - 1, cache);
    } else if (element.toString().length % 2 === 0) {
      const firstHalf = parseInt(
        element.toString().slice(0, element.toString().length / 2),
      );
      const secondHalf = parseInt(
        element.toString().slice(element.toString().length / 2),
      );
      cache
        .set(element, [firstHalf, secondHalf]);
      return computeChanges(firstHalf, steps - 1, cache) +
        computeChanges(secondHalf, steps - 1, cache);
    }
    const result = element * 2024;
    cache
      .set(element, result);
    return computeChanges(
      result,
      steps - 1,
      cache,
    );
  } else {
    if (Array.isArray(foundEl)) {
      return computeChanges(foundEl[0], steps - 1, cache) +
        computeChanges(foundEl[1], steps - 1, cache);
    } else {
      return computeChanges(foundEl, steps - 1, cache);
    }
  }
}

function part2(elements: string[], blinks: number): number {
  let result = 0;
  elements.forEach((el) => {
    result += computeChanges(parseInt(el), blinks);
  });
  return result;
}

export async function showResultsDay11() {
  const file = await Deno.readTextFile("inputs/day11.txt");
  const elements = file.split(" ");

  const resultPart1 = part2(elements, 25);
  const resultPart2 = part2(elements, 75);
  console.log("Day 11");
  console.log("--------");
  console.log(`Result part1: ${resultPart1}`);
  console.log(`Result part2: ${resultPart2}`);
  console.log("--------");
}
