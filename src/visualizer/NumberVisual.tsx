import React, { FC } from 'react';

type Props = {
  value: number;
  tag: string;
  scale: number;
  width: number;
};

export const NumberVisual: FC<Props> = (props) => {
  const className = props.tag ? `number ${props.tag}` : "number";
  const height = Math.abs(props.value * props.scale);
  const style = {
    width: props.width,
    height
  };

  return (
    <div className={className} style={style}></div>
  );
};
