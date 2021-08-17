export class Sorter {
  public input: number[];
  public snapshots: Snapshot[];
  public result: number[];
  protected _data: number[];
  public static algorithmName = "";

  constructor(input: number[]) {
    this.input = input.slice();
    this.snapshots = [];
    this.result = [];
    this._data = input.slice();
  }

  public sort(): void {
    throw new UnimplementedError(
      "The sort method is not implemented."
    );
  }
  
  protected _takeSnapshot(instructions: AddTagInstructions): void {
    const snap = this._data.map((v) => {
      return {n: v, tag: ""};
    });
    instructions.forEach((v) => {
      const idx = v[0];
      if (idx == null) return;

      const tag = snap[idx].tag ? ` ${v[1]}` : v[1];
      snap[idx].tag += tag; 
    });
    this.snapshots.push(snap);
  }

  protected _swap = (x:number, y: number): void => {
    const temp = this._data[x];
    this._data[x] = this._data[y];
    this._data[y] = temp;
  }
}

export class UnimplementedError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnimplementedError.prototype);
  }
}

export type Snapshot = {n: number, tag: string}[];
type AddTagInstructions = [number | null | undefined, string][]
