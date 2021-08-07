import React from 'react';

type Props = {
  value: number;
  tag: string;
  width: number;
};

export const NumberVisualizer: React.FC<Props> = (props) => {
  const style = {
    height: props.value,
    width: props.width
  }
  const tag = props.tag ? `number ${props.tag}` : "number";
  return (
    <div className={tag} style={style}></div>
  );
}
