import React, { useMemo } from 'react';
import { down, up } from 'styled-breakpoints';
import styled from 'styled-components';
import TagFilterPanel from '../../components/filters/TagFilterPanel';
import { getIconByAsset } from '../../components/Icon/IconNames';
import { CollateralsCard } from '../../components/styledComponents';
import WrapperPage from '../../components/wrappers/WrapperPage';
import { getEtherscanTokenLinkFromHash } from '../../services/utils/fetch';
import { getItemsByCategory } from './mappingCollateralsData';

export type FilterSelectable = {
  tag: string;
  selected?: boolean;
  hasClearAll?: boolean;
  color?: string;
};

interface Props {
  collaterals: (Definitions.Collateral & {
    catItems?: Definitions.Cat;
    flipItems?: Definitions.Flip;
  })[];
  filters?: FilterSelectable[][];
  categories?: Definitions.CollateralCategory[];
  onFilterClick: (
    index: number,
  ) => (filter: FilterSelectable, selected?: boolean) => void;
  onFilterClear: (index: number) => () => void;
}

export default function CollateralPage({
  collaterals,
  filters = [],
  categories = [],
  onFilterClick,
  onFilterClear,
}: Props) {
  const selectedTags = useMemo(() => {
    const tagsArray = filters.map((panelFilter) =>
      panelFilter.filter((f) => f.selected).map((m) => m.tag),
    );
    return tagsArray.flat();
  }, [filters]);

  const getSections = (
    coll: Definitions.Collateral & {
      catItems?: Definitions.Cat;
      flipItems?: Definitions.Flip;
    },
  ) => {
    if (!selectedTags.length) {
      return [
        {
          title: '',
          items: getItemsByCategory(coll, selectedTags),
        },
      ];
    }
    return categories
      .map((category) => ({
        title: category.name,
        items: getItemsByCategory(coll, selectedTags, category.fields || []),
      }))
      .filter((f) => f.items.length);
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
          {filters.map((filter, i) => (
            <TagFilterPanel
              key={Math.random()}
              filters={filter}
              color={filter[i].color || '#71c8be'}
              onClick={onFilterClick(i)}
              onClearAll={onFilterClear(i)}
              hasClearAll={filter.length ? filter[0].hasClearAll : false}
            />
          ))}
        </FilterContainer>
        <CardsContainer>
          {collaterals.map((coll) => (
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
