/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from 'react';
import { Spinner } from '../..';
import { useMainContext } from '../../../context/MainContext';
import { getIlkResourceByToken } from '../../../services/utils/currencyResource';
import {
  formatDuration,
  formatFee,
  formatRatio,
  formatRawDaiAmount,
  formatRayRatio,
  formatWadRate,
  getUtilization,
} from '../../../services/utils/formatsFunctions';
import Formatter from '../../../services/utils/Formatter';
import PieChart from './PieChart';

const threshold = 1;

const PieChartContainer = () => {
  const {
    state: { fullCollaterals = [] },
    loading,
  } = useMainContext();
  const [indexSelected, setIndexSelected] = useState<number>(0);

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
    const total = fullCollaterals.reduce(
      (pre, { locked }) => Number(locked) + pre,
      0,
    );

    const collPercent = fullCollaterals.map(
      ({ asset, mat, art, rate, locked, token, ...rest }) => {
        const y = getYPercent(Number(locked), total, true) as number;
        return {
          x: ' ',
          asset,
          token,
          y,
          yPercent: `${Formatter.formatAmount(y, 2)}%`,
          fill: getColor(token),
          mat,
          art,
          rate,
          ...rest,
        };
      },
    );

    const upColls = collPercent.filter(({ y }) => Number(y) >= threshold);
    const downColls = collPercent.filter(({ y }) => Number(y) < threshold);

    const downTotal = downColls.reduce((pre, { y }) => Number(y) + pre, 0);

    const other = {
      x: `Others
      ${Formatter.formatAmount(downTotal, 2)}%`,
      asset: 'Others',
      token: 'OTHERS',
      y: downTotal as number,
      yPercent: `${Formatter.formatAmount(downTotal, 2)}%`,
      fill: getColor(),
    };
    // eslint-disable-next-line no-confusing-arrow
    const sort = [...upColls, other as any].sort((a, b) =>
      a.y >= b.y ? 1 : -1,
    );
    return sort;
  }, [fullCollaterals]);

  const currentColl = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      collateralsPercents && collateralsPercents.length
        ? collateralsPercents[indexSelected]
        : undefined,
    [collateralsPercents, indexSelected],
  );

  const collateralLegend = useMemo(() => {
    let ceilingUtilization = '';
    if (
      currentColl &&
      currentColl.asset &&
      currentColl.art &&
      currentColl.rate &&
      currentColl.line
    ) {
      const utilization = getUtilization(
        currentColl.asset,
        currentColl.art,
        currentColl.rate,
        currentColl.line,
      );
      ceilingUtilization = formatRatio(utilization || '') as string;
    }
    return {
      ceiling:
        currentColl && currentColl.line
          ? `${formatRawDaiAmount(currentColl.line)}`
          : '',
      ceilingUtilization,
      minPerVault:
        currentColl && currentColl.dust
          ? `${formatRawDaiAmount(currentColl.dust)}`
          : '',
      stabilityFee:
        currentColl && currentColl.duty ? formatFee(currentColl.duty) : '',
      colRatio:
        currentColl && currentColl.mat
          ? (formatRayRatio(currentColl.mat) as string)
          : '',
    };
  }, [currentColl]);

  const collateralAuctionLegend = useMemo(
    () => ({
      minBidIncrease:
        currentColl && currentColl.flipItems?.beg
          ? formatWadRate(currentColl.flipItems?.beg)
          : '',
      bidDuration:
        currentColl && currentColl.flipItems?.ttl
          ? formatDuration(currentColl.flipItems?.ttl)
          : '',
      auctionSize:
        currentColl && currentColl.flipItems?.tau
          ? formatDuration(currentColl.flipItems?.tau)
          : '',
    }),
    [currentColl],
  );

  if (loading) return <Spinner />;

  return (
    <PieChart
      indexSelected={indexSelected}
      setIndexSelected={setIndexSelected}
      collateralsPercents={collateralsPercents}
      collateralLegend={collateralLegend}
      collateralAuctionLegend={collateralAuctionLegend}
    />
  );
};

export default PieChartContainer;
