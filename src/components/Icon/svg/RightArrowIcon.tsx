import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function RightArrowIcon({
  width = 18,
  height = 18,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 256 256"
      {...props}
    >
      <g
        transform="rotate(180 127.018 127.018) scale(2.8008)"
        strokeWidth={0}
        strokeMiterlimit={10}
        fill="none"
        style={{
          stroke: 'none',
          strokeWidth: 0,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: 'none',
          fillRule: 'nonzero',
          opacity: 1,
        }}
      >
        <circle cx={45} cy={45} r={45} fill="#1aab9b" />
        <path
          d="M70.191 51.154H13.5a3.001 3.001 0 01-2.285-4.944l18.258-21.462a3 3 0 014.57 3.888L19.991 45.154h50.201a3 3 0 11-.001 6z"
          fill="#1ba7ad"
        />
        <path
          d="M31.759 72.617a2.992 2.992 0 01-2.287-1.057L11.215 50.098a2.998 2.998 0 012.285-4.943h56.691a3 3 0 110 6h-50.2l14.052 16.52a3 3 0 01-.341 4.229 2.995 2.995 0 01-1.943.713z"
          fill="#1ba7ad"
        />
        <path
          d="M73.5 47.846H16.809a3.001 3.001 0 01-2.285-4.944L32.781 21.44a3 3 0 114.57 3.888L23.299 41.846H73.5a3 3 0 110 6z"
          fill="#fff"
        />
        <path
          d="M35.067 69.309a2.99 2.99 0 01-2.287-1.057L14.523 46.789a2.998 2.998 0 012.285-4.943H73.5a3 3 0 110 6H23.299l14.052 16.52a3 3 0 01-2.284 4.943z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

const MemoRightArrow = React.memo(RightArrowIcon);
export default MemoRightArrow;
