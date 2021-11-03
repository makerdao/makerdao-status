/* eslint-disable no-confusing-arrow */
import React from 'react';
import { down, up } from 'styled-breakpoints';
import styled from 'styled-components';
import {
  CollateralListContainer,
  CollateralsStructureErrorBoundary,
  PageWrapper,
  StackBarChartContainer,
  PieChartContainer,
} from '../../components';

export default function OverviewPage() {
  return (
    <PageWrapper
      header={{
        title: 'Overview',
        iconName: 'overview',
      }}
    >
      <Container>
        <Section>
          <ResponsiveRow>
            <ContainerChart paddingRightUpLg="35px">
              <StackBarChartContainer />
            </ContainerChart>
            <ContainerChart paddingLeftUpLg="35px" paddingTopDownSm="20px">
              <PieChartContainer />
            </ContainerChart>
          </ResponsiveRow>
        </Section>
        <Section minHeight="413px">
          <CollateralsStructureErrorBoundary>
            <CollateralListContainer isSummary />
          </CollateralsStructureErrorBoundary>
        </Section>
        <EndSpacer />
      </Container>
    </PageWrapper>
  );
}

interface StyleProps {
  paddingLeftUpLg?: string;
  paddingRightUpLg?: string;
  paddingTopDownSm?: string;
  minHeight?: string;
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
  position: relative;
  ${({ minHeight }: StyleProps) =>
    minHeight ? `min-height: ${minHeight};` : ''}
  margin-top: 70px;
  ${down('xs')} {
    margin-top: 20px;
  }
`;

const ResponsiveRow = styled.div`
  display: flex;
  ${down('sm')} {
    flex-direction: column;
  }
`;

const ContainerChart = styled.div`
  position: relative;
  min-height: 277px;
  ${up('lg')} {
    ${({ paddingLeftUpLg }: StyleProps) =>
      paddingLeftUpLg ? `padding-left: ${paddingLeftUpLg};` : ''}
    ${({ paddingRightUpLg }: StyleProps) =>
      paddingRightUpLg ? `padding-right: ${paddingRightUpLg};` : ''}
  }
  ${down('lg')} {
    ${({ paddingLeftUpLg }: StyleProps) =>
      paddingLeftUpLg ? 'padding-left: 1rem;' : ''}
    ${({ paddingRightUpLg }: StyleProps) =>
      paddingRightUpLg ? 'padding-right: 1rem;' : ''}
  }
  width: 50%;
  ${down('sm')} {
    width: 100%;
    padding-left: 0px;
    padding-right: 0px;
    ${({ paddingTopDownSm }: StyleProps) =>
      paddingTopDownSm ? `padding-top: ${paddingTopDownSm};` : ''}
  }
`;

const EndSpacer = styled.div`
  height: 45px;
  ${down('xs')} {
    height: 20px;
  }
`;
