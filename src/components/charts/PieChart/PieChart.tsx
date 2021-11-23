/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-confusing-arrow */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import styled from 'styled-components';
import {
  VictoryContainer,
  VictoryLabel,
  VictoryPie,
  VictoryTooltip,
  VictoryZoomContainer,
} from 'victory';
import { Icon } from '../..';
import { getIlkResourceByToken } from '../../../services/utils/currencyResource';
import MemoLegend, { ButtonValues } from './Legend';

interface Props {
  indexSelected: number;
  setIndexSelected: (index: number) => void;
  collateralsPercents: {
    x: string;
    y: number;
    asset: string;
    token: string;
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
    ? getIlkResourceByToken(collateralsPercents[indexSelected].token).iconName
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
      <svg viewBox="-20 -55 765 440">
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
          innerRadius={({ index }) => (index === indexSelected ? 105 : 145)}
          radius={({ index }) => (index === indexSelected ? 176 : 105)}
          labelComponent={
            <VictoryTooltip
              labelComponent={
                <VictoryLabel
                  style={[
                    {
                      fill: '#748AA1',
                      fontFamily: 'Roboto',
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontSize: '12px',
                      lineHeight: '14px',
                    },
                  ]}
                />
              }
              cornerRadius={6}
              orientation="bottom"
              flyoutStyle={{
                fill: 'white',
                stroke: '#F2F2F2',
              }}
            />
          }
        />
        {!!iconName && (
          <Icon name={iconName} width={250} x={'7.8%' as any} y={114} />
        )}
        <text
          x="24.2%"
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
          x="24.2%"
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
