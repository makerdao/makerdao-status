import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function LinkIcon({
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
        d="M14.942 3L12.76 4.255 6.815 7.69 4.633 8.945v11.891l2.182 1.255 6 3.436 2.181 1.255 2.182-1.255 5.891-3.436 2.182-1.255V8.946L23.069 7.69l-5.945-3.436L14.942 3zM8.996 18.327v-6.873l5.946-3.436 5.945 3.436v6.873l-5.945 3.437-5.946-3.437z"
        fill="#2A5ADA"
      />
    </svg>
  );
}

const MemoLinkIcon = React.memo(LinkIcon);
export default MemoLinkIcon;
