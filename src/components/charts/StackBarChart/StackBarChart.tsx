import React from 'react';
import { down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import styled from 'styled-components';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryGroup,
  VictoryLegend,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  VictoryTooltip,
  VictoryZoomContainer,
} from 'victory';
import Formatter from '../../../services/utils/Formatter';
import MemoSummary from './Summary';

interface Props {
  historicalDebt: {
    x: string;
    y: number;
    key: string;
    name: string;
    fill: string;
    label?: string;
  }[][];
  summaries: {
    title: string;
    subTitle: string;
    value: string | undefined;
  }[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StackBarChart = ({ historicalDebt, summaries }: Props) => {
  const isDownXs = useBreakpoint(down('xs'));
  const labelsStyle = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 14,
    fill: '#31394D',
  };
  const legendData = historicalDebt.map((historical, i) => ({
    name: historical.length ? historical[i].name : '',
    symbol: {
      fill: historical.length ? historical[0].fill : 'transparent',
    },
    labels: labelsStyle,
  }));

  return (
    <Container>
      <MemoSummary summaries={summaries} />
      <svg viewBox="-55 30 635 300">
        <VictoryChart
          standalone={false}
          containerComponent={
            isDownXs ? (
              <VictoryZoomContainer />
            ) : (
              <VictoryContainer style={{ padding: 20 }} responsive={false} />
            )
          }
          domainPadding={{ x: 30 }}
          width={550}
          height={300}
        >
          <VictoryAxis
            dependentAxis
            tickFormat={(y) => `${Formatter.formatMultiplier(y, 0, true)}`}
            style={{ tickLabels: labelsStyle }}
          />
          <VictoryAxis
            style={{ tickLabels: { ...labelsStyle, fontWeight: 'normal' } }}
          />
          <Gradients />
          <VictoryGroup key="victoryGroup" offset={0}>
            {historicalDebt.map((data, index) => (
              <VictoryBar
                barWidth={20}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
                cornerRadius={{
                  top: 10,
                }}
                key={`${data[index].key}_${data[index].x}`}
                data={data}
                style={{ data: { fill: data[0].fill } }}
                // TODO: it comment is temporal
                // labelComponent={
                //   <VictoryTooltip
                //     flyoutStyle={{
                //       fill: 'white',
                //       stroke: '#F2F2F2',
                //     }}
                //   />
                // }
              />
            ))}
          </VictoryGroup>
        </VictoryChart>
        <VictoryLegend
          standalone={false}
          x={325}
          y={300}
          orientation="horizontal"
          symbolSpacer={5}
          gutter={20}
          height={100}
          data={legendData}
        />
      </svg>
    </Container>
  );
};

const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 9.03012px rgba(176, 190, 197, 0.25);
  border-radius: 10px;
  svg g > g[role='presentation'] {
    line {
      stroke: rgba(0, 0, 1, 0.15) !important;
    }
  }
`;

const Gradients = () => (
  <linearGradient id="grad_748AA1" x1="50%" y1="0%" x2="50%" y2="100%">
    <stop
      offset="0%"
      style={{ stopColor: 'rgb(116,138,161)', stopOpacity: 1.0 }}
    />
    <stop
      offset="100%"
      style={{ stopColor: 'rgb(116,138,161)', stopOpacity: 0.0 }}
    />
    <stop
      offset="100%"
      style={{ stopColor: 'rgb(116,138,161)', stopOpacity: 0.0 }}
    />
    <stop
      offset="100%"
      style={{ stopColor: 'rgb(116,138,161)', stopOpacity: 0.0 }}
    />
  </linearGradient>
);

export default StackBarChart;
