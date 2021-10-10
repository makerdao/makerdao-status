import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function FeedbackIcon({
  width = 50,
  height = 50,
  fill = 'white',
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 15"
      fill={fill}
      {...props}
    >
      <path
        d="M13.527 2.034v0c0-.571-.463-1.034-1.034-1.034H3.249A2.25 2.25 0 001 3.25v5.96a2.25 2.25 0 002.25 2.25h1.013v1.238c0 .512.628.758.975.382l.163-.176a4.499 4.499 0 013.303-1.445h2.574a2.25 2.25 0 002.249-2.249v-.366"
        stroke="#2F80ED"
        strokeWidth={1.125}
      />
      <path
        stroke="#2F80ED"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.237 3.742h5.929M4.237 6.296H8.22M4.237 8.708h1.794"
      />
      <path
        d="M14.396 3.158a.853.853 0 111.206 1.206l-3.684 3.683a1.686 1.686 0 01-1.12.493l-.667.028.054-.639-.56-.048.56.048c.034-.396.207-.768.488-1.049l3.723-3.722zM13.591 4.022l1.214 1.214"
        stroke="#2F80ED"
        strokeWidth={1.125}
      />
    </svg>
  );
}

const MemoFeedbackIcon = React.memo(FeedbackIcon);
export default MemoFeedbackIcon;
