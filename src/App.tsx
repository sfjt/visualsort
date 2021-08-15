import React, { FC, useState, ChangeEvent } from "react";
import ReactDOM from "react-dom";

import { conf, Visualizer, SortSettings } from "./visualizer";
import { Sorter, Snapshot, createSorter, availableAlgoNames } from "./sorter";

import "bootstrap";
import "./visualsort.scss";
import GutHubMark32 from "./img/GitHub-Mark-32px.png";

type State = {
  input: number[];
  snapshots: Snapshot[];
  result: number[];
  scale: number;
  animationSpeed: number;
  updateId: number;
}

const defaultAlgoName = availableAlgoNames[0];
const defaultSorter = createSorter({
  algoName: defaultAlgoName,
  numElements: conf.DEFAULT_NUM_ELEMENTS,
});
defaultSorter.sort();

const defaultState: State = {
  input: defaultSorter.input,
  snapshots: defaultSorter.snapshots,
  result: defaultSorter.result,
  scale: conf.DEFAULT_SCALE,
  animationSpeed: conf.ANIMATION_SPEEDS[conf.DEFAULT_ANIMATION_SPEED_INDEX],
  updateId: 0
};



const App: FC = () => {
  const [state, setState] = useState<State>(defaultState);

  const onAnimationSpeedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({...state, animationSpeed: conf.ANIMATION_SPEEDS[e.target.valueAsNumber]});
  };
  const onSorterCreated = (sorter: Sorter) => {
    sorter.sort();
    const newState = {
      input: sorter.input,
      snapshots: sorter.snapshots,
      result: sorter.result,
      updateId: state.updateId + 1,
      animationSpeed: state.animationSpeed
    };
    setState({...state, ...newState});
  };

  return (
    <>
      <header>
        <h1>Visual Sort</h1>
        <span className="repo">
          <a href={conf.REPO_URL}>
            <img src={GutHubMark32} width={32} height={32} alt="GitHub Mark" id="github-mark" />
            {conf.REPO_URL}
          </a>
        </span>
      </header>
      <SortSettings
        defaultAlgoName={defaultAlgoName}
        defaultNumElements={conf.DEFAULT_NUM_ELEMENTS}
        maxNumElements={conf.MAX_NUM_ELEMENTS}
        availableAlgoNames={availableAlgoNames}
        animationSpeeds={conf.ANIMATION_SPEEDS}
        defaultAnimationSpeedIndex={conf.DEFAULT_ANIMATION_SPEED_INDEX}
        onAnimationSpeedChange={onAnimationSpeedChange}
        onSorterCreated={onSorterCreated}/>

      <Visualizer
        input={state.input}
        snapshots={state.snapshots}
        result={state.result}
        scale={state.scale}
        animationSpeed={state.animationSpeed}
        key={state.updateId}/>
    </>
  );
};

ReactDOM.render(<App/>, document.querySelector("#app"));
