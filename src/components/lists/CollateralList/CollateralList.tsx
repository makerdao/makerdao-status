import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { down, up } from 'styled-breakpoints';
import styled from 'styled-components';
import { CollateralsCard, FilterTagPanel } from '../..';
import { getCurrencyResourceByAsset } from '../../../services/utils/currencyResource';
import { getEtherscanAddressLinkFromHash } from '../../../services/utils/links';
import Label from '../../styledComponents/Label';
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
  defaultCategories?: Definitions.CollateralCategory[];
  onFilterClick: (
    index: number,
  ) => (filter: FilterSelectable, selected?: boolean) => void;
  onFilterClear: (index: number) => () => void;
  hideFilters?: boolean;
}

export default function CollateralList({
  collaterals,
  filters = [],
  categories = [],
  defaultCategories = [],
  onFilterClick,
  onFilterClear,
  hideFilters = false,
}: Props) {
  const { push } = useHistory();
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
    const currentCategory = selectedTags.length
      ? categories
      : defaultCategories;
    return currentCategory
      .map((category) => ({
        title: category.name,
        items: getItemsByCategory(coll, selectedTags, category.fields || []),
      }))
      .filter((f) => f.items.length);
  };

  const gotoCollaterals = useCallback(() => {
    push('/collaterals');
  }, [push]);

  return (
    <Container>
      {!hideFilters && (
        <FilterContainer>
          {filters.map((filter, i) => (
            <FilterTagPanel
              key={Math.random()}
              filters={filter}
              color={filter[i].color || '#71c8be'}
              onClick={onFilterClick(i)}
              onClearAll={onFilterClear(i)}
              hasClearAll={filter.length ? filter[0].hasClearAll : false}
            />
          ))}
        </FilterContainer>
      )}
      <CardsContainer>
        {collaterals.map((coll) => (
          <CollateralsCard
            key={Math.random()}
            sections={getSections(coll)}
            header={{
              title: coll.asset,
              iconName: getCurrencyResourceByAsset(coll.asset).iconName,
              link: getEtherscanAddressLinkFromHash(coll.address),
            }}
          />
        ))}
      </CardsContainer>
      {hideFilters && (
        <Button onClick={gotoCollaterals}>
          <LabelStyled
            size="14px"
            lineHeight="19px"
            color="#1AAB9B"
            weight="bold"
          >
            See all
          </LabelStyled>
        </Button>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const LabelStyled = styled(Label)`
  cursor: pointer;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
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

const Button = styled.button`
  position: absolute;
  right: 30px;
  bottom: -37px;
  background: none;
  border: none;
  padding-right: 0px;
  cursor: pointer;
`;
