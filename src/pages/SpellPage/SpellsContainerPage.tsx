/* eslint-disable @typescript-eslint/no-shadow */
import moment, { Moment } from 'moment';
import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from '../../components';
import { useLoadSpell } from '../../services/loadData/useLoadSpells';
import {
  formatDate,
  formatDateYYYMMDD,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDateFromTimeStampString,
} from '../../services/utils/formatsFunctions';
import SpellsPage from './SpellsPage';

export default function SpellsContainerPage() {
  const format = 'YYYY-MM-DD';

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
    const collateral = new URLSearchParams(urlQuery).get('collateral') || '';
    const parameter = new URLSearchParams(urlQuery).get('parameter') || '';

    return {
      startDate: startDateParam ? moment(startDateParam, format) : undefined,
      endDate: endDateParam ? moment(endDateParam, format) : undefined,
      search,
      selectedSpell,
      collateral,
      parameter,
    };
  }, [urlQuery]);

  const { startDate, endDate, search, selectedSpell, collateral, parameter } =
    urlSearchParams;

  const { spells, loading } = useLoadSpell();

  const spellsFilteredCollateral = useMemo(() => {
    if (!collateral && !parameter) return spells;
    const filterFn = ({ asset, term }: Definitions.SpellChange) => {
      const regExp = /\[[^)]+\]/;
      const termArray = (term || '').match(regExp) || [];
      const repExp = termArray.length ? termArray[0] : '';
      const paramLocal = (term || '')
        .replace(repExp, '')
        .replaceAll('_', '')
        .toLowerCase();
      const paramsCondition = parameter
        ? paramLocal.toLowerCase() ===
          parameter.replaceAll('_', '').toLowerCase()
        : true;
      return !!collateral && asset === collateral && paramsCondition;
    };

    return (
      spells
        .filter(({ changes }) => {
          if (!changes || !changes.length) return false;
          return changes.some(filterFn);
        })
        .map(({ changes, ...rest }) => ({
          ...rest,
          changes: changes.filter(filterFn),
        }))
        // eslint-disable-next-line no-confusing-arrow
        .sort((a, b) =>
          moment(getDateFromTimeStampString(a.created)).isBefore(
            moment(getDateFromTimeStampString(b.created)),
          )
            ? 1
            : -1,
        )
    );
  }, [collateral, parameter, spells]);

  const spellsFilteredBySearch = useMemo(
    () =>
      spellsFilteredCollateral.filter((spell) =>
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
    [search, spellsFilteredCollateral],
  );

  const spellsFilteredByDate = useMemo(
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
    spellsFilteredByDate &&
    spellsFilteredByDate.length &&
    (collateral || parameter)
      ? [spellsFilteredByDate[0].id]
      : [];

  if (loading) return <Spinner />;

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
    />
  );
}
