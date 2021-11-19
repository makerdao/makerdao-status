import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function MaticIcon({
  width = 50,
  height = 50,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill={fill}
      {...props}
    >
      <path
        opacity={0.2}
        d="M29.92 15c0 8.24-6.68 14.921-14.92 14.921-8.242 0-14.922-6.68-14.922-14.92C.078 6.76 6.758.078 15 .078 23.24.08 29.92 6.76 29.92 15"
        fill="#B8C5D3"
      />
      <path
        d="M12.758 13.97l2.24 4.886 3.33-1.892h.006v-3.786l-5.576.791z"
        fill="#2BBDF7"
      />
      <path
        d="M22.635 10.339l-2.077-.768-2.222-.18v11.797l3.333 1.894 2.658-5.333-1.686-5.13-.006-2.28z"
        fill="#2891F9"
      />
      <path
        d="M22.44 9.392l-.772 1.894v11.766l3.333-1.894V9.392h-2.56z"
        fill="#2BBDF7"
      />
      <path
        d="M21.669 7.5l-3.333 1.892 3.333 1.894L25 9.392 21.67 7.5z"
        fill="#2B6DEF"
      />
      <path
        d="M15 15.07l-3.333-3.678-6.667-2v11.766l3.333 1.894.955-6.512 2.38.424L15 18.856V15.07z"
        fill="#2891F9"
      />
      <path
        d="M8.333 7.5L5 9.392l10 5.678 1.511-.856 1.824-1.036L8.333 7.5z"
        fill="#2B6DEF"
      />
      <path
        d="M8.332 15.07v7.982l3.335-1.894v-4.194L8.332 15.07z"
        fill="#2BBDF7"
      />
    </svg>
  );
}

const MemoMaticIcon = React.memo(MaticIcon);
export default MemoMaticIcon;
