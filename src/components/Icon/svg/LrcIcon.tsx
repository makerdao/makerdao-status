import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function LrcIcon({
  width = 50,
  height = 50,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" width={width} height={height} {...props}>
      <g fill="none" fillRule="evenodd">
        <circle cx={16} cy={16} fill="#2ab6f6" r={16} />
        <path
          d="M16 6l9 12.533L16 26l-9-7.467zm-1.174 6.667L10.913 18l3.913 3.2zm2.348 0V21.2l3.913-3.2z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

const MemoLrcIcon = React.memo(LrcIcon);
export default MemoLrcIcon;
