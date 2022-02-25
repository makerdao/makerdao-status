/* eslint-disable @typescript-eslint/no-shadow */
import moment, { Moment } from 'moment';
import React, { useCallback, useMemo } from 'react';
import { useIsFetching } from 'react-query';
import { useHistory } from 'react-router-dom';
import useGetSpells from '../../services/loadData/spells/useGetSpells';
import { formatDate } from '../../services/utils/formatsFunctions';
import SpellsPage from './SpellsPage';

export default function SpellsContainerPage() {
  const format = 'YYYY-MM-DD';

  const {
    push,
    location: { pathname, search: urlQuery },
  } = useHistory();

  const isFetching = useIsFetching();

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
    const limit = (new URLSearchParams(urlQuery).get('limit') || 100) as number;
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

  const { startDate, endDate, search, selectedSpell, ilk, parameter } =
    urlSearchParams;

  const {
    spells: basicSpells = [],
    loading,
    loadMore,
  } = useGetSpells(urlSearchParams);

  const spells = useMemo(() => {
    if (isFetching) return [...basicSpells] as Definitions.Spell[];
    return basicSpells.map((ele) => ({
        ...ele,
        id: `${Math.random()}`,
      })) as Definitions.Spell[];
  }, [basicSpells, isFetching]);

  const spellsFilteredBySearch = useMemo(
    () =>
      spells.filter((spell) =>
        Object.keys(spell).some((key) => {
          let value = (
            spell as Record<string, string | number | Definitions.SpellChange[]>
          )[key] as string;
          if (key === 'created') {
            value = formatDate(value);
          }
          if (Array.isArray(value)) {
            const matched = value.filter((val) =>
              Object.keys(val).some((changeKey) => {
                if (!search) return true;
                if (!val[changeKey]) return false;
                return (val[changeKey] as string)
                  .toLowerCase()
                  .includes(`${search.toLowerCase()}`);
              }),
            );
            return !!matched.length;
          }
          if (!search) return true;
          if (!value) return false;
          return value.toLowerCase().includes(`${search.toLowerCase()}`);
        }),
      ),
    [search, spells],
  );

  const spellsFilteredByDate = useMemo(
    () =>
      spellsFilteredBySearch.filter(({ timestamp }) => {
        if (!timestamp) return false;
        const createdMoment = moment(timestamp, format);
        return (
          createdMoment.isAfter(startDate || moment().subtract(10, 'year')) &&
          createdMoment.isBefore(endDate || moment().add(10, 'year'))
        );
      }),
    [endDate, startDate, spellsFilteredBySearch],
  );

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const urlParams = new URLSearchParams({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(urlSearchParams as any as Record<string, string>),
        search: value,
        startDate: startDate?.format(format) || '',
        endDate: endDate?.format(format) || '',
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
      const startDate = startDateM ? startDateM.format(format) : '';
      const endDate = endDateM ? endDateM.format(format) : '';
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

  const rowsExpanded =
    spellsFilteredByDate && spellsFilteredByDate.length && (ilk || parameter)
      ? [spellsFilteredByDate[0].id]
      : [];

  return (
    <SpellsPage
      spells={spellsFilteredByDate}
      onSearch={onSearch}
      search={search}
      startDate={startDate}
      endDate={endDate}
      onDatesChange={onDatesChange}
      selectedSpell={selectedSpell}
      rowsExpanded={rowsExpanded}
      onloadMore={loadMore}
      loading={loading || isFetching > 0}
    />
  );
}
