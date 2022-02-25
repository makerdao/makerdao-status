import React from 'react';
import { down } from 'styled-breakpoints';
import styled from 'styled-components';
import { PageWrapper, CollateralListContainer } from '../../components';

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
  margin-left: 4.5%;
  margin-right: 4.5%;
  ${down('xs')} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;
