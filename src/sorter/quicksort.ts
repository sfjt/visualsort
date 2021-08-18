import { Sorter } from "./sorterbase";

export class QuickSort extends Sorter {
  public static algorithmName = "Quick Sort";

  sort(): void {
    if (this._data.length === 0) return;

    const partition = (a: number[], lo: number, hi: number): number => {
      const mid = Math.floor((lo + hi) / 2);
      const pivot = a[mid];
      const _ts = (x: number, y: number) => {
        return this._takeSnapshot([
          [x, "active"],
          [y, "active"],
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
        this._swap(lo, hi);
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
