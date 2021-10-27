/* eslint-disable no-confusing-arrow */
import { useWindowWidth } from '@react-hook/window-size';
import React, { useCallback, useMemo, useState } from 'react';
import { useMainContext } from '../../context/MainContext';
import { useLoadConfigs } from '../../services/utils/config';
import { Spinner } from '../styledComponents';
import CollateralList, { FilterSelectable } from './CollateralList';

interface Props {
  isSummary?: boolean;
}

export default function CollateralListContainer({ isSummary }: Props) {
  const width = useWindowWidth();
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

  const sliceCollaterals = useMemo(() => {
    if (!isSummary) return fullCollaterals;
    let end = 4;
    if (width <= 701) {
      end = 1;
    } else if (width <= 967) {
      end = 2;
    } else if (width <= 1199) {
      end = 3;
    }
    return fullCollaterals.slice(0, end);
  }, [isSummary, fullCollaterals, width]);

  if (loading) return <Spinner />;

  return (
    <CollateralList
      collaterals={sliceCollaterals || []}
      onFilterClick={onFilterClick}
      onFilterClear={onFilterClear}
      filters={filters || []}
      categories={collateralsConfig?.categories || []}
      defaultCategories={collateralsConfig?.default_category || []}
      hideFilters={isSummary}
    />
  );
}
