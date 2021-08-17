import { Sorter } from "./sorterbase";
import { QuickSort } from "./quicksort";
import { BubbleSort } from "./bubblesort";
import { randomize } from "./rendomize";
import { conf } from "../visualizer";

export const availableAlgoNames = [
  QuickSort.algorithmName,
  BubbleSort.algorithmName
];

type Request = {
  algoName: string;
  numElements: number;
};

export const createSorter = (req: Request): Sorter => {
  if (req.numElements < conf.MIN_NUM_ELEMENTS || req.numElements > conf.MAX_NUM_ELEMENTS) {
    throw RangeError(
      `The number of elements must be within the range of ${conf.MIN_NUM_ELEMENTS} - ${conf.MAX_NUM_ELEMENTS}`
    );
  }
  const randomized = randomize(req.numElements);
  if (req.algoName === QuickSort.algorithmName) {
    return new QuickSort(randomized);
  }
  if (req.algoName === BubbleSort.algorithmName) {
    return new BubbleSort(randomized);
  }

  throw new InvalidAlgorithmNameError(
    `Algorithm named "${req.algoName}" is not available.`
  );
};

export class InvalidAlgorithmNameError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidAlgorithmNameError.prototype);
  }
}
