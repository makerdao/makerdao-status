import React from 'react';

interface Props {
  ceiling: string;
  ceilingUtilization: string;
  minPerVault: string;
  stabilityFee: string;
  colRatio: string;
}

function CollateralLegend({
  ceiling,
  ceilingUtilization,
  minPerVault,
  stabilityFee,
  colRatio,
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
      <rect
        x={6}
        y={242}
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
            Ceiling
          </tspan>
        </text>
        <text
          fill="#B8C5D3"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={64.635} y={89.985}>
            (
          </tspan>
          <tspan x={119.295} y={89.985}>
            )
          </tspan>
        </text>
        <text
          fill="#2F80ED"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={69.516} y={89.985}>
            Vat_line
          </tspan>
        </text>
        <text
          fill="#000"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={18} y={133.86}>
            Ceiling Utilization
          </tspan>
        </text>
        <text
          fill="#000"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={18} y={177.735}>
            Min. per Vault
          </tspan>
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
          <tspan x={113.566} y={177.735}>
            Vat_dust
          </tspan>
        </text>
        <text
          fill="#000"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={18} y={221.61}>
            Stability fee
          </tspan>
        </text>
        <text
          fill="#B8C5D3"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={95.615} y={221.61}>
            (
          </tspan>
          <tspan x={157.48} y={221.61}>
            )
          </tspan>
        </text>
        <text
          fill="#2F80ED"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={100.496} y={221.61}>
            Jug_duty
          </tspan>
        </text>
        <g>
          <text
            fill="#000"
            style={{
              whiteSpace: 'pre',
            }}
          >
            <tspan x={18} y={265.485}>
              Col. ratio
            </tspan>
          </text>
          <text
            fill="#B8C5D3"
            style={{
              whiteSpace: 'pre',
            }}
          >
            <tspan x={78.088} y={265.485}>
              (
            </tspan>
            <tspan x={142.674} y={265.485}>
              )
            </tspan>
          </text>
          <text
            fill="#2F80ED"
            style={{
              whiteSpace: 'pre',
            }}
          >
            <tspan x={82.969} y={265.485}>
              Spot_mat
            </tspan>
          </text>
        </g>
        <text
          fill="#1AAB9B"
          textAnchor="end"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x="90%" y={89.985}>
            {ceiling}
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
            {ceilingUtilization}
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
            {minPerVault}
          </tspan>
        </text>
        <text
          fill="#1AAB9B"
          textAnchor="end"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x="90%" y={221.61}>
            {stabilityFee}
          </tspan>
        </text>
        <text
          fill="#1AAB9B"
          textAnchor="end"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x="90%" y={265.485}>
            {colRatio}
          </tspan>
        </text>
      </g>
    </>
  );
}

const MemoCollateralLegend = React.memo(CollateralLegend);
export default MemoCollateralLegend;
