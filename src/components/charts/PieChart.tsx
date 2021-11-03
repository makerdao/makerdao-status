import React from 'react';
import styled from 'styled-components';
import {
  VictoryContainer,
  VictoryLabel,
  VictoryPie,
  VictoryZoomContainer,
} from 'victory';
import { down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import { Icon } from '..';
import MemoLegend from './Legend';

const PieChart = () => {
  const isDownXs = useBreakpoint(down('xs'));
  return (
    <Container>
      <svg viewBox="-20 -55 525 380">
        <VictoryPie
          standalone={false}
          colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
          containerComponent={
            isDownXs ? (
              <VictoryZoomContainer />
            ) : (
              <VictoryContainer responsive={false} />
            )
          }
          domainPadding={{ x: 10 }}
          // y={100}
          width={240}
          height={280}
          data={data}
          innerRadius={() => 100}
        />
        <Icon name="aave" width={250} x={-5} y={90} />
        <MemoLegend />
        <VictoryLabel
          x={145}
          y={157}
          lineHeight={24}
          style={{
            fill: '#000000',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            fontSize: 20,
          }}
          text="AAVE"
          textAnchor="end"
        />
        <VictoryLabel
          x={145}
          y={181}
          lineHeight={16}
          style={{
            fill: '#31394D',
            fontFamily: 'Roboto',
            fontWeight: 'normal',
            fontSize: 16,
          }}
          text="3.50%"
          textAnchor="end"
        />
      </svg>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background: #ffffff;
  box-shadow: 0px 4px 9.03012px rgba(176, 190, 197, 0.25);
  border-radius: 10px;
`;

const data = [
  { x: ' ', y: 35 },
  { x: ' ', y: 40 },
  { x: ' ', y: 55 },
];

export default PieChart;
