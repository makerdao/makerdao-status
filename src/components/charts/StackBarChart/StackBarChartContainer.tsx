import React, { useMemo } from 'react';
import { Spinner } from '../..';
import { useMainContext } from '../../../context/MainContext';
import { useHistoricalDebt } from '../../../services/loadHistoricalDebt';
import StackBarChart from './StackBarChart';

const StackBarChartContainer = () => {
  const {
    state: { vatLine, jugBase, potDsr },
    loading: loadingMain,
  } = useMainContext();
  const { dataToBarChart, loading } = useHistoricalDebt();

  const summaries = useMemo(
    () => [
      {
        title: 'Ceiling',
        subTitle: 'Vat_Line',
        value: vatLine,
      },
      {
        title: 'Base stability fee',
        subTitle: 'Jug_Base',
        value: jugBase,
      },
      {
        title: 'Save Rate',
        subTitle: 'Pot_dsr',
        value: potDsr,
      },
    ],
    [jugBase, potDsr, vatLine],
  );

  if (loading || loadingMain) return <Spinner />;

  return (
    <StackBarChart historicalDebt={dataToBarChart} summaries={summaries} />
  );
};

export default StackBarChartContainer;
