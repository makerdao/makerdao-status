/* eslint-disable import/prefer-default-export */
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import apolloClients from '../apolloClients';
import { infuraCurrentProvider } from '../providers';
import { formatDateYYYMMDD } from '../utils/formatsFunctions';

type HistoricalDebtForChart = {
  x: string;
  y: number;
  key: string;
  name: string;
  fill: string;
  label?: string;
};

export const useHistoricalDebt = () => {
  const [infuraLoading, setInfuraLoading] = useState(false);
  const { blockInterval, periods } = {
    blockInterval: 5700 /* ≈ 1 day */,
    periods: 395 /* 12 months plus one */,
  };
  const [latestBlock, setLatestBlock] = useState<number | undefined>();

  const getBlockNumber = useCallback(async () => {
    setInfuraLoading(true);
    const blockNumber = await infuraCurrentProvider.getBlockNumber();
    setLatestBlock(blockNumber);
    setInfuraLoading(false);
  }, []);
  useEffect(() => {
    getBlockNumber();
  }, [getBlockNumber]);

  const numberOfPoints = useMemo(
    () => (periods || !latestBlock ? periods : latestBlock / blockInterval),
    [blockInterval, latestBlock, periods],
  );

  const fragments = useMemo(() => {
    if (!latestBlock) return undefined;
    if (numberOfPoints <= 0) return undefined;

    const queryString = Array.from({ length: numberOfPoints }, (v, i) => {
      const block = latestBlock - (i + 1) * blockInterval;
      return `
            _${
              numberOfPoints - i
            }_${block}: systemState(block: { number: ${block}}, id: "current") {
              block
              timestamp
              totalDebt
              debtCeiling: totalDebtCeiling
            }
          `;
    });
    return queryString;
  }, [blockInterval, latestBlock, numberOfPoints]);

  const {
    data: systemState,
    loading,
    error,
  } = useQuery(gql`{${fragments?.concat()}}`, {
    client: apolloClients.makerProtocol,
    skip: !fragments || infuraLoading,
  });

  const historical = useMemo(() => {
    if (!systemState) return [];
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const historical = Object.entries(systemState).map(([key, value]) => {
      const [, , block] = key.split('_');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { block: +block, ...(value as any) };
    });
    return historical as Definitions.HistoricalDebt[];
  }, [systemState]);

  const historicLastDayForMonthMap = useMemo(() => {
    const lastHistoricData = new Map();
    historical
      .reverse()
      .forEach(
        ({ debtCeiling, timestamp, totalDebt }: Definitions.HistoricalDebt) => {
          const format = 'YYYY-MM-DD';
          const timesTampFormatted = formatDateYYYMMDD(timestamp);
          const momentFormatted = moment(timesTampFormatted, format);
          const month = momentFormatted.month();
          lastHistoricData.set(month, {
            debtCeiling: Number(debtCeiling),
            totalDebt: Number(totalDebt),
          });
        },
      );
    return lastHistoricData;
  }, [historical]);

  const historicalDebt = useMemo(() => {
    if (!historical || !historical.length) return [];
    const monthsDebtCeiling: HistoricalDebtForChart[] = [];
    const monthsTotalDai: HistoricalDebtForChart[] = [];
    const months = new Array(12).fill(0);
    const today = moment();
    const currMonth = today.get('M');
    months.forEach((_, i) => {
      const month = moment();
      month.set('month', currMonth - (11 - i));
      const currHist = historicLastDayForMonthMap.get(month.get('month'));
      const debtCeiling = currHist ? Number(currHist.debtCeiling) : 0;
      const totalDebt = currHist ? Number(currHist.totalDebt) : 0;
      const labelDebt = `Debt Ceiling ${Number(debtCeiling).toFixed(2)}`;
      const labelTotalDai = `Total Dai ${Number(totalDebt).toFixed(2)}`;

      // TODO: in the next sprint we will use the "label" property
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const label = `${labelDebt}
      ${labelTotalDai}`;

      const value = {
        x: month.format('MMM'),
        y: debtCeiling,
        key: 'debt_ceiling',
        name: 'Debt Ceiling',
        fill: '#BAE6E1',
        // label,
      };
      // debt ceiling
      monthsDebtCeiling.push(value);
      // total debt
      monthsTotalDai.push({
        ...value,
        y: totalDebt,
        key: 'total_dai',
        name: 'Total Dai',
        fill: 'url(#grad_748AA1)',
      });
    });

    return [monthsDebtCeiling, monthsTotalDai];
  }, [historical, historicLastDayForMonthMap]);

  return {
    historical,
    historicalDebt,
    loading: loading || infuraLoading,
    error,
  };
};
