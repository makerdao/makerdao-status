import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from '../../components/styledComponents';
import { useLoadSpell } from '../../services/loadSpells';
import { formatDate } from '../../services/utils/formatsFunctions';
import SpellsPage from './SpellsPage';

export default function SpellsContainerPage() {
  const {
    push,
    location: { pathname, search: searchUrl },
  } = useHistory();

  const search = useMemo(
    () => new URLSearchParams(searchUrl).get('search') || undefined,
    [searchUrl],
  );

  const { spells, loading } = useLoadSpell();

  const spellsFiltered = useMemo(
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

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const urlParams = new URLSearchParams({ search: value });
      push(`${pathname}?${urlParams.toString()}`);
    },
    [pathname, push],
  );

  if (loading) return <Spinner />;

  return (
    <SpellsPage spells={spellsFiltered} onSearch={onSearch} search={search} />
  );
}
