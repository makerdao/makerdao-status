import React from 'react';
import MemoCollButtons from './deprecated_CollButtons';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CollAuctionButtons from './deprecated_CollAuctionButtons';
import MemoCollateralAuctionLegend from './deprecated_CollateralAuctionLegend';
import MemoCollateralLegend from './deprecated_CollateralLegend';

export type ButtonValues = 'collateral' | 'collateralAuction';
interface Props {
  buttonSelected: ButtonValues;
  onButtonSelect: (value: ButtonValues) => void;
  collateral: {
    ceiling: string;
    liquidationPenalty: string;
    debtFloor: string;
    stabilityFee: string;
    liquidationRatio: string;
  };
  collateralAuction: {
    minBidIncrease: string;
    bidDuration: string;
    auctionSize: string;
  };
}

function Legend({
  buttonSelected = 'collateral',
  // onButtonSelect,
  collateral,
  collateralAuction,
}: Props) {
  return (
    <>
      <svg
        width="280px"
        height="380px"
        x="462px"
        y="-21"
        viewBox="0 0 286 285"
        fill="none"
      >
        {buttonSelected === 'collateral' && (
          <>
            {/* TODO: this is momentary */}
            {/* <MemoCollButtons onButtonSelect={onButtonSelect} /> */}
            <MemoCollButtons />
          </>
        )}
      </svg>
      <svg
        width="280px"
        height="380px"
        x="400px"
        y="-21"
        viewBox="0 0 286 285"
        fill="none"
      >
        {buttonSelected === 'collateral' && (
          <>
            {/* TODO: this is momentary */}
            {/* <MemoCollButtons onButtonSelect={onButtonSelect} /> */}
            {/* <MemoCollButtons /> */}
            <MemoCollateralLegend {...collateral} />
          </>
        )}
        {buttonSelected === 'collateralAuction' && (
          <>
            {/* TODO: this is momentary */}
            {/* <CollAuctionButtons onButtonSelect={onButtonSelect} /> */}
            <MemoCollateralAuctionLegend {...collateralAuction} />
          </>
        )}
      </svg>
    </>
  );
}

const MemoPieChartLegend = React.memo(Legend);
export default MemoPieChartLegend;
