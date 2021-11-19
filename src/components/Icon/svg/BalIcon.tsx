import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function BalIcon({
  width = 50,
  height = 50,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 30 30" width={width} height={height} {...props}>
      <path
        opacity={0.2}
        d="M31.92 17c0 8.24-6.68 14.921-14.92 14.921-8.242 0-14.922-6.68-14.922-14.92C2.078 8.76 8.758 2.078 17 2.078c8.24 0 14.92 6.68 14.92 14.921z"
        fill="#B8C5D3"
      />
      <g fill="#1E1E1E" clipPath="url(#prefix__clip0_4541_88183)">
        <path d="M17.252 24.105c-5.436 0-9.842-1.57-9.842-3.675 0-1.098 1.2-2.087 3.12-2.784 1.5.962 4.016 1.455 6.868 1.455 2.784 0 5.245-.602 6.758-1.523 1.812.69 2.937 1.652 2.937 2.713 0 2.107-4.406 3.814-9.841 3.814z" />
        <path d="M17.321 18.628c-4.12 0-7.462-1.291-7.462-2.886 0-.884 1.03-1.676 2.645-2.203 1.153.602 2.88.986 4.817.986 1.938 0 3.665-.384 4.817-.986 1.618.53 2.645 1.32 2.645 2.203.003 1.595-3.338 2.886-7.462 2.886z" />
        <path d="M17.288 14.046c-3.185 0-5.768-1.067-5.768-2.38 0-1.312 2.583-2.38 5.768-2.38 3.186 0 5.77 1.068 5.77 2.38 0 1.313-2.584 2.38-5.77 2.38z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0_4541_88183">
          <path
            fill="#fff"
            transform="translate(.008 .003)"
            d="M0 0h33.995v33.995H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoBalIcon = React.memo(BalIcon);
export default MemoBalIcon;
