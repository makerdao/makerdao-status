import React, { useMemo } from 'react';
import { Spinner } from '../..';
import { useMainContext } from '../../../context/MainContext';
import { getCurrencyResourceByAsset } from '../../../services/utils/currencyResource';
import { formatRayRatio } from '../../../services/utils/formatsFunctions';
import PieChart from './PieChart';

const PieChartContainer = () => {
  const {
    state: { collaterals, cats, flips },
    loading,
  } = useMainContext();

  const fullCollaterals = (collaterals || []).map((coll) => {
    const catItems = (cats || []).find(
      (catItem) => catItem.asset === coll.asset,
    );
    const flipItems = (flips || []).find(
      (flipsItem) => flipsItem.asset === coll.asset,
    );
    return {
      ...coll,
      catItems,
      flipItems,
    };
  });

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

  if (loading) return <Spinner />;

  return <PieChart collateralsPercents={collateralsPercents} />;
};

export default PieChartContainer;
