import { randomize } from "./rendomize";

describe("Test randomizer", () => {
  test("Each elements in randomized array is unique.", () => {
    const count = (n: number, arr: number[]) => {
      let c = 0;
      for (let i = 0; i < arr.length; i++) {
        c = arr[i] === n ? c + 1 : c;
      }
      return c;
    };

    const numElements = 3;
    const rand = randomize(numElements);

    rand.forEach((v) => {
      expect(count(v, rand)).toBe(1);
    });
  });

  test("Max value equals to number of elements in array and min value is 1.", () => {
    const numElements = 10;
    const rand = randomize(numElements);
    let max = rand[0];
    let min = rand[0];

    rand.forEach((v) => {
      max = Math.max(max, v);
      min = Math.min(min, v);
    });

    expect(max).toBe(numElements);
    expect(min).toBe(1);
  });

  test("The randomized array has expected number of elements.", () => {
    const numElements = 10;
    const rand = randomize(numElements);

    expect(rand.length).toBe(numElements);
  });
});
