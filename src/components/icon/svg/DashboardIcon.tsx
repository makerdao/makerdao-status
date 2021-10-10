import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function DashboardIcon({
  width = 50,
  height = 50,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-4 -4 33 33"
      fill={fill}
      {...props}
    >
      <path
        d="M5.166 13.409H10.5c.489 0 .889-.4.889-.889V5.409c0-.489-.4-.889-.89-.889H5.167c-.489 0-.889.4-.889.889v7.111c0 .489.4.889.89.889zm0 7.111H10.5c.489 0 .889-.4.889-.889v-3.555c0-.49-.4-.89-.89-.89H5.167c-.489 0-.889.4-.889.89v3.555c0 .489.4.889.89.889zm8.89 0h5.333c.488 0 .888-.4.888-.889V12.52c0-.489-.4-.889-.889-.889h-5.333c-.489 0-.889.4-.889.889v7.111c0 .489.4.889.89.889zm-.89-15.111v3.555c0 .49.4.89.89.89h5.333c.488 0 .888-.4.888-.89V5.41c0-.489-.4-.889-.889-.889h-5.333c-.489 0-.889.4-.889.889z"
        fill={fill}
      />
    </svg>
  );
}

const MemoDashboardIcon = React.memo(DashboardIcon);
export default MemoDashboardIcon;
