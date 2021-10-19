import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function UpArrowIcon({
  width = 50,
  height = 50,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 9"
      fill="none"
      {...props}
    >
      <path d="M6.5 9L.87 0h11.26L6.5 9z" fill="#1AAB9B" />
    </svg>
  );
}

const MemoUpArrowIcon = React.memo(UpArrowIcon);
export default MemoUpArrowIcon;
