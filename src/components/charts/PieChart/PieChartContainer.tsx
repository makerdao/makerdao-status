import React, { useMemo, useState } from 'react';
import { Spinner } from '../..';
import { useMainContext } from '../../../context/MainContext';
import { getCurrencyResourceByAsset } from '../../../services/utils/currencyResource';
import {
  formatDaiAmountAsMultiplier,
  formatDuration,
  formatFee,
  formatRatio,
  formatRayRatio,
  formatWadRate,
  getUtilization,
} from '../../../services/utils/formatsFunctions';
import PieChart from './PieChart';

const PieChartContainer = () => {
  const {
    state: { fullCollaterals = [] },
    loading,
  } = useMainContext();
  const [indexSelected, setIndexSelected] = useState<number>(0);

  const collateralsPercents = useMemo(() => {
    const total = fullCollaterals.reduce(
      (pre, { mat }) => (formatRayRatio(mat, true) as number) + pre,
      0,
    );

    const getYPercent = (mat: string) => {
      const part: number = mat ? (formatRayRatio(mat, true) as number) : 0;
      const partPercent = (part * 100) / total;
      return `${partPercent.toFixed(2)}%`;
    };

    const getColor = (asset: string) =>
      getCurrencyResourceByAsset(asset)?.color || '#EBEDF4';

    return fullCollaterals.map(({ asset, mat, ...rest }) => ({
      x: ' ',
      asset,
      y: mat ? (formatRayRatio(mat, true) as number) / total : 0,
      yPercent: getYPercent(mat),
      fill: getColor(asset),
      mat,
      ...rest,
    }));
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
          ? `${formatDaiAmountAsMultiplier(currentColl.line)}`
          : '',
      ceilingUtilization,
      minPerVault:
        currentColl && currentColl.dust
          ? `${formatDaiAmountAsMultiplier(currentColl.dust)}`
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
