import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function AaveIcon({
  width = 50,
  height = 50,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 30 30" width={width} height={height} {...props}>
      <path
        opacity={0.2}
        d="M29.92 15c0 8.24-6.68 14.921-14.92 14.921-8.242 0-14.922-6.68-14.922-14.92C.078 6.76 6.758.078 15 .078 23.24.08 29.92 6.76 29.92 15z"
        fill="#B8C5D3"
      />
      <path
        d="M15 26.64c6.428 0 11.64-5.211 11.64-11.64S21.427 3.36 15 3.36C8.57 3.36 3.36 8.571 3.36 15S8.57 26.64 15 26.64z"
        fill="url(#prefix__paint0_linear_4559_88379)"
      />
      <path
        d="M20.094 19.638l-3.936-9.516c-.222-.492-.552-.732-.987-.732h-.348c-.435 0-.765.24-.987.732l-1.713 4.146h-1.296a.71.71 0 00-.705.705v.009a.712.712 0 00.705.705h.696l-1.635 3.951a.825.825 0 00-.048.27c0 .222.069.396.192.531s.3.201.522.201a.698.698 0 00.405-.135.877.877 0 00.282-.357l1.8-4.464h1.248a.71.71 0 00.705-.705v-.018a.712.712 0 00-.705-.705h-.666l1.374-3.423 3.744 9.312c.069.144.156.27.282.357a.705.705 0 00.405.135c.222 0 .396-.066.522-.201a.744.744 0 00.192-.531.63.63 0 00-.048-.267z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_4559_88379"
          x1={23.678}
          y1={7.698}
          x2={6.358}
          y2={22.271}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B6509E" />
          <stop offset={1} stopColor="#2EBAC6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const MemoAaveIcon = React.memo(AaveIcon);
export default MemoAaveIcon;
