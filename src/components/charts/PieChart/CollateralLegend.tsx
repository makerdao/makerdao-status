import React, { PropsWithChildren } from 'react';
import { isSafari } from 'react-device-detect';

interface Props {
  ceiling: string;
  ceilingUtilization: string;
  minPerVault: string;
  stabilityFee: string;
  colRatio: string;
}

const factorInSafari = 10;

function CollateralLegend({
  ceiling,
  ceilingUtilization,
  minPerVault,
  stabilityFee,
  colRatio,
}: Props) {
  const additionalTextsSpace = (value: number) =>
    value + (isSafari ? factorInSafari : 1);
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
          <tspan x={additionalTextsSpace(64.635)} y={89.985}>
            (
          </tspan>
          <tspan x={additionalTextsSpace(119.295)} y={89.985}>
            )
          </tspan>
        </text>
        <text
          fill="#2F80ED"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x={additionalTextsSpace(69.516)} y={89.985}>
            Vat_line
          </TspanTitle>
        </text>
        <text
          fill="#000"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x={18} y={133.86}>
            Ceiling Utilization
          </TspanTitle>
        </text>
        <text
          fill="#000"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x={18} y={177.735}>
            Min. per Vault
          </TspanTitle>
        </text>
        <text
          fill="#B8C5D3"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <tspan x={additionalTextsSpace(108.686)} y={177.735}>
            (
          </tspan>
          <tspan x={additionalTextsSpace(168.445)} y={177.735}>
            )
          </tspan>
        </text>
        <text
          fill="#2F80ED"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x={additionalTextsSpace(113.566)} y={177.735}>
            Vat_dust
          </TspanTitle>
        </text>
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
          <tspan x={additionalTextsSpace(95.615)} y={221.61}>
            (
          </tspan>
          <tspan x={additionalTextsSpace(157.48)} y={221.61}>
            )
          </tspan>
        </text>
        <text
          fill="#2F80ED"
          style={{
            whiteSpace: 'pre',
          }}
        >
          <TspanTitle x={additionalTextsSpace(100.496)} y={221.61}>
            Jug_duty
          </TspanTitle>
        </text>
        <g>
          <text
            fill="#000"
            style={{
              whiteSpace: 'pre',
            }}
          >
            <TspanTitle x={18} y={265.485}>
              Col. ratio
            </TspanTitle>
          </text>
          <text
            fill="#B8C5D3"
            style={{
              whiteSpace: 'pre',
            }}
          >
            <tspan x={additionalTextsSpace(78.088)} y={265.485}>
              (
            </tspan>
            <tspan x={additionalTextsSpace(142.674)} y={265.485}>
              )
            </tspan>
          </text>
          <text
            fill="#2F80ED"
            style={{
              whiteSpace: 'pre',
            }}
          >
            <TspanTitle x={additionalTextsSpace(82.969)} y={265.485}>
              Spot_mat
            </TspanTitle>
          </text>
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
            {ceilingUtilization}
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
            {minPerVault}
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
            {colRatio}
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
