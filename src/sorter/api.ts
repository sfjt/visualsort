import { Sorter } from "./sorterbase";
import { QuickSort } from "./quicksort";
import { randomize } from "./rendomize";
import { conf } from "../visualizer";

export const availableAlgoNames = [QuickSort.algorithmName];

type Request = {
  algoName: string;
  numElements: number;
};

export const createSorter = (req: Request): Sorter => {
  if (req.numElements < 1 || req.numElements > conf.MAX_NUM_ELEMENTS) {
    throw RangeError(
      `The number of elements must be within the range of 1 - ${conf.MAX_NUM_ELEMENTS}`
    );
  }
  const randomized = randomize(req.numElements);
  if (req.algoName === QuickSort.algorithmName) {
    return new QuickSort(randomized);
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
