import React from 'react';
import { IconNames, icons } from './IconNames';

export interface SvgProps {
  width?: number;
  height?: number;
  fill?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

interface Props {
  name: IconNames;
}

const Icon = React.memo(
  ({ name, width, height, fill, onClick, ...props }: Props & SvgProps) => {
    const svg = React.createElement(icons[name], {
      width,
      height,
      fill,
      onClick,
    });
    return <div {...props}>{svg}</div>;
  },
);

export default Icon;
