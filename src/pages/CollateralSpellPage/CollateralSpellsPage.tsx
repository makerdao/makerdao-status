/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from 'lodash';
import { Moment } from 'moment';
import React, { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import styled from 'styled-components';
import { DatePicker, CollateralSpellList, PageWrapper, Spinner } from '../../components';
import Input from '../../components/inputs/Input';
import { useSideBarContext } from '../../context/SidebarContext';
import apiClient from '../../services/apiClient';

interface Props {
  spells: Definitions.SpellChangeNew[];
  onSearch: React.ChangeEventHandler<HTMLInputElement>;
  startDate?: Moment;
  endDate?: Moment;
  onDatesChange: ({
    startDate,
    endDate,
  }: {
    startDate?: Moment;
    endDate?: Moment;
  }) => void;
  selectedSpell?: string;
  rowsExpanded?: string[];
  onloadMore?: () => void;
  loading?: boolean;
}

export default function CollateralSpellsPage({
  spells,
  onSearch,
  onDatesChange,
  startDate,
  endDate,
  selectedSpell,
  rowsExpanded = [],
  onloadMore,
  loading,
}: Props) {
  const { push } = useHistory();
  const { hash } = useLocation();

  const debouncedOnSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);
  const rowsExpandedMemo = useMemo(
    () => (selectedSpell ? [selectedSpell, ...rowsExpanded] : rowsExpanded),
    [rowsExpanded, selectedSpell],
  );

  const isDownXs = useBreakpoint(down('xs'));
  const { expanded: expandedInStorage } = useSideBarContext();

  const expanded = useMemo(
    () => expandedInStorage && !isDownXs,
    [expandedInStorage, isDownXs],
  );

  const gotoBasicSpells = useCallback(() => {
    push('/spells');
  }, [push]);
  return (
    <PageWrapper
      header={{
        title: 'Spells (changelogs)',
        iconName: 'spells',
        action: gotoBasicSpells,
      }}>
      <Container>
        {/* <FiltersContainer> */}
        {/*  <Spacer> */}
        {/*    <DatePicker */}
        {/*      startDate={startDate} */}
        {/*      endDate={endDate} */}
        {/*      onDatesChange={onDatesChange} */}
        {/*    /> */}
        {/*  </Spacer> */}
        {/* </FiltersContainer> */}

        {loading && (
          <Spinner
            top="50vh"
            position="fixed"
            left={expanded ? '56.70%' : '52%'}
          />
        )}
        <CollateralSpellList
          spells={spells}
          loading={loading}
          rowsExpanded={[]}
          onloadMore={onloadMore}
        />
      </Container>
    </PageWrapper>
  );
}
const Spacer = styled.div`
  margin-left: 24px;
  ${down('xs')} {
    margin-left: 0;
    margin-top: 10px;
  }
`;

const Container = styled.div`
  margin-left: 4.5%;
  margin-right: 4.5%;
  padding-top: 100px;
  ${down('xs')} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 43px;
  margin-bottom: 59px;
  flex-wrap: wrap;
  ${down('xs')} {
    flex-direction: column;
  }
`;

const InputStyled = styled(Input)`
  ${down('xs')} {
    width: 100%;
  }
`;
