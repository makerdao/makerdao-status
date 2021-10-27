import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function NoResultsFoundIcon({
  width = 195,
  height = 192,
  fill = 'transparent',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 197"
      fill={fill}
      {...props}
    >
      <g opacity={0.6} stroke="#B8C5D3">
        <path
          d="M180.826 156.159a67.146 67.146 0 00-8.35-84.78 67.144 67.144 0 108.35 84.78z"
          strokeWidth={10}
        />
        <rect
          x={2.5}
          y={2.5}
          width={120}
          height={120}
          rx={7.5}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="bevel"
          strokeDasharray="10 30"
        />
        <path
          d="M195 192l-24-24"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

const MemoNoResultsFoundIcon = React.memo(NoResultsFoundIcon);
export default MemoNoResultsFoundIcon;
