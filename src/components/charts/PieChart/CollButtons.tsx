import React from 'react';

export type ButtonValues = 'collateral' | 'collateralAuction';
interface Props {
  onButtonSelect?: (value: ButtonValues) => void;
}

function CollButtons({ onButtonSelect = () => {} }: Props) {
  const onClick = (value: ButtonValues) => () => {
    onButtonSelect(value);
  };
  return (
    <>
      {/* TODO: this is momentary */}
      {/* <path
        onClick={onClick('collateralAuction')}
        opacity={0.1}
        d="M157 6h138.002c5.523 0 10 4.477 10 10v19c0 5.523-4.477 10-10 10H157V6z"
        fill="#B8C5D3"
        style={{
          cursor: 'pointer',
        }}
      />
      <text
        onClick={onClick('collateralAuction')}
        fill="#31394D"
        fillOpacity={0.5}
        style={{
          whiteSpace: 'pre',
          cursor: 'pointer',
        }}
        fontFamily="Roboto"
        fontSize={12}
        letterSpacing={0}>
        <tspan x={184.295} y={29.102}>
          Collateral Auction
        </tspan>
      </text> */}
      <g filter="url(#prefix__filter0_d_2307:36659)">
        <g opacity={0.06} filter="url(#prefix__filter1_d_2307:36659)">
          <path
            onClick={onClick('collateral')}
            d="M10 16c0-5.523 4.477-10 10-10h137v39H20c-5.523 0-10-4.477-10-10V16z"
            fill="#fff"
            style={{
              cursor: 'pointer',
            }}
          />
        </g>
        <text
          onClick={onClick('collateral')}
          fill="#31394D"
          style={{
            whiteSpace: 'pre',
            cursor: 'pointer',
          }}
          letterSpacing={0}
        >
          <tspan
            x={51.406}
            y={30.999}
            fontFamily="Roboto"
            fontSize={15}
            fontWeight="bold"
            fontStyle="normal"
            style={{
              lineHeight: 18,
            }}
          >
            Collateral
          </tspan>
        </text>
      </g>
      <defs>
        <filter
          id="prefix__filter0_d_2307:36659"
          x={7.5}
          y={2}
          width={151}
          height={49}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={2.5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.5125 0 0 0 0 0.5125 0 0 0 0 0.5125 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2307:36659"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2307:36659"
            result="shape"
          />
        </filter>
        <filter
          id="prefix__filter1_d_2307:36659"
          x={0.97}
          y={0.97}
          width={165.06}
          height={57.06}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={97.515} />
          <feColorMatrix values="0 0 0 0 0.690196 0 0 0 0 0.745098 0 0 0 0 0.772549 0 0 0 0.25 0" />
          <feBlend
            mode="multiply"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2307:36659"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2307:36659"
            result="shape"
          />
        </filter>
      </defs>
    </>
  );
}

const MemoCollButtons = React.memo(CollButtons);
export default MemoCollButtons;
