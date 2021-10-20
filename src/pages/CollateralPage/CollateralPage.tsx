/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { down, up, between } from 'styled-breakpoints';
import styled from 'styled-components';
import TagFilterPanel from '../../components/filters/TagFilterPanel';
import { getIconByAsset } from '../../components/Icon/IconNames';
import { CollateralsCard } from '../../components/styledComponents';
import WrapperPage from '../../components/wrappers/WrapperPage';
import { getEtherscanTokenLinkFromHash } from '../../services/utils/fetch';
import {
  getCatsItems,
  getCollateralsItems,
  getFlipItems,
} from './mappingCollaterlasData';

type LabelSelected = {
  label: string;
  selected?: boolean;
};

interface Props {
  collaterals: Definitions.Collateral[];
  cats: Definitions.Cat[];
  flips: Definitions.Flip[];
  firstFilters: LabelSelected[];
  secondsFilters: LabelSelected[];
  onFilterClick: (
    isFirstFilter: boolean,
  ) => (label: string, oldSelectedValue?: boolean) => void;
  onFilterClear: (isFirstFilter: boolean) => () => void;
}

export default function CollateralPage({
  collaterals,
  cats,
  flips,
  firstFilters,
  secondsFilters,
  onFilterClick,
  onFilterClear,
}: Props) {
  const collateralsWidthCats = collaterals.map((coll) => {
    const catItems = cats.find((catItem) => catItem.asset === coll.asset);
    const flipItems = flips.find((flipsItem) => flipsItem.asset === coll.asset);
    return {
      ...coll,
      catItems,
      flipItems,
    };
  });
  const getSections = (coll: Record<string, unknown>) => {
    let newSections = [
      {
        // TODO that comment is temporal
        // title: 'Collaterals',
        items: getCollateralsItems(coll),
      },
    ];
    if (coll.catItems) {
      newSections = [
        ...newSections,
        {
          // TODO that comment is temporal
          // title: 'Liquidation',
          items: getCatsItems(coll.catItems as Definitions.Cat),
        },
      ];
    }
    if (coll.flipItems) {
      newSections = [
        ...newSections,
        {
          // TODO that comment is temporal
          // title: 'Collateral auction',
          items: getFlipItems(coll.flipItems as Definitions.Flip),
        },
      ];
    }
    return newSections;
  };

  return (
    <WrapperPage
      header={{
        title: 'Collaterals',
        iconName: 'collateral',
      }}
    >
      <Container>
        <FilterContainer>
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
        </FilterContainer>
        <CardsContainer>
          {collateralsWidthCats.map((coll) => (
            <CollateralsCard
              key={Math.random()}
              sections={getSections(coll)}
              header={{
                title: coll.asset,
                iconName: getIconByAsset(coll.asset),
                link: getEtherscanTokenLinkFromHash(coll.address),
              }}
            />
          ))}
        </CardsContainer>
      </Container>
    </WrapperPage>
  );
}

const Container = styled.div`
  margin-top: 45px;
  margin-left: 3rem;
  margin-right: 3rem;
  ${down('xs')} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
  align-items: flex-start;
  ${down('xs')} {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  ${up('lg')} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const FilterContainer = styled.div`
  ${down('lg')} {
    margin: 0.5rem 0rem 0.5rem 0rem;
  }
  ${up('lg')} {
    margin: 0.5rem 0rem 1.5rem 0rem;
  }
`;
