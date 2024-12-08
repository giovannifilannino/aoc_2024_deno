type Operator = "+" | "*";

type Operation = {
  result: number;
  elements: number[];
};

function concatenation(first: number, second: number) {
  return Number(`${first}${second}`);
}

function isValidOperation(
  result: number,
  currentNumber: number,
  remainingNumber: number[],
): boolean {
  if (remainingNumber.length === 0) {
    return currentNumber === result;
  }
  const nextNumber = remainingNumber[0];
  const restNumbers = remainingNumber.slice(1);

  return (
    isValidOperation(result, currentNumber + nextNumber, restNumbers) ||
    isValidOperation(result, currentNumber * nextNumber, restNumbers)
  );
}

function isValidOperationWithConcatenation(
  result: number,
  currentNumber: number,
  remainingNumber: number[],
): boolean {
  if (remainingNumber.length === 0) {
    return currentNumber === result;
  }
  const nextNumber = remainingNumber[0];
  const restNumbers = remainingNumber.slice(1);

  return (
    isValidOperationWithConcatenation(
      result,
      currentNumber + nextNumber,
      restNumbers,
    ) ||
    isValidOperationWithConcatenation(
      result,
      currentNumber * nextNumber,
      restNumbers,
    ) ||
    isValidOperationWithConcatenation(
      result,
      concatenation(currentNumber, nextNumber),
      restNumbers,
    )
  );
}

function part1(operations: Operation[]): number {
  return operations.filter((op) =>
    isValidOperation(op.result, op.elements[0], op.elements.slice(1))
  ).reduce(
    (acc, operation) => acc + operation.result,
    0,
  );
}

function part2(operations: Operation[]): number {
  return operations.filter((op) =>
    isValidOperationWithConcatenation(
      op.result,
      op.elements[0],
      op.elements.slice(1),
    )
  ).reduce(
    (acc, operation) => acc + operation.result,
    0,
  );
}

function getOperations(lines: string[]): Operation[] {
  return lines.filter((line) => line).map((line) => {
    const [result, elements] = line.split(":");
    const elementsArray = elements.split(" ").map(Number).filter((el) =>
      !isNaN(el) && el > 0
    );
    return ({ result: Number(result), elements: elementsArray });
  });
}

export async function showResultsDay07() {
  const file = await Deno.readTextFile("inputs/day07.txt");
  const lines = file.split("\n");
  const operations = getOperations(lines);

  const resultPart1 = part1(operations);
  const resultPart2 = part2(operations);
  console.log("Day 07");
  console.log("--------");
  console.log(`Result part1: ${resultPart1}`);
  console.log(`Result part2: ${resultPart2}`);
  console.log("--------");
}
