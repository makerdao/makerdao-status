/* eslint-disable no-confusing-arrow */
import React, { PropsWithChildren, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImg from '../assets/img/NotFoundPageImg.png';
import { Icon, Label, LabelProps, PrimaryButton } from '../components';

export default function NotFoundPage() {
  const { push } = useHistory();
  const gotoOverview = useCallback(() => {
    push('/overview');
  }, [push]);

  return (
    <Container>
      <Coll background="#009f8d">
        <ImageContainer background={backgroundImg} />
      </Coll>
      <Coll>
        <Center>
          <StyledLabel
            size="50px"
            weight="bold"
            lineHeight="19px"
            color="#71C8BE"
            marginBottom="36px"
          >
            Oops!
          </StyledLabel>
          <StyledLabel
            size="18px"
            lineHeight="19px"
            color="#71C8BE"
            marginBottom="73px"
          >
            The Page you requested could not be found
          </StyledLabel>
          <IconContainer marginBottom="67px">
            <Icon
              width={54}
              height={33}
              name="logoWithTitleBelow"
              fill="white"
            />
          </IconContainer>
          <PrimaryButton onClick={gotoOverview} label="Back to home" />
        </Center>
      </Coll>
    </Container>
  );
}

interface StyledProps {
  background?: string;
  marginBottom?: string;
}

const Container = styled.div`
  display: flex;
  background: white;
`;

const ImageContainer = styled.div`
  ${({ background }: StyledProps) =>
    background ? `background: url(${background});` : ''}
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  position: relative;
`;

const IconContainer = styled.div`
  ${({ marginBottom }: StyledProps) =>
    marginBottom ? `margin-bottom: ${marginBottom};` : ''}
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Coll = styled.div`
  flex: 0.5;
  ${({ background }: StyledProps) =>
    background ? `background: ${background};` : ''}
`;

const StyledLabel = styled((props: PropsWithChildren<LabelProps>) => (
  <Label {...props} />
))`
  ${({ marginBottom }: StyledProps) =>
    marginBottom ? `margin-bottom: ${marginBottom};` : ''}
`;
