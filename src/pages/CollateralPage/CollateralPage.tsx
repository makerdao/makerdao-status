import React from 'react';
import styled from 'styled-components';
import TagFilterPanel from '../../components/filters/TagFilterPanel';
import CollateralsCard from '../../components/styledComponents/CollateralsCard';
import WrapperPage from '../../components/wrappers/WrapperPage';
import { formatRayRatio } from '../../services/utils/formatsFunctions';

type LabelSelected = {
  label: string;
  selected?: boolean;
};
interface Props {
  collaterals: Definitions.Collaterals;
  firstFilters: LabelSelected[];
  secondsFilters: LabelSelected[];
  onFilterClick: (
    isFirstFilter: boolean,
  ) => (label: string, oldSelectedValue?: boolean) => void;
  onFilterClear: (isFirstFilter: boolean) => () => void;
}

export default function CollateralPage({
  collaterals,
  firstFilters,
  secondsFilters,
  onFilterClick,
  onFilterClear,
}: Props) {
  // interface ItemProps {
  //   label: string;
  //   enframedLabel: string;
  //   value: string;
  //   selected?: boolean;
  //   margin?: string;
  //   border?: string;
  //   onAction: () => void;
  // }
  const getCollateralsItems = (item: Record<string, string>) => {
    const keys = Object.keys(item);
    return keys.map((key) => {
      const commonKeys = { selected: false, onAction: () => {} };
      switch (key) {
        case 'mat':
          return {
            label: 'Col. ratio',
            enframedLabel: 'Spot_mat',
            value: formatRayRatio(item[key]),
            ...commonKeys,
          };
        default:
          return {
            label: 'Col. ratio',
            enframedLabel: 'Spot_mat',
            value: formatRayRatio(item[key]),
            ...commonKeys,
          };
      }
    });
  };

  return (
    <WrapperPage
      header={{
        title: 'Collaterals',
        iconName: 'collateral',
      }}>
      <Container>
        <TagFilterPanel
          filters={firstFilters}
          color="#98C0F5"
          onClick={onFilterClick(true)}
          onClear={onFilterClear(true)}
        />
        <TagFilterPanel
          filters={secondsFilters}
          color="#8CD5CD"
          onClick={onFilterClick(false)}
          onClear={onFilterClear(false)}
        />
        <CardsContainer>
          {collaterals.map((coll) => (
            <CardsSpacer key={Math.random()}>
              <CollateralsCard
                items={getCollateralsItems(coll)}
                header={{ title: coll.asset, iconName: 'ethereum' }}
              />
            </CardsSpacer>
          ))}
        </CardsContainer>
      </Container>
    </WrapperPage>
  );
}

const Container = styled.div`
  margin-left: 70px;
  margin-right: 70px;
  margin-top: 80px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const CardsSpacer = styled.div`
  width: 23%;
  margin: 1%;
`;
