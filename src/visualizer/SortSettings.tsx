import React, { FC, ChangeEvent, useState } from "react";

import { Sorter, createSorter } from "../sorter";
import { SelectAlgo } from "./SelectAlgo";
import { InputNumElements } from "./InputNumElements";
import { InputAnimationSpeed } from "./InputAnimationSpeed";

type Props = {
  defaultAlgoName: string;
  defaultNumElements: number;
  maxNumElements: number;
  minNumElements: number;
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

  const isNumElementsValid = (numElements: number) => {
    return numElements >= props.minNumElements && numElements <= props.maxNumElements;
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
            min={props.minNumElements}
            onNumElementsChange={onNumElementsChange}/>
        </div>

        <div className="col">
          <InputAnimationSpeed
            defaultValue={props.defaultAnimationSpeedIndex}
            max={props.animationSpeeds.length - 1}
            onAnimationSpeedChange={props.onAnimationSpeedChange}/>
        </div>

        <div className="col d-flex align-items-center">
          {isNumElementsValid(state.numElements) &&
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onStartButtonClick}>
              Start
            </button>
          }

          {!isNumElementsValid(state.numElements) &&
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
