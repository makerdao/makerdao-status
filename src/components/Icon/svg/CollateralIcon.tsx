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
      viewBox="0 -2 24 24"
      fill={fill}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.333 4.3a1.3 1.3 0 011.3-1.3h10.4c.417 0 .787.196 1.025.5H15c-3.18 0-4.296.825-4.848 2.1H5.633a1.3 1.3 0 01-1.3-1.3zm5.583 3.9H5.633a1.3 1.3 0 000 2.6h4.283V8.2zm0 5.2H5.633a1.3 1.3 0 100 2.6h4.283v-2.6zM0 14.7a1.3 1.3 0 112.6 0 1.3 1.3 0 01-2.6 0zm0-5.2a1.3 1.3 0 112.6 0 1.3 1.3 0 01-2.6 0zm0-5.2a1.3 1.3 0 112.6 0 1.3 1.3 0 01-2.6 0zM21.5 5a2 2 0 012 2v12a2 2 0 01-2 2H14a2 2 0 01-2-2V7a2 2 0 012-2h7.5zM15 8a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 5a1 1 0 011-1h4.5a1 1 0 110 2H15a1 1 0 01-1-1zm1 3a1 1 0 100 2h5.5a1 1 0 100-2H15z"
        fill={fill}
      />
    </svg>
  );
}

const MemoCollateralIcon = React.memo(CollateralIcon);
export default MemoCollateralIcon;
