import { Sorter } from "./sorterbase";

export class BubbleSort extends Sorter {
  public static algorithmName = "Bubble Sort";

  sort(): void {
    for(let complete = 0; complete < this._data.length; complete++){
      for(let i = 1; i < this._data.length - complete; i++) {
        const _ts = (x?: number, y?: number) => {
          this._takeSnapshot([
            [x, "active"],
            [y, "active"],
            [i, "scanning"]
          ]);
        };
        _ts();
        const prev = i - 1;
        if (this._data[i] < this._data[prev]) {
          _ts(i, prev);
          this._swap(i, prev);
        }
      }
    }
    
    this.result = this._data.slice();
  }
}
