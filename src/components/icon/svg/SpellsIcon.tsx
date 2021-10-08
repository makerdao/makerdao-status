import React from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function SpellsIcon({
  width = 50,
  height = 50,
  fill = "white",
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 56 38"
      fill={fill}
      {...props}
    >
      <path
        d="M36.403 10h-9.886c-.918 0-1.797.293-2.446.812-.649.519-1.013 1.222-1.014 1.956v5.141h9.476l-3.255-2.604a.713.713 0 01-.272-.555.723.723 0 01.29-.55c.182-.145.428-.228.686-.231.258-.003.507.075.694.217l4.943 3.955a.72.72 0 01.29.559.72.72 0 01-.29.56l-4.943 3.954c-.187.142-.436.22-.694.217a1.124 1.124 0 01-.686-.232.723.723 0 01-.29-.549.713.713 0 01.272-.554l3.255-2.605h-9.476v5.14c0 1.585 2.088 2.769 3.954 2.769h9.392c.918 0 1.797-.293 2.446-.812.649-.519 1.014-1.222 1.015-1.956V12.768c-.002-.734-.366-1.437-1.015-1.956-.649-.52-1.528-.811-2.446-.812zM17.124 17.91c-.262 0-.513.082-.699.23a.72.72 0 00-.29.56c0 .21.105.411.29.56.186.148.437.231.7.231h5.931v-1.582h-5.932z"
        fill={fill}
      />
    </svg>
  );
}

const MemoSpells = React.memo(SpellsIcon);
export default MemoSpells;
