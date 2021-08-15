import React, { FC, useEffect, useState } from "react";

import { Snapshot, toSnapshot } from "../sorter";
import { NumberVisual } from "./NumberVisual";

type Props = {
  input: number[];
  snapshots: Snapshot[];
  result: number[];
  scale: number;
  animationSpeed: number;
};

type State = {
  snapshot: Snapshot;
  timerCount: number;
  complete: boolean;
};

export const Visualizer: FC<Props> = (props)=> {
  const defaultState: State = {
    snapshot: toSnapshot(props.input),
    timerCount: 0,
    complete: false
  };
  const [state, setState] = useState<State>(defaultState);
  
  let timeout: NodeJS.Timeout | undefined;

  const killTick = () => {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
  };

  const tick = () => {
    if (state.complete) {
      killTick();
      return;
    }

    if (state.timerCount < props.snapshots.length) {
      const nextSnap = props.snapshots[state.timerCount];
      const nextTimerCount = state.timerCount + 1;
      setState({...state, snapshot: nextSnap, timerCount: nextTimerCount});
      return;
    }

    setState({...state, snapshot: toSnapshot(props.result), complete: true});
  };

  useEffect(() => {
    setTimeout(tick, props.animationSpeed);

    return () => {
      killTick();
    };
  },[state]);
  
  const nv = state.snapshot.map((v, i) =>
  <NumberVisual 
    value={v.n}
    tag={v.tag}
    scale={props.scale}
    width={10}
    key={i.toString()}
    />
  );

  return (
    <div id="visualizer-container">
      {nv}
    </div>
  );
};
