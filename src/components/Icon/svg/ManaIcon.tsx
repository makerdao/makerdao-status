import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function ManaIcon({
  width = 50,
  height = 50,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 30 30" width={width} height={height} {...props}>
      <path
        opacity={0.2}
        d="M29.92 15c0 8.24-6.68 14.921-14.92 14.921-8.242 0-14.922-6.68-14.922-14.92C.078 6.76 6.758.078 15 .078 23.24.08 29.92 6.76 29.92 15"
        fill="#B8C5D3"
      />
      <path
        d="M15 27c6.627 0 12-5.373 12-12S21.627 3 15 3 3 8.373 3 15s5.373 12 12 12z"
        fill="url(#prefix__paint0_linear_4541_87963)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.504 10.8v9h7.5l-7.5-9z"
        fill="url(#prefix__paint1_linear_4541_87963)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.004 19.8h7.5v-9l-7.5 9z"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.398 22.2a12.29 12.29 0 002.4 2.4h14.4a12.29 12.29 0 002.4-2.4h-19.2z"
        fill="#FC9965"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.8 24.6A11.95 11.95 0 0015 27c2.7 0 5.197-.894 7.2-2.4H7.8z"
        fill="#FF2D55"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.098 15.6v6.6H24.6l-5.502-6.6z"
        fill="url(#prefix__paint2_linear_4541_87963)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.1 19.8H4.004c.372.858.846 1.662 1.398 2.4h13.704v-2.4H19.1z"
        fill="#FFBC5B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.602 22.2h5.495v-6.6l-5.495 6.6z"
        fill="#fff"
      />
      <path
        d="M19.098 13.8a3 3 0 100-6 3 3 0 000 6zM11.504 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        fill="#FFC95B"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_4541_87963"
          x1={23.485}
          y1={6.515}
          x2={6.515}
          y2={23.485}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2D55" />
          <stop offset={1} stopColor="#FFBC5B" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_4541_87963"
          x1={15.251}
          y1={10.8}
          x2={15.251}
          y2={19.8}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A524B3" />
          <stop offset={1} stopColor="#FF2D55" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_4541_87963"
          x1={21.847}
          y1={15.6}
          x2={21.847}
          y2={22.2}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A524B3" />
          <stop offset={1} stopColor="#FF2D55" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const MemoManaIcon = React.memo(ManaIcon);
export default MemoManaIcon;
