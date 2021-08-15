export class Sorter {
  public input: number[];
  public snapshots: Snapshot[];
  public result: number[];
  protected _data: number[];

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
    const snap = toSnapshot(this._data);
    instructions.forEach((v) => {
      const idx = v[0];
      if (idx == null) return;

      const tag = snap[idx].tag ? ` ${v[1]}` : v[1];
      snap[idx].tag += tag; 
    });
    this.snapshots.push(snap);
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

export const toSnapshot = (a: number[]): Snapshot => {
  const snap = a.map((v) => {
    return {n: v, tag: ""};
  });
  return snap;
};
