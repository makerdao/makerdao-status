/* eslint-disable @typescript-eslint/no-shadow */
import moment, { Moment } from 'moment';
import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import useLoadSpellsNew from '../../services/loadData/spells/useLoadSpellsNew';
import { defaultPageLimit } from '../../services/utils/constants';
import CollateralSpellsPage from './CollateralSpellsPage';

export default function CollateralSpellsContainerPage() {
  const format = 'YYYY-MM-DD';
  const fullFormat = 'YYYY-MM-DD hh:mm:ss';

  const {
    push,
    location: { pathname, search: urlQuery },
  } = useHistory();

  const urlSearchParams = useMemo(() => {
    const startDateParam =
      new URLSearchParams(urlQuery).get('startDate') || undefined;
    const endDateParam =
      new URLSearchParams(urlQuery).get('endDate') || undefined;
    const search = new URLSearchParams(urlQuery).get('search') || '';
    const selectedSpell =
      new URLSearchParams(urlQuery).get('selectedSpell') || '';
    const ilk = new URLSearchParams(urlQuery).get('ilk') || '';
    const parameter = new URLSearchParams(urlQuery).get('parameter') || '';
    const limit = (new URLSearchParams(urlQuery).get('limit') ||
      defaultPageLimit) as number;
    const skip = (new URLSearchParams(urlQuery).get('skip') || 0) as number;

    return {
      startDate: startDateParam ? moment(startDateParam, format) : undefined,
      endDate: endDateParam ? moment(endDateParam, format) : undefined,
      search,
      selectedSpell,
      ilk,
      parameter,
      limit,
      skip,
    };
  }, [urlQuery]);

  const { startDate, endDate, search, selectedSpell } = urlSearchParams;

  const {
    spells: basicSpells = [],
    loading,
    loadMore,
  } = useLoadSpellsNew(urlSearchParams);

  const spells = useMemo(
    () =>
      basicSpells.map((ele) => ({
        ...ele,
        id: ele.spell,
      })) as Definitions.SpellChangeNew[],
    [basicSpells],
  );

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const urlParams = new URLSearchParams({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(urlSearchParams as any as Record<string, string>),
        search: value,
        startDate: startDate?.format(fullFormat) || '',
        endDate: endDate?.format(fullFormat) || '',
      });
      push(`${pathname}?${urlParams.toString()}`);
    },
    [urlSearchParams, startDate, endDate, push, pathname],
  );

  const onDatesChange = useCallback(
    ({
      startDate: startDateM,
      endDate: endDateM,
    }: {
      startDate?: Moment;
      endDate?: Moment;
    }) => {
      const startDate = startDateM ? startDateM.format(fullFormat) : '';
      const endDate = endDateM ? endDateM.format(fullFormat) : '';
      const urlParams = new URLSearchParams({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(urlSearchParams as any as Record<string, string>),
        startDate,
        endDate,
        search: search || '',
      });
      push(`${pathname}?${urlParams.toString()}`);
    },
    [pathname, push, search, urlSearchParams],
  );

  return (
    <CollateralSpellsPage
      spells={spells}
      onSearch={onSearch}
      startDate={startDate}
      endDate={endDate}
      onDatesChange={onDatesChange}
      selectedSpell={selectedSpell}
      rowsExpanded={[]}
      onloadMore={loadMore}
      loading={loading}
    />
  );
}
