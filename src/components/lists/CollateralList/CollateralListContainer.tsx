/* eslint-disable no-confusing-arrow */
import { useWindowWidth } from '@react-hook/window-size';
import React, { useCallback, useMemo, useState } from 'react';
import { Spinner } from '../..';
import { useMainContext } from '../../../context/MainContext';
import { useLoadConfigs } from '../../../services/utils/config';
import CollateralList, { FilterSelectable } from './CollateralList';

interface Props {
  isSummary?: boolean;
}

export default function CollateralListContainer({ isSummary }: Props) {
  const { collateralsConfig } = useLoadConfigs();
  const {
    state: { collaterals },
    loading,
  } = useMainContext();

  const configFiltersMapped = useMemo(() => {
    if (!collateralsConfig || !collateralsConfig.filters) return [];
    const filtersWithItems = collateralsConfig.filters.filter((f) => f.tags);
    return filtersWithItems.map(
      (filter) =>
        filter.tags?.map((tag) => ({
          ...filter,
          tag,
          hasClearAll: filter.has_clear_all,
          selected: filter.default_selected?.includes(tag),
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

  const width = useWindowWidth();
  const sliceCollaterals = useMemo(() => {
    if (!isSummary) return collaterals;
    let end = 4;
    if (width <= 701) {
      end = 1;
    } else if (width <= 967) {
      end = 2;
    } else if (width <= 1199) {
      end = 3;
    }
    return collaterals.slice(0, end);
  }, [isSummary, collaterals, width]);

  const [paramSelected, setParamSelected] = useState<string | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paramHover, setParamHover] = useState<string | undefined>();

  if (loading) return <Spinner />;

  return (
    <CollateralList
      collaterals={sliceCollaterals || []}
      onFilterClick={onFilterClick}
      onFilterClear={onFilterClear}
      filters={filters || []}
      categories={collateralsConfig?.categories || []}
      defaultCategories={collateralsConfig?.categories || []}
      hideFilters={isSummary}
      mode={isSummary ? 'grid' : 'masonry'}
      onParameterClick={setParamSelected}
      paramSelected={paramSelected}
      onParamHover={setParamHover}
      paramHover={paramHover}
    />
  );
}
