import React from 'react';

interface SummaryProps {
  title: string;
  subTitle: string;
  value?: string;
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
        <tspan x={1.75} y={22.203}>
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
        <tspan x={127} y={11.102}>
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
        <tspan x={127} y={25.102}>
          (
        </tspan>
        <tspan x={176.699} y={25.102}>
          )
        </tspan>
      </text>
      <text
        fill="#2F80ED"
        style={{
          whiteSpace: 'pre',
        }}
        fontFamily="Roboto"
        fontSize={12}
        letterSpacing={0}
      >
        <tspan x={131.102} y={25.102}>
          {summaries[0].subTitle}
        </tspan>
      </text>
      <text
        fill="#1AAB9B"
        style={{
          whiteSpace: 'pre',
        }}
        fontFamily="Roboto"
        fontSize={24}
        letterSpacing={0}
      >
        <tspan x={210.406} y={22.203}>
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
        <tspan x={280} y={11.102}>
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
        <tspan x={280} y={25.102}>
          (
        </tspan>
        <tspan x={335.312} y={25.102}>
          )
        </tspan>
      </text>
      <text
        fill="#2F80ED"
        style={{
          whiteSpace: 'pre',
        }}
        fontFamily="Roboto"
        fontSize={12}
        letterSpacing={0}
      >
        <tspan x={284.102} y={25.102}>
          {summaries[1].subTitle}
        </tspan>
      </text>
      <text
        fill="#1AAB9B"
        style={{
          whiteSpace: 'pre',
        }}
        fontFamily="Roboto"
        fontSize={24}
        letterSpacing={0}
      >
        <tspan x={404.832} y={22.203}>
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
        <tspan x={476} y={11.102}>
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
        <tspan x={476} y={25.102}>
          (
        </tspan>
        <tspan x={520.801} y={25.102}>
          )
        </tspan>
      </text>
      <text
        fill="#2F80ED"
        style={{
          whiteSpace: 'pre',
        }}
        fontFamily="Roboto"
        fontSize={12}
        letterSpacing={0}
      >
        <tspan x={480.102} y={25.102}>
          {summaries[2].subTitle}
        </tspan>
      </text>
    </svg>
  );
}

const MemoSummary = React.memo(Summary);
export default MemoSummary;
