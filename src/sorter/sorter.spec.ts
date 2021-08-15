import { Sorter, UnimplementedError } from "./sorterbase";
import { QuickSort } from "./quicksort";

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

    expect(JSON.stringify(so.snapshots)).toBe(JSON.stringify(expected));
  });
});

describe.each([
  [[4, 10, 1, 7, 6, 8, 2, 9, 3, 5], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
  [[3, 2, 1, 0, -1, -2], [-2, -1, 0, 1, 2, 3]],
  [[9, 0, -5, 80, 70283, 1293, 22, -1, 236, 0, -5, -81671], [-81671, -5, -5, -1, 0, 0, 9, 22, 80, 236, 1293, 70283]],
  [[-1, -100, -10], [-100, -10, -1]],
  [[1000, 5], [5, 1000]],
  [[1], [1]],
  [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
  [[], []],
])("Test Sorter Implementations", (input, expected) => {
  test(`QuickSort: ${JSON.stringify(input)} should be sorted to ${JSON.stringify(expected)}.`, () => {
    const qs = new QuickSort(input);
    qs.sort();
    
    expect(JSON.stringify(qs.result)).toBe(JSON.stringify(expected));
  });
});
