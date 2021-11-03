/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-confusing-arrow */
import React, { useEffect, useState } from 'react';
import { down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import styled from 'styled-components';
import { VictoryContainer, VictoryPie, VictoryZoomContainer } from 'victory';
import { Icon } from '../..';
import { getCurrencyResourceByAsset } from '../../../services/utils/currencyResource';
import MemoLegend from './Legend';

interface Props {
  collateralsPercents: {
    x: string;
    y: number;
    asset: string;
    yPercent: string;
    fill: string;
  }[];
}

const PieChart = ({ collateralsPercents }: Props) => {
  const isDownXs = useBreakpoint(down('xs'));
  const [collateralSelected, setCollateralSelected] = useState<number>(0);

  const collateralsPercentsLocal =
    collateralsPercents && collateralsPercents.length;
  const iconName = collateralsPercentsLocal
    ? getCurrencyResourceByAsset(collateralsPercents[collateralSelected].asset)
        .iconName
    : undefined;
  const asset = collateralsPercentsLocal
    ? collateralsPercents[collateralSelected].asset
    : '';
  const yPercent = collateralsPercentsLocal
    ? collateralsPercents[collateralSelected].yPercent
    : '';
  const events = [
    {
      target: 'data',
      eventHandlers: {
        onClick: () => [
          {
            target: 'data',
            mutation: ({ index }: { index: number }) => {
              setCollateralSelected(index);
            },
          },
        ],
      },
    },
  ];
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      setAngle(360);
    }, 10);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, []);

  return (
    <Container>
      <svg viewBox="-20 -55 525 380">
        <VictoryPie
          animate={{
            duration: 500,
            onLoad: { duration: 2000 },
          }}
          padAngle={1}
          endAngle={angle}
          standalone={false}
          events={events as any}
          colorScale={collateralsPercents.map((coll) => coll.fill)}
          containerComponent={
            isDownXs ? (
              <VictoryZoomContainer />
            ) : (
              <VictoryContainer responsive={false} />
            )
          }
          domainPadding={{ x: 10 }}
          width={240}
          height={280}
          data={collateralsPercents}
          innerRadius={({ index }) => (index === collateralSelected ? 75 : 105)}
          radius={({ index }) => (index === collateralSelected ? 125 : 75)}
        />
        {!!iconName && <Icon name={iconName} width={250} x={-5} y={90} />}
        <text
          x="22.7%"
          y="42%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{
            fill: '#000000',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            fontSize: 20,
            lineHeight: 24,
          }}
        >
          {asset}
        </text>
        <text
          x="23%"
          y="49%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{
            fill: '#31394D',
            fontFamily: 'Roboto',
            fontWeight: 'normal',
            fontSize: 16,
            lineHeight: 16,
          }}
        >
          {yPercent}
        </text>
        <MemoLegend />
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

export default PieChart;
