/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-confusing-arrow */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useMemo, useState } from 'react';
import { down, up } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import styled from 'styled-components';
import { VictoryContainer, VictoryLabel, VictoryPie, VictoryTooltip, VictoryZoomContainer } from 'victory';
import { Icon } from '../..';
import { getIlkResourceByToken } from '../../../services/utils/currencyResource';
import LegendItems from './LegendItems';
import LegendTab from './LegendTab';
import { useSideBarContext } from '../../../context/SidebarContext';
import { formatDaiAmountAsMultiplier, formatFees, formatPercentFunc } from '../../../services/formatters/FormattingFunctions';

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
    iconName: string
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

  const { expanded: expandedSideBar } = useSideBarContext();

  const collateralsPercentsLocal = collateralsPercents && collateralsPercents.length;

  const customLogo = collateralsPercents[indexSelected].iconName;

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
      const record: {
        label: string
        link: string
        value: string
      }[] = [];

      if (c.direct_bar !== undefined) {
        record.push({
          label: 'Target Borrow Rate',
          link: '',
          value: c && c.direct_bar
              ? formatPercentFunc(Number(c.direct_bar)) : '',
        });
      }

      if (c.jug_duty !== undefined && !c.asset.startsWith('PSM')) {
        record.push({
          label: 'Stability fee',
          link: 'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/parameter-index/vault-risk/param-stability-fee.md',
          value: c && c.jug_duty
              ? formatFees(c.jug_duty.toString()) : '',
        });
      }

      if (c.dss_pms_tin !== undefined) {
        record.push({
          label: 'Fee In',
          link: 'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/module-index/module-psm.md',
          value: c && c.dss_pms_tin
              ? formatPercentFunc(Number(c.dss_pms_tin)) : '',
        });
      }

      if (c.dss_pms_tout !== undefined) {
        record.push({
          label: 'Fee Out',
          link: 'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/module-index/module-psm.md',
          value: c && c.dss_pms_tout
              ? formatPercentFunc(Number(c.dss_pms_tout)) : '',
        });
      }

      if (c.vat_line !== undefined) {
        record.push({
          label: 'Debt Ceiling',
          link: 'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/parameter-index/vault-risk/param-debt-ceiling.md',
          value: c && c.vat_line
              ? formatDaiAmountAsMultiplier(c.vat_line, 2) : '',
        });
      }

      if (c.dss_auto_line_line !== undefined) {
        record.push({
          label: 'Maximum Debt Ceiling',
          link: 'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/module-index/module-dciam.md#maximum-debt-ceiling-line',
          value: c && c.dss_auto_line_line
              ? formatDaiAmountAsMultiplier(c.dss_auto_line_line, 2) : '',
        });
      }

      if (c.direct_tau !== undefined) {
        record.push({
          label: 'Auction size',
          link: '',
          value: c && c.direct_tau
              ? c.direct_tau : '',
        });
      }

      if (c.spot_mat !== undefined && !c.asset.startsWith('PSM')) {
        record.push({
          label: 'Liquidation Ratio',
          link: 'md-viewer/?url=https://github.com/makerdao/governance-manual/blob/main/parameter-index/vault-risk/param-liquidation-ratio.md',
          value: c && c.spot_mat ? formatPercentFunc(Number(c.spot_mat)) : '',
        });
      }

      if (c.dog_chop !== undefined && !c.asset.startsWith('PSM')) {
        record.push({
          label: 'Liquidation Penalty',
          link: 'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-liquidation-penalty.md',
          value: c && c.dog_chop ? formatPercentFunc(Number(c.dog_chop)) : '',
        });
      }

      return record;
    });
  }, [asset, legendData]);

  const items = useMemo(() => {
    if (group.length <= tabSelected) return [];
    return Object.values(group[tabSelected]);
  }, [group, tabSelected]);

  const tabs = useMemo(() => {
    const arr = legendData[asset] || [];
    return arr.map((m) => m.asset);
  }, [asset, legendData]);

  return (
    <Container>
      <Title>DAI Generated by Collateral</Title>
      <svg viewBox={!expandedSideBar ? '-20 -30 635 313' : '-20 -30 635 309'}>
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
          innerRadius={({ index }) => (index === indexSelected ? 79 : 107)}
          radius={({ index }) => (index === indexSelected ? 129 : 79)}
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
        {customLogo.length && <CollateralLogo href={`/icons/${customLogo}`} x={100} y={83} /> }
        {!customLogo.length && iconName && <Icon name={iconName} width={250} x={0} y={83} />}
        <text
          x="19.8%"
          y="48.3%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{
            fill: '#000000',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            fontSize: 14,
            lineHeight: 15.09,
          }}>
          {tabs.length > 1 ? asset : tabs[0]}
        </text>
        <text
          x="20.2%"
          y="54.5%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{
            fill: '#31394D',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 13,
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
  min-height: 355px;
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

  @media (min-width: 1366px){
    margin-bottom: 12px;
  }

  @media (min-width: 1900px){
    margin-bottom: 35px;
  }

  @media (min-width:1000px) and (max-width: 1366px){
    font-size:35px;
  }

  @media (min-width: 1366px){
    font-size: 25px;
  }
`;

const ItemContainer = styled.div`
  padding: 10px 10%;

  ${up('lgm')} {
    display: flex;
    min-height: 190px;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const LegendContainer = styled.div`
  min-height: 330px;
  overflow-y: auto;
  min-width: 50%;
  position: absolute;
  top: 0;
  left: 46%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1920px){
    min-height:420px;
  }
`;

export const CollateralLogo = styled.image`
  width: 48px;
  height: 48px;
`;

export default PieChart;
