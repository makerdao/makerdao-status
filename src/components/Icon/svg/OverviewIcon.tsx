import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function OverviewIcon({
  width = 50,
  height = 50,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 -1 24 24"
      fill={fill}
      {...props}
    >
      <path
        d="M2.222 13.222h7.334c.672 0 1.222-.55 1.222-1.222V2.222c0-.672-.55-1.222-1.222-1.222H2.222C1.55 1 1 1.55 1 2.222V12c0 .672.55 1.222 1.222 1.222zm0 9.778h7.334c.672 0 1.222-.55 1.222-1.222v-4.89c0-.671-.55-1.221-1.222-1.221H2.222c-.672 0-1.222.55-1.222 1.222v4.889C1 22.45 1.55 23 2.222 23zm12.222 0h7.334C22.45 23 23 22.45 23 21.778V12c0-.672-.55-1.222-1.222-1.222h-7.334c-.672 0-1.222.55-1.222 1.222v9.778c0 .672.55 1.222 1.222 1.222zM13.222 2.222v4.89c0 .671.55 1.221 1.222 1.221h7.334c.672 0 1.222-.55 1.222-1.222V2.222C23 1.55 22.45 1 21.778 1h-7.334c-.672 0-1.222.55-1.222 1.222z"
        fill={fill}
      />
    </svg>
  );
}

const MemoOverview = React.memo(OverviewIcon);
export default MemoOverview;
