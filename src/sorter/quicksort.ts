import { Sorter } from "./sorterbase";

export class QuickSort extends Sorter {
  sort(): void {
    if (this._data.length === 0) return;

    const partition = (a: number[], lo: number, hi: number): number => {
      const mid = Math.floor((lo + hi) / 2);
      const pivot = a[mid];

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

        this._takeSnapshot([
          [lo, "active"],
          [hi, "active"],
          [mid, "pivot"]
        ]);

        swap(a, lo, hi);
        
        this._takeSnapshot([
          [lo, "active"],
          [hi, "active"],
          [mid, "pivot"]
        ]);

        lo++;
        hi--;
      }
    };

    const quickSort = (a: number[], lo: number, hi: number) => {
      if (lo >= hi) return;
      if(lo < 0) return;

      const p = partition(a, lo, hi);
      this._takeSnapshot([]);

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
