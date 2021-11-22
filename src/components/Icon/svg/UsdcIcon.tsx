import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function UsdcIcon({
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
        d="M29.92 15c0 8.24-6.68 14.921-14.92 14.921-8.242 0-14.922-6.68-14.922-14.92C.078 6.76 6.758.078 15 .078 23.24.08 29.92 6.76 29.92 15z"
        fill="#B8C5D3"
      />
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={3}
        y={3}
        width={24}
        height={24}
      >
        <path d="M3 3h24v24H3V3z" fill="#fff" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 3c6.628 0 12 5.373 12 12s-5.372 12-12 12S3 21.627 3 15 8.372 3 15 3z"
          fill="#2775CA"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.749 23.343c0 .282-.221.443-.494.358a9.004 9.004 0 010-17.148c.273-.085.494.075.494.357v.697c0 .188-.146.41-.325.47-2.87 1.055-4.927 3.812-4.927 7.045s2.057 5.991 4.927 7.045a.543.543 0 01.325.47v.706z"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.746 20.75c0 .207-.169.377-.376.377h-.748a.378.378 0 01-.377-.377v-1.185c-1.637-.222-2.437-1.14-2.654-2.386a.35.35 0 01.348-.405h.857c.179 0 .33.127.367.306.16.743.588 1.313 1.901 1.313.97 0 1.657-.542 1.657-1.35 0-.81-.405-1.116-1.826-1.352-2.1-.282-3.092-.917-3.092-2.564 0-1.27.96-2.259 2.447-2.47V9.493c0-.207.17-.377.376-.377h.749c.207 0 .376.17.376.377v1.195c1.21.217 1.977.904 2.226 2.042a.348.348 0 01-.343.42h-.791a.381.381 0 01-.362-.278c-.212-.725-.73-1.035-1.629-1.035-.993 0-1.506.48-1.506 1.152 0 .71.292 1.068 1.817 1.29 2.061.282 3.125.87 3.125 2.626 0 1.332-.989 2.41-2.537 2.659v1.185h-.005z"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.744 23.7c-.273.086-.494-.075-.494-.357v-.696a.5.5 0 01.325-.47c2.87-1.055 4.927-3.813 4.927-7.045 0-3.233-2.057-5.99-4.927-7.045a.544.544 0 01-.325-.47V6.92c0-.282.221-.447.494-.358a9.005 9.005 0 016.259 8.574c-.005 4.005-2.63 7.402-6.259 8.565z"
        fill="#fff"
      />
    </svg>
  );
}

const MemoUsdcIcon = React.memo(UsdcIcon);
export default MemoUsdcIcon;
