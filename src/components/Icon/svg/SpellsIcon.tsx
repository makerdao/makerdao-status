import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function SpellsIcon({
  width = 24,
  height = 24,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      {...props}
    >
      <g clipPath="url(#prefix__clip0_4855_6461)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.998 1.365a1 1 0 011.367-.363l5.19 3.009a1 1 0 01.492.99 1 1 0 01-.491.988L18.366 9a1 1 0 11-1.004-1.73L19.55 6H6a1 1 0 110-2h13.55l-2.188-1.268a1 1 0 01-.363-1.367z"
          fill={fill}
        />
        <path
          d="M5 12a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1z"
          fill="#71C8BE"
        />
        <path
          d="M5 12a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1z"
          stroke="#71C8BE"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.002 15.365a1 1 0 00-1.367-.363L.445 18.01a1 1 0 00-.492.99 1 1 0 00.491.988L5.634 23a1 1 0 001.004-1.73L4.45 20h13.286a1 1 0 100-2H4.45l2.188-1.268a1 1 0 00.364-1.367z"
          fill={fill}
        />
        <path d="M0 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" fill="#71C8BE" />
        <path d="M0 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" stroke="#71C8BE" />
        <g>
          <path d="M0 5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" fill="#71C8BE" />
          <path d="M0 5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" stroke="#71C8BE" />
        </g>
        <g>
          <path d="M21 19a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" fill="#71C8BE" />
          <path d="M21 19a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" stroke="#71C8BE" />
        </g>
        <g>
          <path d="M21 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" fill="#71C8BE" />
          <path d="M21 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" stroke="#71C8BE" />
        </g>
      </g>
      <defs>
        <clipPath id="prefix__clip0_4855_6461">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoSpells = React.memo(SpellsIcon);
export default MemoSpells;
