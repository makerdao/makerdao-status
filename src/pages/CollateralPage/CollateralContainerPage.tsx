import React, { useCallback, useState } from 'react';
import { CollateralPage } from '..';
import { Spinner } from '../../components/styledComponents';
import { useMainContext } from '../../context/MainContext';

const firstFiltersMock = [
  { label: 'Risk View', selected: true },
  { label: 'Auction View' },
];
const secondsFiltersMock = [
  { label: 'Significant' },
  { label: 'Stable Coins' },
  { label: 'Real World Assets', selected: true },
];

export default function CollateralContainerPage() {
  const {
    state: { collaterals, cats, flips },
    loading,
  } = useMainContext();
  const [firstFilters, setFirstFilters] = useState(firstFiltersMock);
  const [secondsFilters, setSecondsFilters] = useState(secondsFiltersMock);
  const onFilterClick = useCallback(
    (isFirstFilter: boolean) => (label: string, oldSelectedValue?: boolean) => {
      const filters = isFirstFilter ? firstFilters : secondsFilters;
      const setFilter = isFirstFilter ? setFirstFilters : setSecondsFilters;
      // eslint-disable-next-line no-confusing-arrow
      const newFilters = filters.map((filter) =>
        label === filter.label
          ? { label, selected: !oldSelectedValue }
          : filter,
      );
      setFilter(newFilters);
    },
    [firstFilters, secondsFilters, setFirstFilters, setSecondsFilters],
  );
  const onFilterClear = useCallback(
    (isFirstFilter: boolean) => () => {
      const filters = isFirstFilter ? firstFilters : secondsFilters;
      const setFilter = isFirstFilter ? setFirstFilters : setSecondsFilters;
      const newFilters = filters.map((filter) => ({
        label: filter.label,
        selected: false,
      }));
      setFilter(newFilters);
    },
    [firstFilters, secondsFilters, setFirstFilters, setSecondsFilters],
  );

  if (loading) return <Spinner />;

  return (
    <CollateralPage
      collaterals={collaterals || []}
      cats={cats || []}
      flips={flips || []}
      firstFilters={firstFilters}
      secondsFilters={secondsFilters}
      onFilterClick={onFilterClick}
      onFilterClear={onFilterClear}
    />
  );
}
