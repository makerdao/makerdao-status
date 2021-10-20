import moment, { Moment } from 'moment';
import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from '../../components/styledComponents';
import { useLoadSpell } from '../../services/loadSpells';
import {
  formatDate,
  formatDateYYYMMDD,
} from '../../services/utils/formatsFunctions';
import SpellsPage from './SpellsPage';

export default function SpellsContainerPage() {
  const {
    push,
    location: { pathname, search: params },
  } = useHistory();

  const search = useMemo(
    () => new URLSearchParams(params).get('search') || undefined,
    [params],
  );
  const format = 'YYYY-MM-DD';

  const { startDate, endDate } = useMemo(() => {
    const startDateParam =
      new URLSearchParams(params).get('startDate') || undefined;
    const endDateParam =
      new URLSearchParams(params).get('endDate') || undefined;
    return {
      startDate: startDateParam ? moment(startDateParam, format) : undefined,
      endDate: endDateParam ? moment(endDateParam, format) : undefined,
    };
  }, [params]);

  const { spells, loading } = useLoadSpell();

  const spellsFilteredBySearch = useMemo(
    () =>
      spells.filter((spell) =>
        Object.keys(spell).some((key) => {
          let value = (
            spell as Record<string, string | Definitions.SpellChange[]>
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

  const spelspellsFilteredByDate = useMemo(
    () =>
      spellsFilteredBySearch.filter(({ created }) => {
        const createdFormated = formatDateYYYMMDD(created);
        const createdMoment = moment(createdFormated, format);
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
        search: value,
        initDate: startDate?.format(format) || '',
        endDate: endDate?.format(format) || '',
      });
      push(`${pathname}?${urlParams.toString()}`);
    },
    [endDate, startDate, pathname, push],
  );

  const onDatesChange = useCallback(
    ({
      startDate: startDateM,
      endDate: endDateM,
    }: {
      startDate?: Moment;
      endDate?: Moment;
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const startDate = startDateM ? startDateM.format(format) : '';
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const endDate = endDateM ? endDateM.format(format) : '';
      const urlParams = new URLSearchParams({
        startDate,
        endDate,
        search: search || '',
      });
      push(`${pathname}?${urlParams.toString()}`);
    },
    [pathname, push, search],
  );

  if (loading) return <Spinner />;

  return (
    <SpellsPage
      spells={spelspellsFilteredByDate}
      onSearch={onSearch}
      search={search}
      startDate={startDate}
      endDate={endDate}
      onDatesChange={onDatesChange}
    />
  );
}
