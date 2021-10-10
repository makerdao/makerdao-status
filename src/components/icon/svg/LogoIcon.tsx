import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function LogoIcon({
  width = 34,
  height = 34,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} fill={fill} {...props}>
      <path
        d="M3.78 6.496l-.822-.687V20.5H1.5V4.597c0-.48.242-.826.537-.99a.802.802 0 01.939.1h0l11.677 9.771h0c.238.199.393.525.393.89v6.13h-1.459v-5.794l-.179-.15-9.629-8.058zM32.5 4.596V20.5h-1.623V5.851l-.808.635-10.271 8.058-.191.15V20.5h-1.623v-6.13c0-.353.159-.677.418-.88h0l12.456-9.772h.001c.647-.51 1.64-.06 1.64.878z"
        fill="#F5F6FA"
        stroke="#F5F6FA"
      />
      <path stroke="#F5F6FA" d="M1 30.5h32" />
    </svg>
  );
}

const MemoLogoIcon = React.memo(LogoIcon);
export default MemoLogoIcon;
