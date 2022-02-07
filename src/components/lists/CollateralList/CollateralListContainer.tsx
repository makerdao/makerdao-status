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
  const width = useWindowWidth();
  const { collateralsConfig: collateralStructure } = useLoadConfigs();
  const {
    state: { collaterals },
    loading,
  } = useMainContext();

  const configFiltersMapped = useMemo(() => {
    if (!collateralStructure || !collateralStructure.filters) return [];
    const filtersWithItems = collateralStructure.filters.filter((f) => f.tags);
    return filtersWithItems.map(
      (filter) =>
        filter.tags?.map((tag) => ({
          ...filter,
          tag,
          hasClearAll: filter.has_clear_all,
          selected: filter.default_selected?.includes(tag),
        })) || [],
    );
  }, [collateralStructure]);

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

  const collateralsMapped = useMemo(
    () =>
      collaterals.map((coll) => {
        const config = collateralStructure.collaterals?.find(
          (f) => f.name === coll.asset,
        );
        return {
          ...coll,
          humanReadableName: config?.human_readable_name || coll.asset,
        };
      }),
    [collateralStructure.collaterals, collaterals],
  );

  const collateralsOrdered = useMemo(
    () =>
      collateralsMapped.sort((a, b) =>
        a.vat_amountOfDebt.lt(b.vat_amountOfDebt) ? 1 : -1,
      ),
    [collateralsMapped],
  );

  const sliceCollaterals = useMemo(() => {
    if (!isSummary) return collateralsOrdered;
    let end = 3;
    if (width <= 701) {
      end = 1;
    } else if (width <= 967) {
      end = 2;
    }
    return collateralsMapped.slice(0, end);
  }, [isSummary, collateralsOrdered, width, collateralsMapped]);

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
      collateralStructure={collateralStructure}
      hideFilters={isSummary}
      mode={isSummary ? 'grid' : 'masonry'}
      onParameterClick={setParamSelected}
      paramSelected={paramSelected}
      onParamHover={setParamHover}
      paramHover={paramHover}
    />
  );
}
