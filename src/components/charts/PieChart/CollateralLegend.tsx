import React, { PropsWithChildren } from 'react';

interface Props {
  colRatio: string;
  stabilityFee: string;
  debtCeiling: string;
}

function CollateralLegend({ debtCeiling, stabilityFee, colRatio }: Props) {
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
          <TspanTitle x={18} y={89.985}>
            Col. ratio
          </TspanTitle>
        </text>
        <text
          fill="#B8C5D3"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={76.635} y={89.985}>
            (
          </tspan>
          <tspan x={141.295} y={89.985}>
            )
          </tspan>
        </text>
        <text
          fill="#2F80ED"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x={81.516} y={89.985}>
            Spot_mat
          </TspanTitle>
        </text>
        <text
          fill="#000"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x={18} y={133.86}>
            Debt Ceiling
          </TspanTitle>
        </text>
        <text
          fill="#000"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x={18} y={177.735}>
            Stability fee
          </TspanTitle>
        </text>
        <text
          fill="#B8C5D3"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={108.686} y={177.735}>
            (
          </tspan>
          <tspan x={168.445} y={177.735}>
            )
          </tspan>
        </text>
        <text
          fill="#2F80ED"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x={113.566} y={177.735}>
            Jug_duty
          </TspanTitle>
        </text>

        <text
          fill="#1AAB9B"
          textAnchor="end"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x="90%" y={89.985}>
            {colRatio}
          </TspanTitle>
        </text>
        <text
          fill="#1AAB9B"
          textAnchor="end"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x="90%" y={133.86}>
            {debtCeiling}
          </TspanTitle>
        </text>
        <text
          fill="#1AAB9B"
          textAnchor="end"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x="90%" y={177.735}>
            {stabilityFee}
          </TspanTitle>
        </text>
      </g>
    </>
  );
}

const TspanTitle = ({
  children,
  ...rest
}: PropsWithChildren<React.SVGProps<SVGTSpanElement>>) => (
  <tspan
    x={18}
    y={89.985}
    fontFamily="Roboto"
    fontSize={14}
    fontWeight="bold"
    fontStyle="normal"
    style={{
      lineHeight: 16,
    }}
    {...rest}
  >
    {children}
  </tspan>
);

const MemoCollateralLegend = React.memo(CollateralLegend);
export default MemoCollateralLegend;
