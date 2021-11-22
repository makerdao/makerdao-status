import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function GusdIcon({
  width = 50,
  height = 50,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 30 30" {...props}>
      <path
        opacity={0.2}
        d="M29.92 15c0 8.24-6.68 14.921-14.92 14.921-8.242 0-14.922-6.68-14.922-14.92C.078 6.76 6.758.078 15 .078 23.24.08 29.92 6.76 29.92 15z"
        fill="#B8C5D3"
      />
      <path
        d="M15 27c6.627 0 12-5.373 12-12S21.627 3 15 3 3 8.373 3 15s5.373 12 12 12z"
        fill="#00DCFA"
      />
      <path
        d="M17.534 6.75c-2.903 0-5.368 2.232-5.678 5.105-2.875.31-5.106 2.776-5.106 5.678a5.72 5.72 0 005.716 5.717c2.903 0 5.378-2.232 5.678-5.105 2.874-.31 5.106-2.776 5.106-5.678a5.72 5.72 0 00-5.716-5.717zm4.377 6.357a4.447 4.447 0 01-3.728 3.727v-3.727h3.727zM8.088 16.893a4.448 4.448 0 013.728-3.737v3.727H8.089v.01zm8.755 1.29a4.42 4.42 0 01-4.378 3.776 4.42 4.42 0 01-4.377-3.775h8.755v-.001zm.049-5.076v3.776h-3.786v-3.776h3.786zm5.017-1.29h-8.754a4.42 4.42 0 014.377-3.776 4.42 4.42 0 014.377 3.775v.001z"
        fill="#fff"
      />
    </svg>
  );
}

const MemoGusdIcon = React.memo(GusdIcon);
export default MemoGusdIcon;
