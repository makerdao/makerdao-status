import React, { useMemo } from 'react';
import { Spinner } from '../..';
import { useMainContext } from '../../../context/MainContext';
import { useHistoricalDebt } from '../../../services/loadData/loadHistoricalDebt';
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
        href: 'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-debt-ceiling.md',
      },
      {
        title: 'Base stability fee',
        subTitle: 'Jug_Base',
        value: jugBase,
        href: 'md-viewer/?url=https://github.com/makerdao/community/blob/master/governance/parameter-docs/param-stability-fee.md',
      },
      {
        title: 'Save Rate',
        subTitle: 'Pot_dsr',
        value: potDsr,
        href: 'https://pablos-buch.gitbook.io/v4nb2th2/parameter-index/core/param-dai-savings-rate',
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
