import { Sorter } from "./sorterbase";
import { QuickSort } from "./quicksort";
import { randomize } from "./rendomize";

const quick = "Quick Sort";
const bubble = "Bubble Sort";
export const availableAlgoNames = [quick, bubble];

type Request = {
  algoName: string;
  numElements: number;
};

export const createSorter = (req: Request): Sorter => {
  const randomized = randomize(req.numElements);
  if (req.algoName === quick) {
    return new QuickSort(randomized);
  }
  if(req.algoName === bubble) {
    return new Sorter(randomized);
  }

  throw new SorterNotFoundError(
    `Implementation for "${req.algoName}" was not found.`
  );
};

export class SorterNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, SorterNotFoundError.prototype);
  }
}
