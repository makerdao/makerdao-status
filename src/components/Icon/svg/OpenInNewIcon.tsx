import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function OpenInNewIcon({
  width = 50,
  height = 50,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill={fill}
      {...props}
    >
      <g clipPath="url(#prefix__clip0_6162_14384)" fill="#2F80ED">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.055-.407h2V.982l-2 .889V-.407zm0 3.75v3.542c.14-.214.257-.403.353-.558.056-.09.105-.17.147-.234 1.158-1.803 1.5-2.5 1.5-2.5l-1.5 1-.5-1.25zm-2 5.977a10.545 10.545 0 01-2 1.504V2.593h2V9.32zm-4 2.514c-.777.375-1.043.478-1.537.67l-.463.181V5.593h2v6.24zm-.515 1.759c.168-.042.34-.086.515-.132v.132H1.54z"
        />
        <path d="M8.555 2.593l.5 1 2.293-1.037S10.214 4.79 9.055 6.593c-.5.777-2 3.5-5 5s-2.657 1.024-5 2v.5s4.236-.612 6.5-2c2.119-1.3 3.5-3 4.5-4.5 1.21-1.77 2.5-4.5 2.5-4.5v2.5h1V1.71a1 1 0 00-1.447-.894L8.555 2.592z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0_6162_14384">
          <path fill="#fff" d="M0 0h14v14H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoOpenInNewIcon = React.memo(OpenInNewIcon);
export default MemoOpenInNewIcon;
