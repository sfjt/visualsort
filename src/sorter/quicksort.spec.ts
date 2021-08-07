import { QuickSort } from "./quicksort";

describe("Test QuickSort: ", () => {
  test.each([
    [[3, 2, 1, 0, -1, -2], [-2, -1, 0, 1, 2, 3]],
    [[9, 0, -5, 80, 70283, 1293, 22, -1, 236, 0, -5, -81671], [-81671, -5, -5, -1, 0, 0, 9, 22, 80, 236, 1293, 70283]],
    [[-1, -100, -10], [-100, -10, -1]],
    [[1000, 5], [5, 1000]],
    [[1], [1]],
    [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
    [[], []],
  ])("%#. Input value %j\n\tshould be quicksorted to %j", (input, expected) => {
    const qs = new QuickSort(input);
    qs.sort();
    
    expect(JSON.stringify(qs.result)).toBe(JSON.stringify(expected));
  });
});
