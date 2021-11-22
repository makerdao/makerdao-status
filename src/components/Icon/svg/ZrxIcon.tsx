import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function ZrxIcon({
  width = 50,
  height = 50,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg height={height} viewBox="0 0 30 30" width={width} {...props}>
      <path
        opacity={0.2}
        d="M29.92 15c0 8.24-6.68 14.921-14.92 14.921-8.242 0-14.922-6.68-14.922-14.92C.078 6.76 6.758.078 15 .078 23.24.08 29.92 6.76 29.92 15"
        fill="#B8C5D3"
      />
      <g fillRule="evenodd" clipRule="evenodd" fill="#046">
        <path d="M10.882 21.484l-3.568 2.72A11.957 11.957 0 013 14.997c0-2.179.581-4.222 1.598-5.982l5.458 7.139-2.025 2.107a8.17 8.17 0 002.85 3.223zM21.47 19.098l2.72 3.568a11.957 11.957 0 01-9.208 4.314c-2.178 0-4.221-.582-5.982-1.598l7.14-5.458 2.107 2.025a8.16 8.16 0 003.223-2.85zM19.082 8.51l3.568-2.72a11.957 11.957 0 014.314 9.207c0 2.179-.581 4.222-1.598 5.982l-5.457-7.139 2.024-2.107a8.174 8.174 0 00-2.851-3.223zM8.497 10.896l-2.72-3.568a11.957 11.957 0 019.208-4.314c2.179 0 4.221.582 5.982 1.598l-7.14 5.458-2.107-2.025a8.167 8.167 0 00-3.223 2.851z" />
      </g>
    </svg>
  );
}

const MemoZrxIcon = React.memo(ZrxIcon);
export default MemoZrxIcon;
