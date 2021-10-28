import React from 'react';
import { down } from 'styled-breakpoints';
import styled from 'styled-components';
import { PageWrapper } from '../../components';
import { CollateralListContainer } from '../../components/lists';

export default function CollateralPage() {
  return (
    <PageWrapper
      header={{
        title: 'Collaterals',
        iconName: 'collateral',
      }}
    >
      <Container>
        <CollateralListContainer />
      </Container>
    </PageWrapper>
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
