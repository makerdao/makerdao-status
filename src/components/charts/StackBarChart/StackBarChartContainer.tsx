import React, { useMemo } from 'react';
import { Spinner } from '../..';
import { useMainContext } from '../../../context/MainContext';
import { useHistoricalDebt } from '../../../services/loadData/useHistoricalDebt';
import StackBarChart from './StackBarChart';

const StackBarChartContainer = () => {
  const {
    state: { vatLine, jugBase, potDsr },
    loading: loadingMain,
  } = useMainContext();
  const { historicalDebt, loading } = useHistoricalDebt();

  const summaries = useMemo(
    () => [
      {
        title: 'Ceiling',
        subTitle: 'Vat_Line',
        value: vatLine,
        href: 'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-global-debt-ceiling.md#global-debt-ceiling',
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
    <StackBarChart historicalDebt={historicalDebt} summaries={summaries} />
  );
};

export default StackBarChartContainer;
