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
    <svg viewBox="0 0 30 30" width={width} height={height} {...props}>
      <path
        opacity={0.2}
        d="M29.92 15c0 8.24-6.68 14.921-14.92 14.921-8.242 0-14.922-6.68-14.922-14.92C.078 6.76 6.758.078 15 .078 23.24.08 29.92 6.76 29.92 15z"
        fill="#B8C5D3"
      />
      <path
        d="M16.92 14.28H27v.08l-15.76 9.6 7.84-6.24-2.16-3.44zM11 5v19.12l-8-6.4L11 5z"
        fill="#1C60FF"
      />
    </svg>
  );
}

const MemoLrcIcon = React.memo(LrcIcon);
export default MemoLrcIcon;
