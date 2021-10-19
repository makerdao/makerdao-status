import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function CollateralIcon({
  width = 50,
  height = 50,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="15 5 29 27"
      fill={fill}
      {...props}
    >
      <path
        d="M38.8 20.8h-2.4v2.4h.84c.199 0 .36.135.36.3v.6c0 .165-.161.3-.36.3H18.76c-.199 0-.36-.135-.36-.3v-.6c0-.165.161-.3.36-.3h.84v-2.4h-2.4c-.664 0-1.2.536-1.2 1.2v3.6c0 .664.536 1.2 1.2 1.2h21.6c.664 0 1.2-.536 1.2-1.2V22c0-.664-.536-1.2-1.2-1.2zm-3.6 2.4V11.211A1.21 1.21 0 0033.989 10H22.015c-.671 0-1.215.544-1.215 1.211V23.2h14.4zm-11.28-6.825l.956-.949a.4.4 0 01.57.004l1.549 1.56 3.57-3.54a.4.4 0 01.57.004l.949.956a.4.4 0 01-.004.57l-4.811 4.77a.4.4 0 01-.57-.004l-2.779-2.801a.4.4 0 010-.57z"
        fill={fill}
      />
    </svg>
  );
}

const MemoCollateralIcon = React.memo(CollateralIcon);
export default MemoCollateralIcon;
