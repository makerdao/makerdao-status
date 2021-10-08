import React from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function SearchIcon({
  width = 50,
  height = 50,
  fill = "white",
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-9 -10 40 40"
      fill={"transparent"}
      {...props}
    >
      <line
        x1="10.0254"
        y1="9.75366"
        x2="10.0254"
        y2="12.0937"
        stroke={fill}
        stroke-linecap="round"
      />
      <line
        x1="12.6973"
        y1="8.08362"
        x2="12.6973"
        y2="12.0936"
        stroke={fill}
        stroke-linecap="round"
      />
      <line
        x1="15.3672"
        y1="6.4137"
        x2="15.3672"
        y2="12.0937"
        stroke={"#455467"}
        stroke-linecap="round"
      />
      <path
        stroke={fill}
        strokeLinecap="round"
        d="M10.025 9.754v2.34M12.697 8.084v4.01M15.367 6.414v5.68"
      />
      <path
        d="M.91 19.973a1 1 0 001.414 1.414L.91 19.973zm6.16-3.332l.706-.707-1.414-1.415-.707.707 1.414 1.415zm-4.746 4.746l4.745-4.746-1.414-1.414L.91 19.973l1.414 1.414z"
        fill={fill}
      />
      <path
        d="M20.652 9.605a7.964 7.964 0 11-15.925 0 7.964 7.964 0 1115.925 0z"
        stroke={fill}
        strokeWidth={2}
      />
    </svg>
  );
}

const MemoNormal = React.memo(SearchIcon);
export default MemoNormal;
