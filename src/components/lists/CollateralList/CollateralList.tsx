import { intersection } from 'lodash';
import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import Masonry from 'react-masonry-css';
import { useHistory } from 'react-router-dom';
import { down, up } from 'styled-breakpoints';
import styled from 'styled-components';
import { CollateralsCard, FilterTagPanel } from '../..';
import { getIlkResourceByToken } from '../../../services/utils/currencyResource';
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
  mode: 'masonry' | 'grid';
  collaterals: (Definitions.Collateral & {
    catItems?: Definitions.Cat;
    flipItems?: Definitions.Flip;
  })[];
  collateralStructure?: Definitions.CollateralsStructure;
  filters?: FilterSelectable[][];
  onFilterClick: (
    index: number,
  ) => (filter: FilterSelectable, selected?: boolean) => void;
  onFilterClear: (index: number) => () => void;
  hideFilters?: boolean;
}

export default function CollateralList({
  mode,
  collaterals,
  collateralStructure = {},
  filters = [],
  onFilterClick,
  onFilterClear,
  hideFilters = false,
}: Props) {
  const { push } = useHistory();
  const { categories = [] } = collateralStructure;
  const selectedTagsOfParams = useMemo(() => {
    const includesFilter = categories
      .filter((ele) => ele.includes?.length)
      .map((ele) => ele.name);
    const rulesFilter = categories
      .filter((ele) => ele.rules?.length)
      .map((ele) => ele.name);

    const tagsArray = filters.map((panelFilter) =>
      panelFilter
        .filter(
          (f) =>
            f.selected &&
            !includesFilter.includes(f.tag) &&
            !rulesFilter.includes(f.tag),
        )
        .map((m) => m.tag),
    );
    return tagsArray.flat();
  }, [categories, filters]);

  const selectedTagsWithIncludes = useMemo(() => {
    const includesFilter = categories
      .filter((ele) => ele.includes?.length)
      .map((ele) => ele.name);

    const tagsArray = filters.map((panelFilter) =>
      panelFilter
        .filter((f) => f.selected && includesFilter.includes(f.tag))
        .map((m) => m.tag),
    );
    return tagsArray.flat();
  }, [categories, filters]);

  const selectedTagsWithRules = useMemo(() => {
    const rulesFilter = categories
      .filter((ele) => ele.rules?.length)
      .map((ele) => ele.name);

    const tagsArray = filters.map((panelFilter) =>
      panelFilter
        .filter((f) => f.selected && rulesFilter.includes(f.tag))
        .map((m) => m.tag),
    );
    return tagsArray.flat();
  }, [categories, filters]);

  const getSections = useCallback(
    (
      coll: Definitions.Collateral & {
        catItems?: Definitions.Cat;
        flipItems?: Definitions.Flip;
      },
    ) => {
      const currentCategory = categories;
      return currentCategory
        .map((category) => ({
          title: category.name,
          items: getItemsByCategory(
            coll,
            selectedTagsOfParams,
            collateralStructure,
            (category.fields || []).map((ele) => ({
              ...ele,
              categoryName: category.name,
            })),
          ),
        }))
        .filter((f) => f.items.length);
    },
    [categories, collateralStructure, selectedTagsOfParams],
  );

  const gotoCollaterals = useCallback(() => {
    push('/collaterals');
  }, [push]);

  const CardContainer = mode === 'grid' ? GridContainer : MasonryContainer;

  const collateralsFilteredByFields = useMemo(
    () =>
      collaterals.filter((coll) => {
        const sections = getSections(coll);
        const noEmptySection = sections.filter(
          (section) => section.items.filter(({ value }) => value !== '').length,
        );
        return noEmptySection.length;
      }),
    [collaterals, getSections],
  );

  const collateralsFilteredByIncludes = useMemo(
    () =>
      collateralsFilteredByFields.filter((coll) => {
        const includesFilter = categories.filter((ele) => ele.includes?.length);
        const intercepted = intersection(
          includesFilter.map((m) => m.name),
          selectedTagsWithIncludes,
        );
        if (intercepted.length) {
          return includesFilter.some(
            (ele) =>
              ele.includes?.includes(coll.asset) &&
              intercepted.includes(ele.name),
          );
        }
        return true;
      }),
    [categories, collateralsFilteredByFields, selectedTagsWithIncludes],
  );

  const collateralsFilteredByRule = useMemo(
    () =>
      collateralsFilteredByIncludes.filter((coll) => {
        const ruleFilter = categories.filter((ele) => ele.rules?.length);
        const intercepted = intersection(
          ruleFilter.map((m) => m.name),
          selectedTagsWithRules,
        );
        if (!intercepted.length) return true;
        return ruleFilter.some((ele) => {
          if (!intercepted.includes(ele.name)) return false;
          const rules = ele.rules || [];
          const filtered = rules.filter((rule) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value = (coll as Record<string, any>)[rule.field || ''];
            return value ? Number(value) > Number(rule.gt) : false;
          });
          return filtered.length === rules.length;
        });
      }),
    [categories, collateralsFilteredByIncludes, selectedTagsWithRules],
  );

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
      <CardContainer>
        {collateralsFilteredByRule.map((coll) => (
          <CollateralsCard
            key={Math.random()}
            sections={getSections(coll)}
            header={{
              title: coll.asset,
              iconName: getIlkResourceByToken(coll.asset).iconName,
              link: getEtherscanAddressLinkFromHash(coll.address),
            }}
          />
        ))}
      </CardContainer>
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

const MasonryContainer = ({ children }: PropsWithChildren<{}>) => (
  <MasonryGridContainer>
    <Masonry
      breakpointCols={{
        default: 4,
        1350: 3,
        1050: 2,
        500: 1,
      }}
      className="coll-masonry-grid"
      columnClassName="coll-masonry-grid_column"
    >
      {children}
    </Masonry>
  </MasonryGridContainer>
);

const Container = styled.div`
  position: relative;
`;

const LabelStyled = styled(Label)`
  cursor: pointer;
`;

const MasonryGridContainer = styled.div`
  .coll-masonry-grid {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-left: -2rem;
    width: auto;
  }

  .coll-masonry-grid_column {
    padding-left: 2rem;
  }

  .coll-masonry-grid_column > div {
    margin-bottom: 2rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 2rem;
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
