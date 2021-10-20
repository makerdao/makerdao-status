/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from 'lodash';
import { Moment } from 'moment';
import React, { useMemo } from 'react';
import { down } from 'styled-breakpoints';
import styled from 'styled-components';
import { Input, SpellList } from '../../components/styledComponents';
import DatePicker from '../../components/styledComponents/DatePicked';
import WrapperPage from '../../components/wrappers/WrapperPage';

interface Props {
  spells: Definitions.Spell[];
  onSearch: React.ChangeEventHandler<HTMLInputElement>;
  search?: string;
  startDate?: Moment;
  endDate?: Moment;
  onDatesChange: ({
    startDate,
    endDate,
  }: {
    startDate?: Moment;
    endDate?: Moment;
  }) => void;
}

export default function SpellsPage({
  spells,
  onSearch,
  search,
  onDatesChange,
  startDate,
  endDate,
}: Props) {
  const debouncedOnSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);

  return (
    <WrapperPage header={{ title: 'Spells (changelogs)', iconName: 'spells' }}>
      <Container>
        <FiltersContainer>
          <Spacer>
            <InputStyled
              defaultValue={search}
              type="search"
              placeholder="search"
              onChange={debouncedOnSearch}
            />
          </Spacer>
          <Spacer>
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              onDatesChange={onDatesChange}
            />
          </Spacer>
        </FiltersContainer>
        <SpellList spells={spells} />
      </Container>
    </WrapperPage>
  );
}
const Spacer = styled.div`
  margin-left: 24px;
  margin-top: 10px;
  ${down('xs')} {
    margin-left: 0px;
    margin-top: 10px;
  }
`;
const Container = styled.div`
  margin-left: 3rem;
  margin-right: 3rem;
  ${down('xs')} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  margin-top: 33px;
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
