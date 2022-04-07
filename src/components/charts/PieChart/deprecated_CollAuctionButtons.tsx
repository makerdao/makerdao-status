import React from 'react';

export type ButtonValues = 'collateral' | 'collateralAuction';
interface Props {
  onButtonSelect: (value: ButtonValues) => void;
}

function CollAuctionButtons({ onButtonSelect }: Props) {
  const onClick = (value: ButtonValues) => () => {
    onButtonSelect(value);
  };
  return (
    <>
      <path
        onClick={onClick('collateral')}
        opacity={0.1}
        d="M0 16C0 10.477 4.477 6 10 6h138.002v39H10C4.477 45 0 40.523 0 35V16z"
        fill="#B8C5D3"
        style={{
          cursor: 'pointer',
        }}
      />
      <text
        onClick={onClick('collateral')}
        fill="#31394D"
        fillOpacity={0.5}
        style={{
          whiteSpace: 'pre',
          cursor: 'pointer',
        }}
        fontFamily="Roboto"
        fontSize={12}
        letterSpacing={0}
      >
        <tspan x={49.268} y={29.102}>
          Collateral
        </tspan>
      </text>
      <g filter="url(#prefix__filter0_d_2307:36738)">
        <g opacity={0.06} filter="url(#prefix__filter1_d_2307:36738)">
          <path
            onClick={onClick('collateralAuction')}
            d="M147.998 6h137c5.523 0 10 4.477 10 10v19c0 5.523-4.477 10-10 10h-137V6z"
            fill="#F8F9FB"
            style={{
              cursor: 'pointer',
            }}
          />
        </g>
        <text
          onClick={onClick('collateralAuction')}
          fill="#31394D"
          style={{
            whiteSpace: 'pre',
            cursor: 'pointer',
          }}
          fontFamily="Roboto"
          fontSize={15}
          fontWeight={500}
          letterSpacing={0}
        >
          <tspan x={163.63} y={30.127}>
            Collateral Auction
          </tspan>
        </text>
      </g>
      <defs>
        <filter
          id="prefix__filter0_d_2307:36738"
          x={142.998}
          y={2}
          width={157}
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
          <feColorMatrix values="0 0 0 0 0.5125 0 0 0 0 0.5125 0 0 0 0 0.5125 0 0 0 0.3 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2307:36738"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2307:36738"
            result="shape"
          />
        </filter>
        <filter
          id="prefix__filter1_d_2307:36738"
          x={138.968}
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
          <feGaussianBlur stdDeviation={4.515} />
          <feColorMatrix values="0 0 0 0 0.690196 0 0 0 0 0.745098 0 0 0 0 0.772549 0 0 0 0.25 0" />
          <feBlend
            mode="multiply"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2307:36738"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2307:36738"
            result="shape"
          />
        </filter>
      </defs>
    </>
  );
}

const MemoCollAuctionButtons = React.memo(CollAuctionButtons);
export default MemoCollAuctionButtons;
