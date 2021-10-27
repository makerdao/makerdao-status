import React, { useMemo } from 'react';
import { down, between } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import { OverviewPage } from '..';
import { Spinner } from '../../components/styledComponents';
import { useMainContext } from '../../context/MainContext';

export default function OverviewContainerPage() {
  const isDownXs = useBreakpoint(down('sm'));
  const isBetweenXsMd = useBreakpoint(between('xs', 'md'));
  const isBetweenMdLg = useBreakpoint(between('md', 'lg'));
  const {
    state: { collaterals, cats, flips },
    loading,
  } = useMainContext();

  const mappedCollaterals = (collaterals || []).map((coll) => {
    const catItems = (cats || []).find(
      (catItem) => catItem.asset === coll.asset,
    );
    const flipItems = (flips || []).find(
      (flipsItem) => flipsItem.asset === coll.asset,
    );
    return {
      ...coll,
      catItems,
      flipItems,
    };
  });

  const sliceCollaterals = useMemo(() => {
    let end = 4;
    if (isDownXs) {
      end = 1;
    }
    if (isBetweenXsMd) {
      end = 2;
    }
    if (isBetweenMdLg) {
      end = 3;
    }

    return mappedCollaterals.slice(0, end);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBetweenMdLg, isBetweenXsMd, isDownXs, mappedCollaterals]);

  if (loading) return <Spinner />;

  return <OverviewPage collaterals={sliceCollaterals || []} />;
}
