import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function CompIcon({
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
        d="M15 27c6.627 0 12-5.373 12-12S21.627 3 15 3 3 8.373 3 15s5.373 12 12 12z"
        fill="#000"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.04 19.82v2.805c0 .383-.31.694-.693.694a.704.704 0 01-.369-.102L9.15 19.65a1.395 1.395 0 01-.665-1.19v-2.703c0-.32.262-.582.583-.582.102 0 .204.029.29.082l6.106 3.558c.36.208.578.592.578 1.005z"
        fill="#01D494"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.825 15.52v5.688c0 .17-.087.325-.233.402l-1.34.753a.18.18 0 01-.053.024v-3.16c0-.407-.213-.786-.567-1l-5.359-3.207v-3.563a.584.584 0 01.874-.505l6.1 3.563c.36.209.578.592.578 1.004z"
        fill="#01D494"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.502 19.63c0 .17-.092.325-.243.408l-1.266.684v-5.785c0-.412-.214-.786-.563-1l-5.485-3.285V7.269a.587.587 0 01.873-.505l6.106 3.548c.36.208.578.592.578 1.005v8.313z"
        fill="#01D494"
      />
    </svg>
  );
}

const MemoCompIcon = React.memo(CompIcon);
export default MemoCompIcon;
