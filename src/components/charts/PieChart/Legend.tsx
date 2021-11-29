import React from 'react';
import MemoCollButtons from './CollButtons';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CollAuctionButtons from './CollAuctionButtons';
import MemoCollateralAuctionLegend from './CollateralAuctionLegend';
import MemoCollateralLegend from './CollateralLegend';

export type ButtonValues = 'collateral' | 'collateralAuction';
interface Props {
  buttonSelected: ButtonValues;
  onButtonSelect: (value: ButtonValues) => void;
  collateral: {
    colRatio: string;
    stabilityFee: string;
    debtCeiling: string;
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
