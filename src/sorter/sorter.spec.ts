import { Sorter, UnimplementedError } from "./sorterbase";
import { QuickSort } from "./quicksort";
import { BubbleSort } from "./bubblesort";

/* eslint  @typescript-eslint/no-explicit-any: 0 */
const _s = (v: any[]) => {
  return (JSON.stringify(v));
};

describe("Test Sorter Base", () => {
  test("sort method throws UninplementedError.", () => {
    const so = new Sorter([1, 2, 3]);

    expect(() => { 
      so.sort();
    }).toThrow(UnimplementedError);
  });

  test("_takeSnapshot method updates snapshots property.", () => {
    const expected = [
      [
        {n: 1, tag: ""},
        {n: 2, tag: ""},
        {n: 3, tag: ""},
      ],
      [
        {n: 1, tag: "tag test"},
        {n: 2, tag: ""},
        {n: 3, tag: "test"},
      ],
      [
        {n: 1, tag: ""},
        {n: 2, tag: "dummy"},
        {n: 3, tag: ""},
      ],
      [
        {n: 1, tag: ""},
        {n: 2, tag: ""},
        {n: 3, tag: ""},
      ]
    ];

    const so = new Sorter([1 ,2, 3]);
    so["_takeSnapshot"]([]);
    so["_takeSnapshot"]([[0, "tag"], [2, "test"], [0, "test"]]);
    so["_takeSnapshot"]([[1, "dummy"], [undefined, "dummy"], [null, "dummy"]]);
    so["_takeSnapshot"]([]);

    expect(_s(so.snapshots)).toBe(_s(expected));
  });

  test("_swap method swaps two elements in _data array.", () => {
    const input = [1, 2, 3];
    const expected = [3, 2, 1];
    const so = new Sorter(input);
    so["_swap"](0, 2);
    expect(_s(so["_data"])).toBe(_s(expected));
  });
});

describe.each([
  [QuickSort.algorithmName, QuickSort],
  [BubbleSort.algorithmName, BubbleSort]
])("Test %s Implementations", (_, SorterType) => {
  test.each([
    [[4, 10, 1, 7, 6, 8, 2, 9, 3, 5], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
    [[3, 2, 1, 0, -1, -2], [-2, -1, 0, 1, 2, 3]],
    [[9, 0, -5, 80, 70283, 1293, 22, -1, 236, 0, -5, -81671], [-81671, -5, -5, -1, 0, 0, 9, 22, 80, 236, 1293, 70283]],
    [[-1, -100, -10], [-100, -10, -1]],
    [[1000, 5], [5, 1000]],
    [[1], [1]],
    [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
    [[], []],
  ])(`%j should be sorted to %j.`, (input, expected) => {
    const qs = new SorterType(input);
    qs.sort();
    
    expect(_s(qs.result)).toBe(_s(expected));
  });
});
