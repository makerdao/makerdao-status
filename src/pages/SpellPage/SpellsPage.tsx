/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { between, down, up } from 'styled-breakpoints';
import styled from 'styled-components';
import { SpellList } from '../../components/styledComponents';
import WrapperPage from '../../components/wrappers/WrapperPage';

interface Props {
  spells: Definitions.Spell[];
}

export default function SpellsPage({ spells }: Props) {
  return (
    <WrapperPage header={{ title: 'Spells (changelogs)', iconName: 'spells' }}>
      <Container>
        <SpellList spells={spells} />
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
