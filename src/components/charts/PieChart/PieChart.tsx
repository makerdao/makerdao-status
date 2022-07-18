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
import Formatter from '../../../services/utils/Formatter';
import LegendItems from './LegendItems';
import LegendTab from './LegendTab';
import { formatFee } from '../../../services/utils/formatsFunctions';

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
    return arr.map((c) => {
      const record: any[] = [];

      if (c.direct_bar !== undefined) {
        record.push({
          label: 'Target Borrow Rate',
          value: c && c.direct_bar
              ? Formatter.formatPercentFee.format(Number(c.direct_bar)) : '',
        });
      }

      if (c.jug_duty !== undefined && !c.asset.startsWith('PSM')) {
        record.push({
          label: 'Stability fee',
          value: c && c.jug_duty
              ? formatFee(c.jug_duty.toString()) : '',
        });
      }

      if (c.dss_pms_tin !== undefined) {
        record.push({
          label: 'Fee In',
          value: c && c.dss_pms_tin
              ? Formatter.formatPercentFee.format(Number(c.dss_pms_tin)) : '',
        });
      }

      if (c.dss_pms_tout !== undefined) {
        record.push({
          label: 'Fee Out',
          value: c && c.dss_pms_tout
              ? Formatter.formatPercentFee.format(Number(c.dss_pms_tout)) : '',
        });
      }

      if (c.vat_line !== undefined) {
        record.push({
          label: 'Ceiling',
          subLabel: 'Vat_line',
          subLabelLink: 'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/parameter-index/vault-risk/param-debt-ceiling.md',
          value: c && c.vat_line
              ? `${Formatter.formatRawDaiAmount(c.vat_line)}` : '',
        });
      }

      if (c.dss_auto_line_line !== undefined) {
        record.push({
          label: 'Maximum Debt Ceiling',
          value: c && c.dss_auto_line_line
              ? Formatter.formatMultiplier(Number(c.dss_auto_line_line), 0) : '',
        });
      }

      if (c.direct_tau !== undefined) {
        record.push({
          label: 'Auction size',
          value: c && c.direct_tau
              ? c.direct_tau : '',
        });
      }

      if (c.spot_mat !== undefined && !c.asset.startsWith('PSM')) {
        record.push({
          label: 'Liquidation Ratio',
          value: c && c.spot_mat
              ? Formatter.formatRatio(Number(c.spot_mat)) as string : '',
        });
      }

      if (c.dog_chop !== undefined && !c.asset.startsWith('PSM')) {
        record.push({
          label: 'Liquidation Penalty',
          value: c && c.dog_chop
              ? Formatter.formatRate(Number(c.dog_chop)) : '',
        });
      }

      return record;
    });
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
      <Title>DAI Generated by Collateral</Title>
      <svg viewBox="-20 -30 635 302">
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
          width={255}
          height={255}
          data={collateralsPercents}
          innerRadius={({ index }) => (index === indexSelected ? 74 : 102)}
          radius={({ index }) => (index === indexSelected ? 124 : 74)}
          labelComponent={
            <VictoryTooltip
              renderInPortal={false}
              labelComponent={
                <VictoryLabel
                  style={[
                    {
                      fill: '#748AA1',
                      fontFamily: 'Roboto',
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontSize: '9.5px',
                      lineHeight: '10px',
                    },
                  ]}
                />
              }
              orientation="bottom"
              cornerRadius={6}
              flyoutStyle={{
                fill: 'white',
                stroke: '#F2F2F2',
              }}
              flyoutWidth={90}
              flyoutHeight={30}
            />
          }
        />
        {!!iconName && (
          <Icon name={iconName} width={250} x={-29.5} y={94} />
        )}
        <text
          x="20.2%"
          y="54.3%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{
            fill: '#000000',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            fontSize: 12,
            lineHeight: 15.09,
          }}>
          {tabs.length > 1 ? asset : tabs[0]}
        </text>
        <text
          x="20.2%"
          y="60.5%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{
            fill: '#31394D',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 10,
            lineHeight: 12.41,
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
  box-shadow: 0 4px 9.03012px rgba(176, 190, 197, 0.25);
  border-radius: 10px;
  overflow-y: hidden;
`;

const Title = styled.div`
  width:100%;
  display:flex;
  justify-content: center;
  font-size: 25px;
  font-family: Roboto, sans-serif;
  font-weight: 800;
  line-height: 29.3px;
  color:#31394D;
  padding-top: 24px;  
  
  @media (max-width:850px){
    padding-top: 20px;
    font-size: 20px;    
  }
  
  @media (min-width: 1800px){
    margin-bottom: 12px;
  }

  @media (min-width: 1900px){
    margin-bottom: 16px;
  }

`;

const ItemContainer = styled.div`
  padding: 10px 10%;
  
`;

const LegendContainer = styled.div`
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
  min-width: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default PieChart;
