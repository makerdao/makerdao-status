/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-confusing-arrow */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Spinner } from '../..';
import { useMainContext } from '../../../context/MainContext';
import { getIlkResourceByToken } from '../../../services/utils/currencyResource';
import PieChart from './PieChart';
import '../../../types.d';
import { formatAmount } from '../../../services/formatters/FormattingFunctions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const collateralStructure = require('../../../collateral-structure.yaml');

const PieChartContainer = () => {
  const {
    state: { collaterals, vatDebt },
    loading,
  } = useMainContext();

  const [indexSelected, setIndexSelected] = useState<number>(0);
  const [collateralsFiltered, setCollateralsFiltered] = useState<Definitions.Collateral[]>([]);

  useEffect(() => {
    if (collaterals) {
     setCollateralsFiltered((!collateralStructure.groups.ignored
      || collateralStructure.groups.ignored.length === 0) ?
          collaterals : collaterals.filter((collateral) =>
              !collateralStructure.groups.ignored.some((item: string) =>
                  item === collateral.asset)));
    }
  }, [collaterals]);

  const ilkPercent = useCallback(
    (ilk: Definitions.Collateral) => ({
      ...ilk,
      name: ilk.asset,
      token: ilk.token === 'PAX' ? 'USDP' : ilk.token,
      value:
        ((Number(ilk.vat_Art) * Number(ilk.vat_rate)) / Number(vatDebt)) * 100,
    }),
    [vatDebt],
  );

  const ilkThreshold = useCallback((v: any) => v.value >= collateralStructure.groups.threshold, []);

  const sortByTokenPercent = useCallback(
    (a: any, b: any) => b.value - a.value,
    [],
  );

  const reduce = useCallback(
    (kv) => ({
      name: kv[0],
      value: kv[1].reduce((t: any, v: any) => t + Number(v.value), Number('0')),
    }),
    [],
  );

  const group = useCallback(
    (xs, key) =>
      xs.reduce((rv: any, x: any) => {
        // eslint-disable-next-line no-param-reassign
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {}),
    [],
  );

  const grouped = useMemo(() => {
    const percent = collateralsFiltered.map(ilkPercent);
    return group(percent, 'token');
  }, [collateralsFiltered, group, ilkPercent]);

  const data = useMemo(() => {
    const all = Object.entries(grouped).map(reduce);
    all.sort(sortByTokenPercent);

    const others = all.filter((i) => !ilkThreshold(i));
    const dataTmp = all.filter(ilkThreshold);
    dataTmp.push({
      name: 'Others',
      value: others.reduce((t, v) => t + v.value, 0),
    });
    return dataTmp;
  }, [grouped, ilkThreshold, reduce, sortByTokenPercent]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deprecated_getYPercent = (
    value: number,
    total: number,
    asNumber = false,
  ) => {
    const part: number = value || 0;
    const partPercent = (part * 100) / total;
    return asNumber
      ? Number(partPercent.toFixed(2))
      : `${partPercent.toFixed(2)}%`;
  };

  const getColor = (token?: string) => {
    const defaultColor = '#EBEDF4';
    if (!token) return defaultColor;
    return getIlkResourceByToken(token)?.color || defaultColor;
  };

  const collateralsPercents = useMemo(
    () =>
      data.map(({ name, value }) => {
        const y = value;
        return {
          x: `${name}
            ${formatAmount(y, 2)}%`,
          asset: name,
          token: name,
          y,
          yPercent: `${formatAmount(y, 2)}%`,
          fill: getColor(name !== 'Others' ? name : undefined),
        };
      }),
    [data],
  );

  if (loading) return <Spinner />;

  return (
    <Div>
      <PieChart
        indexSelected={indexSelected}
        setIndexSelected={setIndexSelected}
        collateralsPercents={collateralsPercents}
        legendData={grouped}
    />
    </Div>
  );
};

const Div = styled.div`
  svg:first-of-type {
    transform: translateX(26px) translateY(-5px) scale(1.0500, 1.0374288);

    @-moz-document url-prefix() {
        g + svg {
          transform: translateX(-1px);
        }
      }

    @media (max-width: 1600px) and (min-width: 1536px){
      transform: translateX(26px) translateY(-5px) scale(1.0500, 1.0674288);
    }
  }
  div {
    overflow: hidden;
  }

  label.main-label {
    @media (min-width:1000px){
      font-size: 18px;
    }
    @media (min-width:1366px){
      font-size: 14px;
    }
    @media (min-width:1535px){
      font-size: 13px;
    }
  }

  button[class^=LegendTab]{
    @media (min-width: 1000px){
      font-size:16px;
    }
    @media (min-width:1366px){
      font-size: 14px;
    }
  }
`;

export default PieChartContainer;
