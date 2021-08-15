import React, { ChangeEvent } from "react";

type Props = {
  defaultValue: number;
  max: number;
  onAnimationSpeedChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputAnimationSpeed: React.FC<Props> = (props) => {
  return (
    <>
      <label className="form-label" htmlFor="animation-speed">
        Animation speed
      </label>
      <input max={props.max} min={0} step={1}
        type="range"
        className="form-range"
        id="animation-speed"
        defaultValue={props.defaultValue}
        onChange={props.onAnimationSpeedChange}/>
    </>
  );
};
