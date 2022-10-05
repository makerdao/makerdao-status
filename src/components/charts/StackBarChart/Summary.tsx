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

const SUMMARIES_POS = [
  {
    xText1: 238, // before: 130
    yText1: 22.203,
    xText2: 245, // before: 136
    yText2: 11.102,
    xText3: 266, // before: 136
    yText3: 25.102,
    xText4: 319, // before: 189
    yText4: 25.102,
    xText5: 272, // before: 142
    yText5: 25.102,
  },
  {
    xText1: 285,
    yText1: 22.203,
    xText2: 290,
    yText2: 11.102,
    xText3: 290,
    yText3: 25.102,
    xText4: 349,
    yText4: 25.102,
    xText5: 295.102,
    yText5: 25.102,
  },
  {
    xText1: 479.102,
    yText1: 22.203,
    xText2: 486,
    yText2: 11.102,
    xText3: 486,
    yText3: 25.102,
    xText4: 534,
    yText4: 25.102,
    xText5: 492,
    yText5: 25.102,
  },
];

function Summary({ summaries }: Props) {
  const onlyCelling = [summaries[0]];

  return (
    <svg viewBox="-110 -30 700 70" fill="none">
      {onlyCelling.map((summary, index) => (
        <React.Fragment key={summary.title}>
          <text
            fill="#1AAB9B"
            style={{
              whiteSpace: 'pre',
            }}
            fontFamily="Roboto"
            fontSize={24}
            letterSpacing={0}
          >
            <tspan textAnchor="end" x={SUMMARIES_POS[index].xText1} y={SUMMARIES_POS[index].yText1}>
              {summary.value}
            </tspan>
          </text>
          {summary.href ? (
            <a href={summary.href} target="_blank" rel="noreferrer">
              <text
                fill="#2F80ED"
                style={{
                  whiteSpace: 'pre',
                }}
                fontFamily="Roboto"
                fontSize={12}
                letterSpacing={0}
              >
                <tspan x={SUMMARIES_POS[index].xText2} y={SUMMARIES_POS[index].yText1}>
                  {summary.title}
                </tspan>
              </text>
            </a>
          ) : (
            <text
              fill="#31394D"
              style={{
                whiteSpace: 'pre',
              }}
              fontFamily="Roboto"
              fontSize={12}
              letterSpacing={0}
            >
              <tspan x={SUMMARIES_POS[index].xText5} y={SUMMARIES_POS[index].yText5}>
                {summary.subTitle}
              </tspan>
            </text>
          )}
        </React.Fragment>
      ))}
    </svg>
  );
}

const MemoSummary = React.memo(Summary);
export default MemoSummary;
