/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-confusing-arrow */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useMemo, useState } from 'react';
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
import { formatFee } from '../../../services/utils/formatsFunctions';
import Formatter from '../../../services/utils/Formatter';
import LegendItems from './LegendItems';
import LegendTab from './LegendTab';

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
  legendData: Record<string, Record<string, string>[]>;
}

const PieChart = ({
  indexSelected,
  setIndexSelected,
  collateralsPercents,
  legendData,
}: Props) => {
  const [tabSelected, setTabSelected] = useState(0);
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
                setTabSelected(0);
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

  const group = useMemo(() => {
    const key = asset;
    const arr = legendData[key] || [];
    return arr.map((c) => ({
      ceiling: {
        label: 'Ceiling',
        subLabel: 'Vat_line',
        subLabelLink: 'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/parameter-index/vault-risk/param-debt-ceiling.md',
        value:
          c && c.vat_line ? `${Formatter.formatRawDaiAmount(c.vat_line)}` : '',
      },
      liquidationPenalty: {
        label: 'Liq. Penalty',
        value: Formatter.formatRate(Number(c.dog_chop)),
      },
      debtFloor: {
        label: 'Debt Floor',
        subLabel: 'Vat_dust',
        subLabelLink: 'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/parameter-index/vault-risk/param-debt-floor.md',
        value:
          c && c.vat_dust ? `${Formatter.formatRawDaiAmount(c.vat_dust)}` : '',
      },
      stabilityFee: {
        label: 'Stability fee',
        value: c && c.jug_duty ? formatFee(c.jug_duty.toString()) : '',
      },
      liquidationRatio: {
        label: 'Liq. Ratio',
        value:
          c && c.spot_mat
            ? (Formatter.formatRatio(Number(c.spot_mat)) as string)
            : '',
      },
    }));
  }, [asset, legendData]);

  const items = useMemo(() => {
    if (group.length <= tabSelected) return [];
    const values = Object.values(group[tabSelected]);
    return values;
  }, [group, tabSelected]);

  const tabs = useMemo(() => {
    const arr = legendData[asset] || [];
    return arr.map((m) => m.asset);
  }, [asset, legendData]);

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
          }}>
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
          }}>
          {yPercent}
        </text>
      </svg>
      <LegendContainer>
        <LegendTab
          tabs={tabs}
          selected={tabSelected}
          onSelect={setTabSelected}
        />
        <ItemContainer>
          {items.map((m, i) => (
            <LegendItems key={Math.random()} {...m} isFilled={i % 2 === 0} />
          ))}
        </ItemContainer>
      </LegendContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background: #ffffff;
  box-shadow: 0px 4px 9.03012px rgba(176, 190, 197, 0.25);
  border-radius: 10px;
`;

const ItemContainer = styled.div`
  padding: 10px 10%;
`;

const LegendContainer = styled.div`
  min-height: 100%;
  min-width: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  display: flex;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default PieChart;
