/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from 'lodash';
import React, { useMemo, useRef } from 'react';
import { down } from 'styled-breakpoints';
import styled from 'styled-components';
import { Input, SpellList } from '../../components/styledComponents';
import WrapperPage from '../../components/wrappers/WrapperPage';

interface Props {
  spells: Definitions.Spell[];
  onSearch: React.ChangeEventHandler<HTMLInputElement>;
  onSelectInitDate: React.ChangeEventHandler<HTMLInputElement>;
  onSelectEndDate: React.ChangeEventHandler<HTMLInputElement>;
  search?: string;
}

export default function SpellsPage({
  spells,
  onSearch,
  search,
  onSelectInitDate,
  onSelectEndDate,
}: Props) {
  const refInitDate = useRef();
  const refIEndDate = useRef();
  const debouncedOnSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);

  const onFocus =
    (ref: React.MutableRefObject<undefined>, type: 'date' | 'text') => () => {
      if (ref && ref.current) {
        // eslint-disable-next-line no-param-reassign
        (ref.current as any).type = type;
      }
    };

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
          {/* TODO: date inputs are temporal */}
          <Spacer>
            <DateInput
              type="text"
              ref={refInitDate as any}
              onFocus={onFocus(refInitDate, 'date')}
              onBlur={onFocus(refInitDate, 'text')}
              placeholder="Select init date"
              onChange={onSelectInitDate}
            />
          </Spacer>
          <Spacer>
            <DateInput
              type="text"
              placeholder="Select end date"
              ref={refIEndDate as any}
              onFocus={onFocus(refIEndDate, 'date')}
              onBlur={onFocus(refIEndDate, 'text')}
              onChange={onSelectEndDate}
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

const DateInput = styled(Input)`
  // :before {
  //   content: attr(placeholder) !important;
  //   // color: #aaa;
  //   margin-right: 0.5em;
  // }
  // :focus:before,
  // :valid:before {
  //   content: '';
  // }
`;
