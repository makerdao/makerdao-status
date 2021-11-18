import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function BnbIcon({
  width = 50,
  height = 50,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill={fill}
      {...props}
    >
      <path
        opacity={0.2}
        d="M29.92 15c0 8.24-6.68 14.921-14.92 14.921-8.242 0-14.922-6.68-14.922-14.92C.078 6.76 6.758.078 15 .078 23.24.08 29.92 6.76 29.92 15z"
        fill="#B8C5D3"
      />
      <g clipPath="url(#prefix__clip0_4525_103879)">
        <g fill="#F3BA2F">
          <path d="M10.339 13.085L15 8.424l4.663 4.663 2.712-2.712L15 3l-7.373 7.373 2.712 2.712zM3 15l2.712-2.713L8.424 15l-2.712 2.713L3 15zm7.339 1.915L15 21.575l4.663-4.662 2.713 2.71v.002L15 27l-7.373-7.373-.004-.004 2.716-2.708zm11.237-1.914l2.712-2.712L27 15.001l-2.712 2.712-2.712-2.712z" />
          <path d="M17.75 14.999h.001L15 12.247l-2.034 2.033-.233.234-.482.482-.004.003.004.005 2.75 2.75L17.75 15l.002-.001-.003-.001" />
        </g>
        {'\\'}
      </g>
      <defs>
        <clipPath id="prefix__clip0_4525_103879">
          <path fill="#fff" transform="translate(3 3)" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoBnbIcon = React.memo(BnbIcon);
export default MemoBnbIcon;
