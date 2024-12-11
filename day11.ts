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
  computations: Map<number, number | number[]>,
): number {
  if (steps === 0) {
    return 1;
  }
  const foundEl = computations.get(element);
  if (!foundEl) {
    if (element === 0) {
      return computeChanges(1, steps - 1, computations);
    } else if (element.toString().length % 2 === 0) {
      const firstHalf = parseInt(
        element.toString().slice(0, element.toString().length / 2),
      );
      const secondHalf = parseInt(
        element.toString().slice(element.toString().length / 2),
      );
      computations.set(element, [firstHalf, secondHalf]);
      return computeChanges(firstHalf, steps - 1, computations) +
        computeChanges(secondHalf, steps - 1, computations);
    } 
    const result = element * 2024;
    computations.set(element, result);
    return computeChanges(
      result,
      steps - 1,
      computations,
    );
  } else {
    if (Array.isArray(foundEl)) {
      return computeChanges(foundEl[0], steps - 1, computations) +
        computeChanges(foundEl[1], steps - 1, computations);
    } else {
      return computeChanges(foundEl, steps -1, computations);
    }
  }
}

function part2(elements: string[], blinks: number): number {
  const map = new Map<number, number | number[]>();
  let result = 0;
  elements.forEach(el => {
    result += computeChanges(parseInt(el), blinks, map);
    console.log(result);
  })
  return result;
}

export async function showResultsDay11() {
  const file = await Deno.readTextFile("inputs/day11.test.txt");
  const elements = file.split(" ");

  const resultPart1 = part1(elements, 25);
  const resultPart2 = part2(elements, 75);
  console.log("Day 11");
  console.log("--------");
  console.log(`Result part1: ${resultPart1}`);
  console.log(`Result part2: ${resultPart2}`);
  console.log("--------");
}
