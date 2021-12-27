/* eslint-disable no-confusing-arrow */
import React, { PropsWithChildren, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImg from '../assets/img/notFoundPage.png';
import { Label, LabelProps, PrimaryButton } from '../components';

export default function NotFoundPage() {
  const { push } = useHistory();
  const gotoOverview = useCallback(() => {
    push('/overview');
  }, [push]);

  return (
    <Container>
      <ImageContainer background={backgroundImg}>
        <Center>
          <ContainerLabel marginBottom="20px">
            <StyledLabel size="64px" weight="bold" color="#71C8BE">
              Oops!
            </StyledLabel>
          </ContainerLabel>
          <ContainerLabel marginBottom="20px">
            <StyledLabel size="18px" color="#71C8BE" fonts="Roboto">
              The Page you requested could not be found
            </StyledLabel>
          </ContainerLabel>
          <PrimaryButtonStyle
            onClick={gotoOverview}
            labelProps={{
              weight: 'bold',
            }}
            fontWith="bold"
            label="Back to home"
          />
        </Center>
      </ImageContainer>
    </Container>
  );
}

interface StyledProps {
  background?: string;
  marginBottom?: string;
  marginTop?: string;
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;
const ContainerLabel = styled.div<Partial<StyledProps>>`
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;
const ImageContainer = styled.div<StyledProps>`
  ${({ background }) => (background ? `background: url(${background});` : '')}
  background-size: cover;
  background-repeat: round;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
`;

const StyledLabel = styled((props: PropsWithChildren<LabelProps>) => (
  <Label {...props} color="#1AAB9B" fonts="Roboto" />
))`
  ${({ marginBottom }: StyledProps) =>
    marginBottom ? `margin-bottom: ${marginBottom};` : ''}
  ${({ marginTop }) => (marginTop ? `margin-top: ${marginTop};` : '')}
  font-style: normal;
`;

const PrimaryButtonStyle = styled((props) => (
  <PrimaryButton
    backgroundButton="#1AAB9B"
    paddingButton="12px 10px"
    {...props}
  />
))``;
