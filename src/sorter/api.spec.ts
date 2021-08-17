import { createSorter, InvalidAlgorithmNameError } from "./api";
import { Sorter } from "./sorterbase";
import { QuickSort } from "./quicksort";
import { BubbleSort } from "./bubblesort";
import { conf } from "../visualizer";

describe("Test createSorter", () => {
  test.each([
    QuickSort.algorithmName,
    BubbleSort.algorithmName
  ])("Can create %s instance.", (algoName) => {
    const numElements = conf.MIN_NUM_ELEMENTS;
    const sorter = createSorter({
      algoName,
      numElements
    });

    expect(sorter instanceof Sorter).toBe(true);
  });

  test("Throws error when undefined algo name is specified.", () => {
    const algoName = "undefined algo name";
    const numElements = conf.MIN_NUM_ELEMENTS;
    
    expect(() => {
      createSorter({
        algoName,
        numElements
      });
    }).toThrow(InvalidAlgorithmNameError);
  });

  test("Throws error when invalid value is specified for numElements.", () => {    
    const algoName = QuickSort.algorithmName;
    expect(() => {
      createSorter({
        algoName,
        numElements: 0
      });
    }).toThrow(RangeError);

    expect(() => {
      createSorter({
        algoName,
        numElements: -1
      });
    }).toThrow(RangeError);

    expect(() => {
      createSorter({
        algoName,
        numElements: conf.MAX_NUM_ELEMENTS + 1
      });
    }).toThrow(RangeError);
  });
});
