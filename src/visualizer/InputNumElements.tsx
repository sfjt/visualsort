import React, { ChangeEvent } from "react";

type Props = {
  defaultValue: number;
  max: number;
  min: number;
  onNumElementsChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputNumElements: React.FC<Props> = (props) => {
  return (
    <>
      <label className="form-label" htmlFor="number-of-elements">
        Number of elements
      </label>
      <input
        type="number"
        className="form-control"
        id="number-of-elements"
        defaultValue={props.defaultValue}
        max={props.max}
        onChange={props.onNumElementsChange}>
      </input>
      <div className="input-annotation">
        Available number range: {props.min} - {props.max}
      </div>
    </>
  );
};
