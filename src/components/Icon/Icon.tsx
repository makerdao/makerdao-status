import React from 'react';
import { IconNames, icons } from './IconNames';

export interface SvgProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  fill?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

interface Props {
  name: IconNames;
}

const Icon = React.memo(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ name, x, y, width, height, fill, onClick }: Props & SvgProps) => {
    const svg = React.createElement(icons[name], {
      x,
      y,
      width,
      height,
      fill,
      onClick,
    });
    return <>{svg}</>;
  },
);

export default Icon;
