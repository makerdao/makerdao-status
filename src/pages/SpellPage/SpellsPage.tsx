/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from 'lodash';
import React, { useMemo } from 'react';
import { down } from 'styled-breakpoints';
import styled from 'styled-components';
import { Input, Select, SpellList } from '../../components/styledComponents';
import WrapperPage from '../../components/wrappers/WrapperPage';

interface Props {
  spells: Definitions.Spell[];
  onSearch: React.ChangeEventHandler<HTMLInputElement>;
  search?: string;
}

type LabelValue = {
  label: string;
  value: string;
};

export const sortOptions: readonly LabelValue[] = [
  { value: 'title', label: 'Title' },
  {
    value: 'created',
    label: 'Date of Created',
  },
  { value: 'status', label: 'Status' },
];

export default function SpellsPage({ spells, onSearch, search }: Props) {
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
            <Select options={sortOptions} isClearable />
          </Spacer>
        </FiltersContainer>
        <SpellList spells={spells} />
      </Container>
    </WrapperPage>
  );
}
const Spacer = styled.div`
  margin-left: 24px;
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
  ${down('xs')} {
    flex-direction: column;
  }
`;

const InputStyled = styled(Input)`
  ${down('xs')} {
    width: 100%;
  }
`;
