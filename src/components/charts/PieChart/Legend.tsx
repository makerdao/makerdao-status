import React from 'react';
import MemoCollButtons from './CollButtons';
import CollAuctionButtons from './CollAuctionButtons';
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
        <>
          <MemoCollButtons onButtonSelect={onButtonSelect} />
          <MemoCollateralLegend {...collateral} />
        </>
      )}
      {buttonSelected === 'collateralAuction' && (
        <>
          <CollAuctionButtons onButtonSelect={onButtonSelect} />
          <MemoCollateralAuctionLegend {...collateralAuction} />
        </>
      )}
    </svg>
  );
}

const MemoPieChartLegend = React.memo(Legend);
export default MemoPieChartLegend;
