/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

interface SummaryProps {
  title: string;
  subTitle: string;
  value?: string;
  href?: string | undefined;
}
interface Props {
  summaries: SummaryProps[];
}

function Summary({ summaries }: Props) {
  return (
    <svg viewBox="-110 -30 700 70" fill="none">
      <text
        fill="#1AAB9B"
        style={{
          whiteSpace: 'pre',
        }}
        fontFamily="Roboto"
        fontSize={24}
        letterSpacing={0}
      >
        <tspan textAnchor="end" x={130} y={22.203}>
          {summaries[0].value}
        </tspan>
      </text>
      <text
        fill="#31394D"
        style={{
          whiteSpace: 'pre',
        }}
        fontFamily="Roboto"
        fontSize={12}
        fontWeight="bold"
        letterSpacing={0}
      >
        <tspan x={136} y={11.102}>
          {summaries[0].title}
        </tspan>
      </text>
      <text
        fill="#748AA1"
        style={{
          whiteSpace: 'pre',
        }}
        fontFamily="Roboto"
        fontSize={12}
        letterSpacing={0}
      >
        <tspan x={136} y={25.102}>
          (
        </tspan>
        <tspan x={185.199} y={25.102}>
          )
        </tspan>
      </text>
      <a href={summaries[0].href} target="_blank" rel="noreferrer">
        <text
          fill="#2F80ED"
          style={{
            whiteSpace: 'pre',
          }}
          fontFamily="Roboto"
          fontSize={12}
          letterSpacing={0}
        >
          <tspan x={140.102} y={25.102}>
            {summaries[0].subTitle}
          </tspan>
        </text>
      </a>
      <text
        fill="#1AAB9B"
        style={{
          whiteSpace: 'pre',
        }}
        fontFamily="Roboto"
        fontSize={24}
        letterSpacing={0}
      >
        <tspan x={220.406} y={22.203}>
          {summaries[1].value}
        </tspan>
      </text>
      <text
        fill="#31394D"
        style={{
          whiteSpace: 'pre',
        }}
        fontFamily="Roboto"
        fontSize={12}
        fontWeight="bold"
        letterSpacing={0}
      >
        <tspan x={290} y={11.102}>
          {summaries[1].title}
        </tspan>
      </text>
      <text
        fill="#748AA1"
        style={{
          whiteSpace: 'pre',
        }}
        fontFamily="Roboto"
        fontSize={12}
        letterSpacing={0}
      >
        <tspan x={290} y={25.102}>
          (
        </tspan>
        <tspan x={345.312} y={25.102}>
          )
        </tspan>
      </text>
      <a href={summaries[1].href} target="_blank" rel="noreferrer">
        <text
          fill="#2F80ED"
          style={{
            whiteSpace: 'pre',
          }}
          fontFamily="Roboto"
          fontSize={12}
          letterSpacing={0}
        >
          <tspan x={294.102} y={25.102}>
            {summaries[1].subTitle}
          </tspan>
        </text>
      </a>
      <text
        fill="#1AAB9B"
        style={{
          whiteSpace: 'pre',
        }}
        fontFamily="Roboto"
        fontSize={24}
        letterSpacing={0}
      >
        <tspan x={414.832} y={22.203}>
          {summaries[2].value}
        </tspan>
      </text>
      <text
        fill="#31394D"
        style={{
          whiteSpace: 'pre',
        }}
        fontFamily="Roboto"
        fontSize={12}
        fontWeight="bold"
        letterSpacing={0}
      >
        <tspan x={486} y={11.102}>
          {summaries[2].title}
        </tspan>
      </text>
      <text
        fill="#748AA1"
        style={{
          whiteSpace: 'pre',
        }}
        fontFamily="Roboto"
        fontSize={12}
        letterSpacing={0}
      >
        <tspan x={486} y={25.102}>
          (
        </tspan>
        <tspan x={530.801} y={25.102}>
          )
        </tspan>
      </text>
      <a href={summaries[2].href} target="_blank" rel="noreferrer">
        <text
          fill="#2F80ED"
          style={{
            whiteSpace: 'pre',
          }}
          fontFamily="Roboto"
          fontSize={12}
          letterSpacing={0}
        >
          <tspan x={490.102} y={25.102}>
            {summaries[2].subTitle}
          </tspan>
        </text>
      </a>
    </svg>
  );
}

const MemoSummary = React.memo(Summary);
export default MemoSummary;
