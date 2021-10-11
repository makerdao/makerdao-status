import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function OpenInNewIcon({
  width = 50,
  height = 50,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 14"
      fill={fill}
      {...props}
    >
      <path
        d="M13.39 12.444H2.5V1.556h5.445V0H2.501A1.556 1.556 0 00.945 1.556v10.888A1.556 1.556 0 002.501 14H13.39a1.56 1.56 0 001.555-1.556V7H13.39v5.444zM9.5 0v1.556h2.793L4.648 9.2l1.096 1.097 7.646-7.646v2.792h1.555V0H9.501z"
        fill="#2F80ED"
      />
    </svg>
  );
}

const MemoOpenInNewIcon = React.memo(OpenInNewIcon);
export default MemoOpenInNewIcon;
