import React, { PropsWithChildren, useCallback } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';
import { down } from 'styled-breakpoints';
import styled from 'styled-components';
import { Icon, Label, PageWrapper } from '..';

function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  const { push } = useHistory();

  const gotoOverview = useCallback(() => {
    push('/overview');
  }, [push]);

  return (
    <PageWrapper
      header={{
        title: 'Collaterals',
        iconName: 'collateral',
      }}
    >
      <Container>
        <Content role="contentinfo">
          <Icon name="noResultsFound" />
          <Label
            size="26px"
            lineHeight="30px"
            color="#748AA1"
            margin="30px 0px 0px 0px"
          >
            A correct yaml configuration file must be provided
          </Label>
          <Row>
            <Button marginRight="50px" onClick={resetErrorBoundary}>
              <Label
                size="14px"
                lineHeight="19px"
                color="#1AAB9B"
                weight="bold"
              >
                Try again
              </Label>
            </Button>
            <Button onClick={gotoOverview}>
              <Label
                size="14px"
                lineHeight="19px"
                color="#1AAB9B"
                weight="bold"
              >
                Go to Overview
              </Label>
            </Button>
          </Row>
          {/* <button onClick={resetErrorBoundary}>Try again</button> */}
        </Content>
      </Container>
    </PageWrapper>
  );
}

const Container = styled.div`
  margin-left: 3rem;
  margin-right: 3rem;
  ${down('xs')} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const Content = styled.div`
  margin-top: 176px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface ButtonProps {
  marginRight?: string;
}

const Button = styled.button`
  margin-right: ${({ marginRight }: Partial<ButtonProps>) =>
    marginRight || '0px'};
  background: none;
  border: none;
  padding-right: 0px;
  cursor: pointer;
`;

const CollateralsStructureErrorBoundary = ({
  children,
}: PropsWithChildren<{}>) => {
  const [explode, setExplode] = React.useState(false);
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => setExplode(false)}
      resetKeys={[explode]}
    >
      {children}
    </ErrorBoundary>
  );
};

export default CollateralsStructureErrorBoundary;
