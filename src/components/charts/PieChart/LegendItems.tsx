/* eslint-disable no-confusing-arrow */
import React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import { Label } from '../..';

type Props = {
  label: string;
  value: string | number;
  subLabel?: string;
  isFilled?: boolean;
};

const LegendItems = ({ label, value, subLabel, isFilled }: Props) => (
  <Container isFilled={isFilled}>
    <Span id="left-span" display="inline">
      <Label
        id="main-label"
        weight="500"
        size="14px"
        lineHeight="16px"
        color="#2F2F2F">
        {`${label}${' '}`}
      </Label>

      {subLabel && (
        <>
          <Label id="parenthesis" color="rgba(49, 57, 77, 0.5)" weight="400">
            {subLabel ? '(' : ''}
          </Label>

          <Label id="enframedLabel" color="#2F80ED">
            {subLabel}
          </Label>
          <Label id="parenthesis" color="rgba(49, 57, 77, 0.5)" weight="400">
            {subLabel ? ')' : ''}
          </Label>
        </>
      )}
    </Span>
    <Span id="right-span" marginTop="1.5px">
      <Label id="value" textAlign="end" color="#1AAB9B" weight="500">
        {value}
      </Label>
    </Span>
  </Container>
);

type LabelProps = ThemedStyledProps<
  {
    textAlign?: string;
    weight?: string;
    fontSize?: string;
    lineHeight?: string;
    marginRight?: string;
    marginTop?: string;
    color?: string;
    display?: string;
    marginLeft?: string;
    cursor?: string;
    height?: string;
    isFilled?: boolean;
  },
  unknown
>;

const Span = styled.span`
  display: ${({ display }: LabelProps) => display || 'flex'};
  margin-right: ${({ marginRight }: LabelProps) => marginRight || '0px'};
  margin-top: ${({ marginTop }: LabelProps) => marginTop || '0px'};
  align-items: center;
`;

const Container = styled.div`
  margin: 5px 0px;
  padding: 5px 30px 5px 30px;
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  grid-gap: 10px;

  justify-content: space-between;
  align-items: center;

  background: ${({ isFilled }: LabelProps) =>
    isFilled ? 'rgba(26, 171, 155, 0.1)' : 'none'};
  border-radius: 32px;
  min-height: 37px;
`;

export default LegendItems;
