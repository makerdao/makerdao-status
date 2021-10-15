import React from 'react';
import { down, up, between } from 'styled-breakpoints';
import styled from 'styled-components';
import TagFilterPanel from '../../components/filters/TagFilterPanel';
import { CollateralsCard } from '../../components/styledComponents';
import WrapperPage from '../../components/wrappers/WrapperPage';
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
        title: 'Collaterals',
        items: getCollateralsItems(coll),
      },
    ];
    if (coll.catItems) {
      newSections = [
        ...newSections,
        {
          title: 'Liquidation',
          items: getCatsItems(coll.catItems as Definitions.Cat),
        },
      ];
    }
    if (coll.flipItems) {
      newSections = [
        ...newSections,
        {
          title: 'Collateral auction',
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
            <CardsSpacer key={Math.random()}>
              <CollateralsCard
                sections={getSections(coll)}
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
  ${down('sm')} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  ${between('sm', 'md')} {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  ${between('md', 'lg')} {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  ${up('lg')} {
    margin-left: 3rem;
    margin-right: 3rem;
  }
  margin-top: 80px;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-flow: row wrap;
`;

const FilterContainer = styled.div`
  ${down('lg')} {
    margin: 0.5rem 0.5rem 0.5rem 0.5rem;
  }
  ${up('lg')} {
    margin: 0.5rem 1.5rem 1.5rem 1.5rem;
  }
`;

const CardsSpacer = styled.div`
  ${down('sm')} {
    width: 98%;
    margin: 0.2rem;
  }
  ${between('sm', 'md')} {
    width: 48%;
    margin: 0.2rem;
  }
  ${between('md', 'lg')} {
    width: 32%;
    margin: 0.3rem;
  }
  ${up('lg')} {
    width: 23%;
    margin: 0.5rem;
  }
  min-width: 200px;
`;
