import React, { PropsWithChildren } from 'react';
import MemoCollateralAuctionLegend from './CollateralAuctionLegend';
import MemoCollateralLegend from './CollateralLegend';

export type ButtonValues = 'collateral' | 'collateralAuction';
interface Props {
  buttonSelected: ButtonValues;
  onButtonSelect: (value: ButtonValues) => void;
  collateral: {
    ceiling: string;
    ceilingUtilization: string;
    minPerVault: string;
    stabilityFee: string;
    colRatio: string;
  };
  collateralAuction: {
    minBidIncrease: string;
    bidDuration: string;
    auctionSize: string;
  };
}

function Legend({
  buttonSelected = 'collateral',
  onButtonSelect,
  collateral,
  collateralAuction,
}: Props) {
  const onClick = (value: ButtonValues) => () => {
    onButtonSelect(value);
  };
  const SelectedContainer = ({
    children,
    selected,
  }: PropsWithChildren<{ selected: boolean }>) => {
    if (selected) {
      return (
        <g filter="url(#prefix__filter0_d_3932:1308)">
          <g opacity={0.06} filter="url(#prefix__filter1_d_3932:1308)">
            <path
              onClick={onClick('collateral')}
              d="M0 10C0 4.477 4.477 0 10 0h137v39H10C4.477 39 0 34.523 0 29V10z"
              fill="#fff"
              style={{
                cursor: 'pointer',
              }}
            />
          </g>
          {children}
        </g>
      );
    }
    return (
      <g>
        <path
          onClick={onClick('collateralAuction')}
          opacity={0.1}
          d="M147 0h138.002c5.523 0 10 4.477 10 10v19c0 5.523-4.477 10-10 10H147V0z"
          fill="#B8C5D3"
          style={{
            cursor: 'pointer',
          }}
        />
        {children}
      </g>
    );
  };

  return (
    <svg
      width="240px"
      height="230px"
      x="240px"
      y="25"
      viewBox="0 0 306 285"
      fill="none"
    >
      {buttonSelected === 'collateral' && (
        <MemoCollateralLegend {...collateral} />
      )}
      {buttonSelected === 'collateralAuction' && (
        <MemoCollateralAuctionLegend {...collateralAuction} />
      )}
      <SelectedContainer selected={false}>
        <text
          fill="#31394D"
          fillOpacity={0.5}
          onClick={onClick('collateralAuction')}
          style={{
            whiteSpace: 'pre',
            cursor: 'pointer',
          }}
          fontFamily="Roboto"
          fontSize={12}
          letterSpacing={0}
        >
          <tspan x={174.295} y={23.102}>
            Collateral Auction
          </tspan>
        </text>
      </SelectedContainer>
      <SelectedContainer selected>
        <text
          fill="#31394D"
          onClick={onClick('collateral')}
          style={{
            whiteSpace: 'pre',
            cursor: 'pointer',
          }}
          fontFamily="Roboto"
          fontSize={15}
          fontWeight={500}
          letterSpacing={0}
        >
          <tspan x={41.406} y={24.127}>
            Collateral
          </tspan>
        </text>
      </SelectedContainer>
      <defs>
        <filter
          id="prefix__filter0_d_3932:1308"
          x={-5}
          y={-4}
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
            result="effect1_dropShadow_3932:1308"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3932:1308"
            result="shape"
          />
        </filter>
        <filter
          id="prefix__filter1_d_3932:1308"
          x={-9.03}
          y={-5.03}
          width={165.06}
          height={57.06}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3932:1308"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

const MemoPieChartLegend = React.memo(Legend);
export default MemoPieChartLegend;
