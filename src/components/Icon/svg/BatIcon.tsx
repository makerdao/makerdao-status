import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function BatIcon({
  width = 50,
  height = 50,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill={fill}
      {...props}
    >
      <path
        opacity={0.2}
        d="M29.92 15c0 8.24-6.68 14.921-14.92 14.921-8.242 0-14.922-6.68-14.922-14.92C.078 6.76 6.758.078 15 .078 23.24.08 29.92 6.76 29.92 15z"
        fill="#B8C5D3"
      />
      <g fillRule="evenodd" clipRule="evenodd">
        <path
          d="M24.995 21.633L5 21.64l5.858-3.254 8.27-.019 5.867 3.265z"
          fill="#582D7A"
        />
        <path
          d="M15.012 4.6L5 21.642l5.864-3.265 4.141-7.084.007-6.693z"
          fill="#DE4D2A"
        />
        <path
          d="M15.014 4.601l9.984 17.034-5.864-3.265-4.142-7.084.021-6.685z"
          fill="#8D2557"
        />
      </g>
    </svg>
  );
}

const MemoBatIcon = React.memo(BatIcon);
export default MemoBatIcon;
