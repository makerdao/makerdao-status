import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function OverviewIcon({
  width = 50,
  height = 50,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 56 38"
      fill={fill}
      {...props}
    >
      <path
        d="M22.75 12.467c0-.902.731-1.633 1.633-1.633h12.484a1.633 1.633 0 010 3.266H24.383a1.633 1.633 0 01-1.633-1.633z"
        fill="#F5F6FA"
      />
      <path
        d="M22.75 12.467c0-.902.731-1.633 1.633-1.633h12.484a1.633 1.633 0 010 3.266H24.383a1.633 1.633 0 01-1.633-1.633z"
        stroke="#F5F6FA"
      />
      <path
        d="M22.75 19c0-.902.731-1.633 1.633-1.633h12.484a1.633 1.633 0 010 3.266H24.383A1.633 1.633 0 0122.75 19z"
        fill="#F5F6FA"
      />
      <path
        d="M22.75 19c0-.902.731-1.633 1.633-1.633h12.484a1.633 1.633 0 010 3.266H24.383A1.633 1.633 0 0122.75 19z"
        stroke="#F5F6FA"
      />
      <path
        d="M22.75 25.533c0-.902.731-1.633 1.633-1.633h12.484a1.633 1.633 0 010 3.267H24.383a1.633 1.633 0 01-1.633-1.634z"
        fill="#F5F6FA"
      />
      <path
        d="M22.75 25.533c0-.902.731-1.633 1.633-1.633h12.484a1.633 1.633 0 010 3.267H24.383a1.633 1.633 0 01-1.633-1.634z"
        stroke="#F5F6FA"
      />
      <path
        d="M17.5 25.475a1.575 1.575 0 013.15 0v.117a1.575 1.575 0 01-3.15 0v-.117z"
        fill="#F5F6FA"
      />
      <path
        d="M17.5 25.475a1.575 1.575 0 013.15 0v.117a1.575 1.575 0 01-3.15 0v-.117z"
        stroke="#F5F6FA"
      />
      <path
        d="M17.5 18.942a1.575 1.575 0 013.15 0v.116a1.575 1.575 0 01-3.15 0v-.116z"
        fill="#F5F6FA"
      />
      <path
        d="M17.5 18.942a1.575 1.575 0 013.15 0v.116a1.575 1.575 0 01-3.15 0v-.116z"
        stroke="#F5F6FA"
      />
      <path
        d="M17.5 12.409a1.575 1.575 0 113.15 0v.116a1.575 1.575 0 01-3.15 0v-.117z"
        fill="#F5F6FA"
      />
      <path
        d="M17.5 12.409a1.575 1.575 0 113.15 0v.116a1.575 1.575 0 01-3.15 0v-.117z"
        stroke="#F5F6FA"
      />
    </svg>
  );
}

const MemoOverview = React.memo(OverviewIcon);
export default MemoOverview;
