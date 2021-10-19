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

  const { initDate, endDate } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const initDate = new URLSearchParams(params).get('initDate') || undefined;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const endDate = new URLSearchParams(params).get('endDate') || undefined;
    return { initDate, endDate };
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
        if (!createdFormated || (!initDate && !endDate)) return true;
        if (!initDate && endDate) return createdFormated <= endDate;
        if (!endDate && initDate) return createdFormated >= initDate;
        if (endDate && initDate) {
          return createdFormated >= initDate && createdFormated <= endDate;
        }
        return false;
      }),
    [endDate, initDate, spellsFilteredBySearch],
  );

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const urlParams = new URLSearchParams({
        search: value,
        initDate: initDate || '',
        endDate: endDate || '',
      });
      push(`${pathname}?${urlParams.toString()}`);
    },
    [endDate, initDate, pathname, push],
  );

  const onSelectDate = useCallback(
    (input: 'initDate' | 'endDate') =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const dateParams = {} as Record<string, string>;
        dateParams[input] = value;
        if (search) {
          dateParams[search] = search;
        }
        const urlParams = new URLSearchParams({
          initDate: initDate || '',
          endDate: endDate || '',
          ...dateParams,
        });
        push(`${pathname}?${urlParams.toString()}`);
      },
    [endDate, initDate, pathname, push, search],
  );

  if (loading) return <Spinner />;

  return (
    <SpellsPage
      spells={spelspellsFilteredByDate}
      onSearch={onSearch}
      search={search}
      onSelectInitDate={onSelectDate('initDate')}
      onSelectEndDate={onSelectDate('endDate')}
    />
  );
}
