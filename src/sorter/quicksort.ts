import { Sorter } from "./sorterbase";

export class QuickSort extends Sorter {
  public static algorithmName = "Quick Sort";

  sort(): void {
    if (this._data.length === 0) return;

    const partition = (a: number[], lo: number, hi: number): number => {
      const mid = Math.floor((lo + hi) / 2);
      const pivot = a[mid];
      const _ts = (l: number, h: number) => {
        return this._takeSnapshot([
          [l, "active"],
          [h, "active"],
          [mid, "pivot"]
        ]);
      };

      for(;;) {
        while (a[lo] < pivot) {
          lo++;
        }
        while (a[hi] > pivot) {
          hi--;
        }
        if (lo >= hi) {
          return hi;
        }

        _ts(lo, hi);
        swap(a, lo, hi);
        _ts(lo, hi);

        lo++;
        hi--;
      }
    };

    const quickSort = (a: number[], lo: number, hi: number) => {
      if (lo >= hi) return;
      if(lo < 0) return;

      const p = partition(a, lo, hi);

      quickSort(a, lo, p);
      quickSort(a, p + 1, hi);
    };

    quickSort(this._data, 0, (this._data.length - 1));
    this.result = this._data.slice();
  }
}

const swap = (a: number[], x:number, y: number): void => {
  const temp = a[x];
  a[x] = a[y];
  a[y] = temp;
};
