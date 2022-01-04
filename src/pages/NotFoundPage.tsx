/* eslint-disable no-confusing-arrow */
import React, { PropsWithChildren, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImg from '../assets/img/notFound.png';
import { Icon, Label, LabelProps, PrimaryButton } from '../components';

export default function NotFoundPage() {
  const { push } = useHistory();
  const gotoOverview = useCallback(() => {
    push('/overview');
  }, [push]);

  return (
    <Container>
      <Coll>
        <ImageContainer background={backgroundImg} />
      </Coll>
      <Coll>
        <Center>
          <StyledLabel marginBottom="59px">
            <StyledLabel size="50px" weight="bold">
              Oops!
            </StyledLabel>
          </StyledLabel>
          <StyledLabel marginBottom="73px">
            <StyledLabel
              size="18px"
              color="#71C8BE"
              fonts="Roboto"
              weight="normal"
            >
              The Page you requested could not be found
            </StyledLabel>
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
  background-color: white;
`;
const ImageContainer = styled.div`
  ${({ background }: StyledProps) =>
    background ? `background: url(${background});` : ''}
  position: relative;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-repeat: round;
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
  height: 100vh;
`;

const Coll = styled.div`
  flex: 0.5;
  ${({ background }: StyledProps) =>
    background ? `background: ${background};` : ''}
`;

const StyledLabel = styled((props: PropsWithChildren<LabelProps>) => (
  <Label {...props} color="#71C8BE" fonts="Roboto" lineHeight="19px" />
))`
  ${({ marginBottom }: StyledProps) =>
    marginBottom ? `margin-bottom: ${marginBottom};` : ''}
  font-style: normal;
`;
