/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-confusing-arrow */
import React, { useCallback, useMemo, useState } from 'react';
import { Spinner } from '../..';
import { useMainContext } from '../../../context/MainContext';
import { getIlkResourceByToken } from '../../../services/utils/currencyResource';
import Formatter from '../../../services/utils/Formatter';
import PieChart from './PieChart';

const PieChartContainer = () => {
  const {
    state: { collaterals, vatDebt },
    loading,
  } = useMainContext();
  const [indexSelected, setIndexSelected] = useState<number>(0);

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

  const ilkThreshold = useCallback((v: any) => v.value >= 2.2, []);

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
    const percent = collaterals.map(ilkPercent);
    return group(percent, 'token');
  }, [collaterals, group, ilkPercent]);

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

  const getYPercent = (value: number, total: number, asNumber = false) => {
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

  const collateralsPercents = useMemo(() => {
    const total = data.reduce((pre, { value }) => Number(value) + pre, 0);

    return data.map(({ name, value }) => {
      const y = getYPercent(value, total, true) as number;
      return {
        x: `${name}
            ${Formatter.formatAmount(y, 2)}%`,
        asset: name,
        token: name,
        y,
        yPercent: `${Formatter.formatAmount(y, 2)}%`,
        fill: getColor(name !== 'Others' ? name : undefined),
      };
    });
  }, [data]);

  if (loading) return <Spinner />;

  return (
    <PieChart
      indexSelected={indexSelected}
      setIndexSelected={setIndexSelected}
      collateralsPercents={collateralsPercents}
      legendData={grouped}
    />
  );
};

export default PieChartContainer;
