import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function DownArrowIcon({
  width = 18,
  height = 18,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 8 7" fill="none" {...props}>
      <path
        d="M4.442 6.36a.52.52 0 01-.884 0L.36 1.582C.09 1.179.35.607.802.607h6.396c.453 0 .712.572.442.975L4.442 6.36z"
        fill={fill}
      />
    </svg>
  );
}

const MemoDownArrowIcon = React.memo(DownArrowIcon);
export default MemoDownArrowIcon;
