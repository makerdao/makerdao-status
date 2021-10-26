import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function EthereumIcon({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 30C6.715 30 0 23.285 0 15S6.715 0 15 0s15 6.715 15 15-6.715 15-15 15zm7.494-14.795L15.467 3.75l-7.03 11.456 7.03 4.081 7.027-4.082zm.006 1.31l-7.033 4.08-7.03-4.08 7.03 9.73 7.033-9.73z"
        fill="#000"
      />
      <path
        d="M15.465 3.75v8.316l7.028 3.14L15.465 3.75zm0 16.845v5.65l7.033-9.73-7.033 4.08z"
        fill="#000"
        fillOpacity={0.298}
      />
      <path
        d="M15.465 19.287l7.028-4.08-7.028-3.14v7.22z"
        fill="#000"
        fillOpacity={0.801}
      />
      <path
        d="M8.438 15.207l7.029 4.08v-7.22l-7.03 3.14z"
        fill="#000"
        fillOpacity={0.298}
      />
    </svg>
  );
}

const MemoEthereum = React.memo(EthereumIcon);
export default MemoEthereum;
