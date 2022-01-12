import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function ReadmeIcon({
  width = 50,
  height = 50,
  fill = '#0969da',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill={fill}
      {...props}
    >
      <path
        d="M15.482 16H1.935V2H8.71V0H1.935C1.422 0 .93.21.567.586A2.034 2.034 0 000 2v14c0 .53.204 1.04.567 1.414.363.375.855.586 1.368.586h13.547a1.91 1.91 0 001.367-.587A2.04 2.04 0 0017.417 16V9h-1.935v7zM10.644 0v2h3.474l-9.512 9.83 1.364 1.41 9.512-9.83V7h1.935V0h-6.773z"
        fill={fill}
      />
    </svg>
  );
}

const MemoReadmeIcon = React.memo(ReadmeIcon);
export default MemoReadmeIcon;
