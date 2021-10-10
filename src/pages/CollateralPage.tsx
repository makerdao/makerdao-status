import React, { useCallback, useState } from "react";
import styled from "styled-components";
import TagFilterPanel from "../components/filters/TagFilterPanel";
import WrapperPage from "../components/wrappers/WrapperPage";

const firstFiltersMock = [
  { label: "Risk View", selected: true },
  { label: "Auction View" },
];
const secondsFiltersMock = [
  { label: "Significant" },
  { label: "Stable Coins" },
  { label: "Real World Assets", selected: true },
];

export default function CollateralPage() {
  const [firstFilters, setFirstFilters] = useState(firstFiltersMock);
  const [secondsFilters, setSecondsFilters] = useState(secondsFiltersMock);
  const onClick = useCallback(
    (isFirstFilter: boolean) => {
      return (label: string, oldSelectedValue?: boolean) => {
        const filters = isFirstFilter ? firstFilters : secondsFilters;
        const setFilter = isFirstFilter ? setFirstFilters : setSecondsFilters;
        const newFilters = filters.map((filter) =>
          label === filter.label
            ? { label, selected: !oldSelectedValue }
            : filter
        );
        setFilter(newFilters);
      };
    },
    [firstFilters, secondsFilters, setFirstFilters, setSecondsFilters]
  );
  const onClear = useCallback(
    (isFirstFilter: boolean) => {
      return () => {
        const filters = isFirstFilter ? firstFilters : secondsFilters;
        const setFilter = isFirstFilter ? setFirstFilters : setSecondsFilters;
        const newFilters = filters.map((filter) => ({
          label: filter.label,
          selected: false,
        }));
        setFilter(newFilters);
      };
    },
    [firstFilters, secondsFilters, setFirstFilters, setSecondsFilters]
  );

  return (
    <WrapperPage
      header={{
        title: "Collaterals",
        iconName: "collateral",
      }}
    >
      <Container>
        <TagFilterPanel
          filters={firstFilters}
          color="#98C0F5"
          onClick={onClick(true)}
          onClear={onClear(true)}
        />
        <TagFilterPanel
          filters={secondsFilters}
          color="#8CD5CD"
          onClick={onClick(false)}
          onClear={onClear(false)}
        />
      </Container>
    </WrapperPage>
  );
}

const Container = styled.div`
  margin-left: 70px;
  margin-top: 80px;
`;
