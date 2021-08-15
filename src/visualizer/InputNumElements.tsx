import React, { ChangeEvent } from "react";

type ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;

type Props = {
  defaultValue: number;
  max: number;
  onNumElementsChange: ChangeHandler;
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
    </>
  );
};
