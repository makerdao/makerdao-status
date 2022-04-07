import React, { PropsWithChildren } from 'react';
import { isChrome } from 'react-device-detect';

interface Props {
  ceiling: string;
  liquidationPenalty: string;
  debtFloor: string;
  stabilityFee: string;
  liquidationRatio: string;
}

function CollateralLegend({
  ceiling,
  liquidationPenalty,
  debtFloor,
  stabilityFee,
  liquidationRatio,
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
          <TspanTitle x={18} y={89.985}>
            Ceiling
          </TspanTitle>
        </text>
        <text
          fill="#B8C5D3"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={isChrome ? 63.635 : 68.635} y={89.985}>
            (
          </tspan>
          <tspan x={isChrome ? 120 : 130} y={89.985}>
            )
          </tspan>
        </text>
        <a
          href="md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-debt-ceiling.md"
          target="_blank"
          rel="noreferrer"
        >
          <text
            fill="#2F80ED"
            style={{
              whiteSpace: 'pre',
            }}
          >
            <TspanTitle x={isChrome ? 70 : 75} y={89.985}>
              Vat_line
            </TspanTitle>
          </text>
        </a>
        <text
          fill="#000"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x={18} y={133.86}>
            Liq. Penalty
          </TspanTitle>
        </text>
        <text
          fill="#000"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x={18} y={177.735}>
            Debt Floor
          </TspanTitle>
        </text>
        <text
          fill="#B8C5D3"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={isChrome ? 86.686 : 92} y={177.735}>
            (
          </tspan>
          <tspan x={isChrome ? 150.445 : 159} y={177.735}>
            )
          </tspan>
        </text>
        <a
          href="md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-debt-floor.md"
          target="_blank"
          rel="noreferrer"
        >
          <text
            fill="#2F80ED"
            style={{
              whiteSpace: 'pre',
            }}
          >
            <TspanTitle x={isChrome ? 93.566 : 98} y={177.735}>
              Vat_dust
            </TspanTitle>
          </text>
        </a>
        <text
          fill="#000"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x={18} y={221.61}>
            Stability fee
          </TspanTitle>
        </text>
        <text
          fill="#B8C5D3"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={isChrome ? 95.615 : 103} y={221.61}>
            (
          </tspan>
          <tspan x={isChrome ? 157.48 : 170} y={221.61}>
            )
          </tspan>
        </text>
        <a
          href="md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-stability-fee.md"
          target="_blank"
          rel="noreferrer"
        >
          <text
            fill="#2F80ED"
            style={{
              whiteSpace: 'pre',
            }}
          >
            <TspanTitle x={isChrome ? 100.496 : 108} y={221.61}>
              Jug_duty
            </TspanTitle>
          </text>
        </a>
        <g>
          <text
            fill="#000"
            style={{
              whiteSpace: 'pre',
            }}
          >
            <TspanTitle x={18} y={265.485}>
              Liq. Ratio
            </TspanTitle>
          </text>
          <text
            fill="#B8C5D3"
            style={{
              whiteSpace: 'pre',
            }}
          >
            <tspan x={isChrome ? 78.088 : 86} y={265.485}>
              (
            </tspan>
            <tspan x={isChrome ? 142.674 : 157} y={265.485}>
              )
            </tspan>
          </text>
          <a
            href="md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-liquidation-ratio.md"
            target="_blank"
            rel="noreferrer"
          >
            <text
              fill="#2F80ED"
              style={{
                whiteSpace: 'pre',
              }}
            >
              <TspanTitle x={isChrome ? 82.969 : 91} y={265.485}>
                Spot_mat
              </TspanTitle>
            </text>
          </a>
        </g>
        <text
          fill="#1AAB9B"
          textAnchor="end"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x="90%" y={89.985}>
            {ceiling}
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
            {liquidationPenalty}
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
            {debtFloor}
          </TspanTitle>
        </text>
        <text
          fill="#1AAB9B"
          textAnchor="end"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x="90%" y={221.61}>
            {stabilityFee}
          </TspanTitle>
        </text>
        <text
          fill="#1AAB9B"
          textAnchor="end"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x="90%" y={265.485}>
            {liquidationRatio}
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
