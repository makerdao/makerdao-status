import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function CloseUpArrowIcon({
  width = 25,
  height = 25,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 10"
      fill={fill}
      {...props}
    >
      <path
        d="M5.869.411a.883.883 0 011.492 0l5.396 7.964c.455.672.018 1.625-.746 1.625H1.219C.455 10 .018 9.047.473 8.375L5.869.411z"
        fill="#BAE6E1"
      />
    </svg>
  );
}

const MemoCloseUpArrowIcon = React.memo(CloseUpArrowIcon);
export default MemoCloseUpArrowIcon;
