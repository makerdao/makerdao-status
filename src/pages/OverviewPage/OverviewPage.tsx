/* eslint-disable no-confusing-arrow */
import React from 'react';
import { down } from 'styled-breakpoints';
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
            <ContainerChart paddingRight="2.18%">
              <StackBarChartContainer />
            </ContainerChart>
            <ContainerChart paddingLeft="2.18%" paddingTopDownSm="2.18%">
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
  paddingLeft?: string;
  paddingRight?: string;
  paddingTopDownSm?: string;
  minHeight?: string;
}

const Container = styled.div`
  margin-left: 4.5%;
  margin-right: 5.75%;
`;

const Section = styled.div`
  position: relative;
  ${({ minHeight }: StyleProps) =>
    minHeight ? `min-height: ${minHeight};` : ''}
  margin-top: 4.36%;
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
  ${({ paddingLeft }: StyleProps) =>
    paddingLeft ? `padding-left: ${paddingLeft};` : ''}
  ${({ paddingRight }: StyleProps) =>
    paddingRight ? `padding-right: ${paddingRight};` : ''}
  width: 50%;
  ${down('sm')} {
    min-height: 150px;
    padding-left: 0px;
    padding-right: 0px;
    width: 100%;
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
