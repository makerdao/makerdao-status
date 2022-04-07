import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function NextArrow({
  width = 7.41,
  height = 12,
  fill = 'transparent',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 8 13" fill={fill} {...props}>
      <path d="M.34 11.34l4.58-4.59L.34 2.16 1.75.75l6 6-6 6-1.41-1.41z" fill="#748AA1" />
    </svg>
  );
}

const MemoNextArrow = React.memo(NextArrow);
export default MemoNextArrow;
