import React from "react";
import ReactDOM from "react-dom";

import { VisualizerContainer } from "./visualizer/VisualizerContainer";
import { QuickSort } from "./sorter/quicksort";

import "./visualsort.css";

const App: React.FC = () => {
  const qs = new QuickSort([3,2,1,1,0,5,4,6,8,10,1,3]);
  qs.sort()
  return (
    <>
      <h1>Visual Sort</h1>
      <VisualizerContainer input={qs.input} snapshots={qs.snapshots} result={qs.result} />
    </>
  );
}

ReactDOM.render(<App/>, document.querySelector("#app"));
