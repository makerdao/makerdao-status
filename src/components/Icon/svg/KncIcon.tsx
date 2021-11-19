import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function KncIcon({
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
      <g clipPath="url(#prefix__clip0_4541_87891)" fill="#31CB9E">
        <path d="M14.16 14.998l8.949 5.126a.472.472 0 00.716-.408v-9.443a.47.47 0 00-.716-.404l-8.949 5.13zM22.918 7.6L16.8 3.1a.486.486 0 00-.766.258L13.801 13.38l9.063-5.01a.452.452 0 00.054-.77zM16.793 26.893l6.125-4.5a.459.459 0 00-.05-.78L13.8 16.602l2.233 10.022a.483.483 0 00.76.276" />
        <path d="M11.832 14.812L14.16 3.931a.463.463 0 00-.716-.47l-5.96 4.572A1.235 1.235 0 007 9.017v11.597a1.235 1.235 0 00.483.999l5.932 4.557a.462.462 0 00.715-.47l-2.298-10.888z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0_4541_87891">
          <path fill="#fff" transform="translate(3 3)" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoKncIcon = React.memo(KncIcon);
export default MemoKncIcon;
