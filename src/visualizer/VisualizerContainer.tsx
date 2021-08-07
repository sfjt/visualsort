import React from "react";

import { NumberVisualizer } from "./NumberVisualizer";
import { Snapshot, toSnapshot } from "../sorter/sorterbase"

type Props = {
  input: number[];
  snapshots: Snapshot[];
  result: number[];
}

type State = {
  tickCount: number;
  snapshot: Snapshot;
};

export class VisualizerContainer extends React.Component<Props, State> {
  private _timer: NodeJS.Timer | undefined;

  constructor(props: Props) {
    super(props);
    this.state = {
      tickCount: 0,
      snapshot: toSnapshot(this.props.input)
    };
  }

  componentDidMount(): void {
    this._timer = setInterval(
      () => this._tick(),
      500
    );
  }

  componentWillUnmount(): void {
    this._terminateTick();
  }

  private _terminateTick(): void {
    if (this._timer) {
      clearInterval(this._timer);
    }
  }

  private _tick(): void{
    const t = this.state.tickCount;

    if (t < 0) {
      this._terminateTick();
      return;
    }

    if (t > (this.props.snapshots.length - 1)) {
      const snap = toSnapshot(this.props.result);
      this.setState({
        tickCount: -1,
        snapshot: snap
      })
      return;
    }

    const snap = this.props.snapshots[t];
    this.setState({
      tickCount: t + 1,
      snapshot: snap
    })
  }

  render(): JSX.Element {
    const nv = this.state.snapshot.map((v) => {
      return <NumberVisualizer value={v.n * 20} tag={v.tag} width={10} />
    }) 
    return(
      <div id="visualizer-container">
        {nv}
      </div>
    );
  }
}
