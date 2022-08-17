/* eslint-disable no-confusing-arrow */
import React from 'react';
import { up, down } from 'styled-breakpoints';
import styled from 'styled-components';
import {
  CollateralListContainer,
  CollateralsStructureErrorBoundary,
  PageWrapper,
  PieChartContainer,
  StackBarChartContainer,
  SummaryOverviewContainer,
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
        <Section id="first-section">
          <ResponsiveRow>
            <ContainerChart paddingRight="2.18%">
              <StackBarChartContainer />
            </ContainerChart>
            <ContainerChart paddingLeft="2.18%" paddingTopDownSm="2.18%">
              <PieChartContainer />
            </ContainerChart>
          </ResponsiveRow>
        </Section>
        <Section id="second-section" minHeight="413px">
          <SummaryOverviewContainer />
        </Section>
        <Section id="third-section" minHeight="388px" marginTop="30px">
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
  marginTop?: string;
}

const Container = styled.div`
  margin-left: 4.5%;
  margin-right: 4.5%;
`;

const Section = styled.div<Partial<StyleProps>>`
  position: relative;
  ${({ minHeight }) => (minHeight ? `min-height: ${minHeight};` : '')}
  ${({ marginTop }) =>
    marginTop ? `margin-top: ${marginTop}` : 'margin-top: 4.36%;'}
`;

const ResponsiveRow = styled.div`
  display: flex;
  ${down('lgm')} {
    flex-direction: column;
  }
  ${up('lgm')} {
    min-height: 355px;
    flex-direction: row;
    justify-content: space-between;
    gap: 27px;
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
  ${down('lgm')} {
    min-height: 150px;
    padding-left: 0px;
    padding-right: 0px;
    width: 100%;
    ${({ paddingTopDownSm }: StyleProps) =>
      paddingTopDownSm ? `padding-top: ${paddingTopDownSm};` : ''}
  }
  ${up('lgm')} {
    min-width: 539px;
    min-height: 355px;
    padding: 0;
  }
`;

const EndSpacer = styled.div`
  height: 45px;
  ${down('xs')} {
    height: 20px;
  }
`;
