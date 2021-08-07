import { Sorter, UnimplementedError } from "./sorterbase";

describe("Test Sorter:", () => {
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

    const so = new Sorter([1 ,2, 3])
    so["_takeSnapshot"]([])
    so["_takeSnapshot"]([[0, "tag"], [2, "test"], [0, "test"]])
    so["_takeSnapshot"]([[1, "dummy"], [undefined, "dummy"], [null, "dummy"]])
    so["_takeSnapshot"]([])

    expect(JSON.stringify(so.snapshots)).toBe(JSON.stringify(expected))
  });
});
