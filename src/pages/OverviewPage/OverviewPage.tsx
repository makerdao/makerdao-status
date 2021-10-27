import React from 'react';
import { down } from 'styled-breakpoints';
import styled from 'styled-components';
import { CollateralListContainer } from '../../components/CollateralList';
import CollateralsStructureErrorBoundary from '../../components/errors/CollateralsStructureErrorBoundary';
import WrapperPage from '../../components/wrappers/WrapperPage';

export default function OverviewPage() {
  return (
    <WrapperPage
      header={{
        title: 'Overview',
        iconName: 'overview',
      }}
    >
      <Container>
        <Section>
          <CollateralsStructureErrorBoundary>
            <CollateralListContainer isSummary />
          </CollateralsStructureErrorBoundary>
        </Section>
        <EndSpacer />
      </Container>
    </WrapperPage>
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

const Section = styled.div`
  margin-top: 70px;
  ${down('xs')} {
    margin-top: 20px;
  }
`;

const EndSpacer = styled.div`
  height: 45px;
  ${down('xs')} {
    height: 20px;
  }
`;
