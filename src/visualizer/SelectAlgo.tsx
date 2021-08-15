import React, { ChangeEvent } from "react";

type ChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => void;

type Props = {
  defaultValue: string;
  availableAlgoNames: string[];
  onAlgoChange: ChangeHandler;
}

export const SelectAlgo: React.FC<Props> = (props) =>  {
  const opt = props.availableAlgoNames.map((v) => 
    <option value={v} key={v}>{v}</option>
  );
  return (
    <>
      <label className="form-label" htmlFor="sort-algorithm">
        Sort algorithm
      </label>
      
      <select
        className="form-select"
        id="sort-algorithm"
        onChange={props.onAlgoChange}
        defaultValue={props.defaultValue}>
          {opt}
      </select>
    </>
  );
};
