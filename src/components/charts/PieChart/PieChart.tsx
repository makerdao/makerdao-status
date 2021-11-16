/* eslint-disable no-confusing-arrow */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import styled from 'styled-components';
import {
  VictoryContainer,
  VictoryPie,
  VictoryTooltip,
  VictoryZoomContainer,
} from 'victory';
import { Icon } from '../..';
import { getCurrencyResourceByAsset } from '../../../services/utils/currencyResource';
import MemoLegend, { ButtonValues } from './Legend';

interface Props {
  indexSelected: number;
  setIndexSelected: (index: number) => void;
  collateralsPercents: {
    x: string;
    y: number;
    asset: string;
    yPercent: string;
    fill: string;
  }[];
  collateralLegend: {
    ceiling: string;
    ceilingUtilization: string;
    minPerVault: string;
    stabilityFee: string;
    colRatio: string;
  };
  collateralAuctionLegend: {
    minBidIncrease: string;
    bidDuration: string;
    auctionSize: string;
  };
}

const PieChart = ({
  indexSelected,
  setIndexSelected,
  collateralsPercents,
  collateralLegend,
  collateralAuctionLegend,
}: Props) => {
  const isDownXs = useBreakpoint(down('xs'));

  const collateralsPercentsLocal =
    collateralsPercents && collateralsPercents.length;
  const iconName = collateralsPercentsLocal
    ? getCurrencyResourceByAsset(collateralsPercents[indexSelected].asset)
        .iconName
    : undefined;
  const asset = collateralsPercentsLocal
    ? collateralsPercents[indexSelected].asset
    : '';
  const yPercent = collateralsPercentsLocal
    ? collateralsPercents[indexSelected].yPercent
    : '';
  const events = [
    {
      target: 'data',
      eventHandlers: {
        onClick: () => [
          {
            target: 'data',
            mutation: ({
              index,
              datum: { asset },
            }: {
              index: number;
              datum: { asset: string };
            }) => {
              if (asset !== 'Others') {
                setIndexSelected(index);
              }
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

  const [buttonSelected, setButtonSelected] =
    useState<ButtonValues>('collateral');

  return (
    <Container>
      <svg viewBox="-20 -55 725 440">
        <VictoryPie
          animate={{
            duration: 500,
            onLoad: { duration: 2000 },
          }}
          padAngle={0}
          endAngle={angle}
          standalone={false}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          events={events as any}
          colorScale={collateralsPercents.map((coll) => coll.fill)}
          style={{
            data: {
              cursor: ({ datum: { asset } }) =>
                asset !== 'Others' ? 'pointer' : '',
              stroke: ({ datum: { fill } }) => fill,
              strokeWidth: 0,
            },
          }}
          containerComponent={
            isDownXs ? (
              <VictoryZoomContainer />
            ) : (
              <VictoryContainer responsive={false} />
            )
          }
          width={370}
          height={340}
          data={collateralsPercents}
          innerRadius={({ index }) => (index === indexSelected ? 100 : 135)}
          radius={({ index }) => (index === indexSelected ? 160 : 100)}
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{
                fill: ({ datum: { asset } }) =>
                  asset === 'Others' ? 'white' : 'transparent',
                stroke: ({ datum: { asset } }) =>
                  asset === 'Others' ? '#F2F2F2' : 'transparent',
              }}
            />
          }
        />
        {!!iconName && <Icon name={iconName} width={250} x={59} y={114} />}
        <text
          x="25.6%"
          y="43.3%"
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
          x="25.7%"
          y="50.5%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{
            fill: '#31394D',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 14,
            lineHeight: 16,
          }}
        >
          {yPercent}
        </text>
        {collateralsPercentsLocal &&
          collateralsPercents[indexSelected].asset !== 'Others' && (
            <MemoLegend
              buttonSelected={buttonSelected}
              onButtonSelect={setButtonSelected}
              collateral={collateralLegend}
              collateralAuction={collateralAuctionLegend}
            />
          )}
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
