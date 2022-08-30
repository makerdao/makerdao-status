import { useWindowSize } from '@react-hook/window-size';
import useComponentSize from '@rehooks/component-size';
import { compose, unnest, filter as fpFilter, pluck, path, has, contains, toNumber, any } from 'lodash/fp';

import {
  MasonryScroller,
  usePositioner,
  useContainerPosition,
  useResizeObserver,
  RenderComponentProps,
} from 'masonic';
import React, { useCallback, useMemo, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { down, up } from 'styled-breakpoints';
import styled from 'styled-components';
import { CollateralsCard, FilterTagPanel } from '../..';
import { getIlkResourceByToken } from '../../../services/utils/currencyResource';
import { getEtherscanAddressLinkFromHash } from '../../../services/utils/links';
import Label from '../../styledComponents/Label';
import { getItemsByCategory } from '../../../services/formatters/CollateralsDataFormat';

export type FilterSelectable = {
  tag: string;
  selected?: boolean;
  hasClearAll?: boolean;
  color?: string;
};

interface Coll extends Definitions.Collateral {
  catItems?: Definitions.Cat;
  flipItems?: Definitions.Flip;
}

interface Props {
  mode: 'masonry' | 'grid';
  collaterals: Coll[];
  collateralStructure?: Definitions.CollateralsStructure;
  filters?: FilterSelectable[][];
  onFilterClick: (
    index: number,
  ) => (filter: FilterSelectable, selected?: boolean) => void;
  onFilterClear: (index: number) => () => void;
  hideFilters?: boolean;
  onParameterClick: (value: string) => void;
  paramSelected?: string;
  onParamHover: (value?: string) => void;
  paramHover?: string;
}

const getSections = (
  coll: Coll,
  collateralStructure: Definitions.CollateralsStructure,
  selectedTagsOfParams: string[],
) =>
  (collateralStructure.categories || [])
    .map((category: Definitions.CollateralCategory) => {
      const fields = (category.fields || [])
        .map((ele) => ({
          ...ele,
          categoryName: category.name,
        }));

      const items = getItemsByCategory(
        coll,
        selectedTagsOfParams,
        collateralStructure,
        fields,
      );

      return ({
        title: category.name,
        items,
      });
    })
    .filter((f) => f.items.length);

export default function CollateralList({
  mode,
  collaterals,
  collateralStructure = {},
  filters = [],
  onFilterClick,
  onFilterClear,
  hideFilters = false,
  onParameterClick,
  paramSelected,
  onParamHover,
  paramHover,
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

  const gotoCollaterals = useCallback(() => {
    push('/collaterals');
  }, [push]);

  const filterAppliedDetails = useMemo(() => {
    // Filter ACTIVES
    const filtersActives = compose(
      pluck(path('tag')),
      fpFilter(path('selected')),
      unnest,
    )(filters);

    const byRulesFunc = (category: Definitions.CollateralCategory) =>
      has('rules')(category) &&
      contains(path('name')(category))(filtersActives);

    // Filters based on Rules
    const filterWithRules = compose(
      unnest,
      pluck(path('rules')),
      fpFilter(byRulesFunc),
    )(categories);

    // Filters based on Includes
    const filterActiveIncludes = (category: Definitions.CollateralCategory) =>
      has('includes')(category) &&
      contains(path('name')(category))(filtersActives);

    const filterWithIncludes = compose(
      unnest,
      pluck(path('includes')),
      fpFilter(filterActiveIncludes),
    )(categories);

    return ({
      filterWithRules,
      filterWithIncludes,
    });
  }, [categories, filters]);

  const filteredCollaterals = useMemo(() => {
    const { filterWithRules, filterWithIncludes } = filterAppliedDetails;

    const result = collaterals.filter((coll) => {
      // Applying Rules
      const rulesFilter = (rule: Definitions.Rule) => {
        const valueToTest = compose(
          toNumber,
          path(path('field')(rule)),
        )(coll);

        return valueToTest > path('gt')(rule) || valueToTest < path('lt')(rule);
      };

      // Check if the collateral pass any RULES filteers
      const passedTestRules = any(rulesFilter)(filterWithRules);

      // Check if the collateral pass any RULES filteers
      const passedTestIncludes = contains(path('asset')(coll))(filterWithIncludes);

      // Check if there is no filter applied (allow all the collaterals)
      const noFilterApplied = filterWithIncludes.length === 0 && filterWithRules.length === 0;

      return noFilterApplied || passedTestRules || passedTestIncludes;
    });

    return result;
  }, [collaterals, filterAppliedDetails]);

  const containerRef = useRef(null);
  const size = useComponentSize(containerRef);
  const masonryRef = React.useRef(null);
  const [, windowHeight] = useWindowSize();
  const { width } = useContainerPosition(masonryRef, [
    size.width,
    windowHeight,
  ]);

  const positioner = usePositioner(
    {
      width,
      columnWidth: 350,
      columnGutter: 32,
      columnCount: width > 1940 ? 4 : 0,
    },
    [filteredCollaterals, width],
  );

  const resizeObserver = useResizeObserver(positioner);

  const CardView = ({
    data: coll,
  }: RenderComponentProps<Definitions.Collateral>) => (
    <div key={Math.random()}>
      <CollateralsCard
        key={Math.random()}
        asset={coll.asset}
        sections={getSections(coll, collateralStructure, selectedTagsOfParams)}
        header={{
          title: coll.humanReadableName || coll.asset,
          iconName: getIlkResourceByToken(coll.asset).iconName,
          iconImg: coll.iconImg,
          link: getEtherscanAddressLinkFromHash(coll.address),
        }}
        onParameterClick={onParameterClick}
        paramSelected={paramSelected}
        onParamHover={onParamHover}
        paramHover={paramHover}
      />
    </div>
  );

  return (
    <Container ref={containerRef}>
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
      {mode === 'grid' && (
        <GridContainer>
          {filteredCollaterals.map((coll) => (
            <div key={Math.random()}>
              <CollateralsCard
                key={Math.random()}
                asset={coll.asset}
                sections={getSections(coll, collateralStructure, selectedTagsOfParams)}
                header={{
                  title: coll.humanReadableName || coll.asset,
                  iconName: getIlkResourceByToken(coll.asset).iconName,
                  iconImg: coll.iconImg,
                  link: getEtherscanAddressLinkFromHash(coll.address),
                }}
                onParameterClick={onParameterClick}
                paramSelected={paramSelected}
                onParamHover={onParamHover}
                paramHover={paramHover}
              />
            </div>
          ))}
        </GridContainer>
      )}
      {mode === 'masonry' && (
        <MasonryScroller
          items={filteredCollaterals}
          render={CardView}
          positioner={positioner}
          containerRef={masonryRef}
          height={windowHeight}
          resizeObserver={resizeObserver}
        />
      )}
      {hideFilters && (
        <Button onClick={gotoCollaterals}>
          <LabelStyled
            size="14px"
            lineHeight="19px"
            color="#1AAB9B"
            weight="bold"
          >
            See all Collaterals
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

const GridContainer = styled.div`
  background: linear-gradient(
    26.92deg,
    #ddf3f0 24.9%,
    rgba(255, 255, 255, 0) 126.82%
  );
  border-radius: 20px;
  padding: 79px 28px 30px 28px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 2rem;
  ${up('lg')} {
    grid-template-columns: 1fr 1fr 1fr;
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
  top: 20px;
  background: none;
  border: none;
  padding-right: 0px;
  cursor: pointer;
  border: 1px solid #1aab9b;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 6.5px 20px;
`;
