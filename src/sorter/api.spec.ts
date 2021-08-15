import { createSorter, InvalidAlgorithmNameError } from "./api";
import { QuickSort } from "./quicksort";
import { conf } from "../visualizer";

describe("Test createSorter", () => {
  test.each([
    QuickSort.algorithmName
  ])("Can create %s instance.", (algoName) => {
    const numElements = 1;
    const sorter = createSorter({
      algoName,
      numElements
    });

    expect(sorter instanceof QuickSort).toBe(true);
  });

  test("Throws error when undefined algo name is specified.", () => {
    const algoName = "undefined algo name";
    const numElements = 1;
    
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
