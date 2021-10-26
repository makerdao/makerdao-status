import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function ManaIcon({
  width = 50,
  height = 50,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-0.006 0 40 40" width={width} height={height} {...props}>
      <defs>
        <linearGradient
          x1="85.355%"
          y1="14.645%"
          x2="14.645%"
          y2="85.355%"
          id="prefix__a"
        >
          <stop stopColor="#FF2D55" offset={0} />
          <stop stopColor="#FFBC5B" offset={1} />
        </linearGradient>
        <linearGradient
          x1="49.966%"
          y1="0%"
          x2="49.966%"
          y2="100%"
          id="prefix__b"
        >
          <stop stopColor="#A524B3" offset={0} />
          <stop stopColor="#FF2D55" offset={1} />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(38.534 39.399)">
        <circle fill="url(#prefix__a)" cx={-18.54} cy={-19.399} r={20} />
        <path fill="url(#prefix__b)" d="M-24.37-26.399v15h12.5z" />
        <path fill="#FFF" d="M-36.87-11.399h12.5v-15z" />
        <path
          d="M-34.54-7.399c1.14 1.51 2.49 2.86 4 4h24c1.51-1.14 2.86-2.49 4-4h-32z"
          fill="#FC9965"
        />
        <path
          d="M-30.54-3.399c3.34 2.51 7.5 4 12 4s8.66-1.49 12-4h-24z"
          fill="#FF2D55"
        />
        <path fill="url(#prefix__b)" d="M-11.71-18.399v11h9.17z" />
        <path
          d="M-11.71-11.399h-25.16c.62 1.43 1.41 2.77 2.33 4h22.84v-4h-.01z"
          fill="#FFBC5B"
        />
        <path fill="#FFF" d="M-20.87-7.399h9.16v-11z" />
        <circle fill="#FFC95B" cx={-11.71} cy={-26.399} r={5} />
        <circle fill="#FFC95B" cx={-24.37} cy={-31.899} r={2.5} />
      </g>
    </svg>
  );
}

const MemoManaIcon = React.memo(ManaIcon);
export default MemoManaIcon;
