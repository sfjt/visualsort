import React, { FC, ChangeEvent, useState } from "react";

import { Sorter, createSorter } from "../sorter";
import { SelectAlgo } from "./SelectAlgo";
import { InputNumElements } from "./InputNumElements";
import { InputAnimationSpeed } from "./InputAnimationSpeed";

type Props = {
  defaultAlgoName: string;
  defaultNumElements: number;
  maxNumElements: number;
  defaultAnimationSpeedIndex: number;
  animationSpeeds: number[];
  availableAlgoNames: string[];
  onAnimationSpeedChange: (e:  ChangeEvent<HTMLInputElement>) => void;
  onSorterCreated:  (sorter: Sorter) => void;
}

type State = {
  algoName: string;
  numElements: number;
};

export const SortSettings: FC<Props> = (props)=> {
  const defaultState: State = {
    algoName: props.defaultAlgoName,
    numElements: props.defaultNumElements
  };
  const [state, setState] = useState<State>(defaultState);

  const onAlgoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({...state, algoName: e.target.value});
  };
  const onNumElementsChange = (e:  ChangeEvent<HTMLInputElement>) => {
    setState({...state, numElements: e.target.valueAsNumber});
  };

  const onStartButtonClick = () => {
    const sorter = createSorter({
      algoName: state.algoName,
      numElements: state.numElements
    });

    props.onSorterCreated(sorter);
  };

  const startButtonAvailable = (numElements: number, max: number) => {
    return numElements > 1 && numElements <= max;
  };

  return (
    <form id="sorter-config">
      <div className="row row-cols-auto mb-3">
        <div className="col">
          <SelectAlgo
            defaultValue={props.defaultAlgoName}
            availableAlgoNames={props.availableAlgoNames}
            onAlgoChange={onAlgoChange}/>
        </div>

        <div className="col">
          <InputNumElements
            defaultValue={props.defaultNumElements}
            max={props.maxNumElements}
            onNumElementsChange={onNumElementsChange}/>
        </div>

        <div className="col">
          <InputAnimationSpeed
            defaultValue={props.defaultAnimationSpeedIndex}
            max={props.animationSpeeds.length - 1}
            onAnimationSpeedChange={props.onAnimationSpeedChange}/>
        </div>

        <div className="col d-flex align-items-center">
          {startButtonAvailable(state.numElements, props.maxNumElements) &&
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onStartButtonClick}>
              Start
            </button>
          }

          {!startButtonAvailable(state.numElements, props.maxNumElements) &&
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              disabled>
              Start
            </button>
          }
        </div>
      </div>
    </form>
  );
};
