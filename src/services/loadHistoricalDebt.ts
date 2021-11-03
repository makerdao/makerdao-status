/* eslint-disable import/prefer-default-export */
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import clients from './apolloClients';
import { infuraCurrentProvider } from './providers';
import { formatDateYYYMMDD } from './utils/formatsFunctions';

export const useHistoricalDebt = () => {
  const [infuraLoading, setInfuraLoading] = useState(false);
  const { blockInterval, periods } = {
    blockInterval: 5700 /* ≈ 1 day */,
    periods: 365 /* 12 months */,
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
    client: clients.makerProtocol,
    skip: !fragments,
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

  const dataToBarChart = useMemo(() => {
    if (!historical || !historical.length) return [];
    const monthsDebtCeiling = new Array(12).fill(0).map((_, i) => ({
      x: moment(`01-${i + 1}-2000`, 'DD-MM-YYYY').format('MMM'),
      y: 0,
      key: 'debt_ceiling',
      name: 'Debt Ceiling',
      fill: '#BAE6E1',
    }));
    const monthsTotalDai = new Array(12).fill(0).map((_, i) => ({
      x: moment(`01-${i + 1}-2000`, 'DD-MM-YYYY').format('MMM'),
      y: 0,
      key: 'total_dai',
      name: 'Total Dai',
      fill: 'url(#grad_748AA1)',
    }));

    historical.forEach(
      ({ debtCeiling, timestamp, totalDebt }: Definitions.HistoricalDebt) => {
        const format = 'YYYY-MM-DD';
        const timesTampFormatted = formatDateYYYMMDD(timestamp);
        const momentFormatted = moment(timesTampFormatted, format);
        const month = momentFormatted.month();
        monthsDebtCeiling[month].y += Number(debtCeiling);
        monthsTotalDai[month].y += Number(totalDebt);
      },
    );

    return [monthsDebtCeiling, monthsTotalDai];
  }, [historical]);

  return {
    historical,
    dataToBarChart,
    loading: loading || infuraLoading,
    error,
  };
};
