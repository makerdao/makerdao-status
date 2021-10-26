/* eslint-disable no-confusing-arrow */
import React, { useCallback, useMemo, useState } from 'react';
import { CollateralPage } from '..';
import { Spinner } from '../../components/styledComponents';
import { useMainContext } from '../../context/MainContext';
import { useLoadConfigs } from '../../services/utils/config';
import { FilterSelectable } from './CollateralPage';

export default function CollateralContainerPage() {
  const { collateralsConfig } = useLoadConfigs();
  const {
    state: { collaterals, cats, flips },
    loading,
  } = useMainContext();

  const fullCollaterals = (collaterals || []).map((coll) => {
    const catItems = (cats || []).find(
      (catItem) => catItem.asset === coll.asset,
    );
    const flipItems = (flips || []).find(
      (flipsItem) => flipsItem.asset === coll.asset,
    );
    return {
      ...coll,
      catItems,
      flipItems,
    };
  });

  const configFiltersMapped = useMemo(() => {
    if (!collateralsConfig || !collateralsConfig.filters) return [];
    const filtersWithItems = collateralsConfig.filters.filter((f) => f.tags);
    return filtersWithItems.map(
      (filter) =>
        filter.tags?.map((tag) => ({
          ...filter,
          tag,
          hasClearAll: filter.has_clear_all,
        })) || [],
    );
  }, [collateralsConfig]);

  const [filters, setFilter] = useState(configFiltersMapped);

  const onFilterClick = useCallback(
    (index: number) => (filterProp: FilterSelectable, selected?: boolean) => {
      const newConfigFilters = [...filters].map((panel, i) =>
        panel.map((filterPanel) =>
          filterPanel.tag === filterProp.tag &&
          index === i &&
          filterPanel.selected !== selected
            ? {
                ...filterPanel,
                selected,
              }
            : filterPanel,
        ),
      );
      setFilter(newConfigFilters);
    },
    [filters],
  );

  const onFilterClear = useCallback(
    (index: number) => () => {
      const newConfigFilters = filters.map((panel, i) =>
        panel.map((filterPanel) =>
          index === i
            ? {
                ...filterPanel,
                selected: false,
              }
            : filterPanel,
        ),
      );
      setFilter(newConfigFilters);
    },
    [filters],
  );

  if (loading) return <Spinner />;

  return (
    <CollateralPage
      collaterals={fullCollaterals || []}
      onFilterClick={onFilterClick}
      onFilterClear={onFilterClear}
      filters={filters || []}
      categories={collateralsConfig?.categories || []}
    />
  );
}
