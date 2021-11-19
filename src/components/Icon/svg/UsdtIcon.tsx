import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function UsdtIcon({
  width = 50,
  height = 50,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 30 30" width={width} height={height} {...props}>
      <path
        opacity={0.2}
        d="M29.92 15c0 8.24-6.68 14.921-14.92 14.921-8.242 0-14.922-6.68-14.922-14.92C.078 6.76 6.758.078 15 .078 23.24.08 29.92 6.76 29.92 15z"
        fill="#B8C5D3"
      />
      <path
        d="M26.978 14.996c0 6.594-5.345 11.94-11.94 11.94-6.594 0-11.94-5.346-11.94-11.94 0-6.595 5.346-11.94 11.94-11.94 6.595 0 11.94 5.345 11.94 11.94z"
        fill="#1BA27A"
      />
      <path
        d="M20.642 9.077H9.336v2.73h4.288v4.011h2.73v-4.012h4.288v-2.73z"
        fill="#fff"
      />
      <path
        d="M15.013 16.245c-3.547 0-6.423-.561-6.423-1.254 0-.692 2.876-1.254 6.423-1.254 3.548 0 6.424.562 6.424 1.254 0 .693-2.876 1.254-6.424 1.254zm7.213-1.045c0-.893-3.23-1.617-7.213-1.617s-7.212.724-7.212 1.617c0 .787 2.504 1.442 5.822 1.587v5.76h2.73V16.79c3.343-.141 5.873-.8 5.873-1.59z"
        fill="#fff"
      />
    </svg>
  );
}

const MemoUsdtIcon = React.memo(UsdtIcon);
export default MemoUsdtIcon;
