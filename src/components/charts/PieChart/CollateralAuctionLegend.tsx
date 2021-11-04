import React from 'react';

interface Props {
  minBidIncrease: string;
  bidDuration: string;
  auctionSize: string;
}

function CollateralAuctionLegend({
  minBidIncrease,
  bidDuration,
  auctionSize,
}: Props) {
  return (
    <>
      <rect
        x={6}
        y={66}
        width={283}
        height={37}
        rx={18.5}
        fill="#1AAB9B"
        fillOpacity={0.1}
      />
      <rect
        x={6}
        y={154}
        width={283}
        height={37}
        rx={18.5}
        fill="#1AAB9B"
        fillOpacity={0.1}
      />
      <g fontFamily="Roboto" fontSize={14} fontWeight={500} letterSpacing={0}>
        <text
          fill="#2F2F2F"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={18} y={89.985}>
            Min. bid increase
          </tspan>
        </text>
        <text
          fill="#B8C5D3"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x="42%" y={89.985}>
            (
          </tspan>
          <tspan x="50.8%" y={89.985}>
            )
          </tspan>
        </text>
        <text
          fill="#2F80ED"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x="43.4%" y={89.985}>
            beg
          </tspan>
        </text>
        <text
          fill="#000"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={18} y={133.86}>
            Bid duration
          </tspan>
        </text>
        <text
          fill="#B8C5D3"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x="42%" y={89.985}>
            (
          </tspan>
          <tspan x="50.8%" y={89.985}>
            )
          </tspan>
        </text>
        <text
          fill="#2F80ED"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x="43.4%" y={89.985}>
            beg
          </tspan>
        </text>
        <text
          fill="#000"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={18} y={177.735}>
            Auction size
          </tspan>
        </text>
        <text
          fill="#B8C5D3"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x="33%" y={177.735}>
            (
          </tspan>
          <tspan x="44.5%" y={177.735}>
            )
          </tspan>
        </text>
        <text
          fill="#2F80ED"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x="34.4%" y={177.735}>
            dunk
          </tspan>
        </text>

        <text
          fill="#1AAB9B"
          textAnchor="end"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x="90%" y={89.985}>
            {minBidIncrease}
          </tspan>
        </text>
        <text
          fill="#1AAB9B"
          textAnchor="end"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x="90%" y={133.86}>
            {bidDuration}
          </tspan>
        </text>
        <text
          fill="#1AAB9B"
          textAnchor="end"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x="90%" y={177.735}>
            {auctionSize}
          </tspan>
        </text>
      </g>
    </>
  );
}

const MemoCollateralAuctionLegend = React.memo(CollateralAuctionLegend);
export default MemoCollateralAuctionLegend;
