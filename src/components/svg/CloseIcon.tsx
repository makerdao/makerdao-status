import React from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function CloseIcon({
  width = 50,
  height = 50,
  fill = "white",
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 -1 8 9" fill={fill} {...props}>
      <path
        d="M5.5 4.457l2.346 2.345-1.37 1.37L4.13 5.828 1.457 8.5 0 7.043 2.673 4.37.315 2.012l1.37-1.37L4.043 3l2.5-2.5L8 1.957l-2.5 2.5z"
        fill="#fff"
      />
    </svg>
  );
}

const MemoCloseIcon = React.memo(CloseIcon);
export default MemoCloseIcon;
