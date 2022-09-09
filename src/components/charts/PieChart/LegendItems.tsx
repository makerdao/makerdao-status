/* eslint-disable no-confusing-arrow */
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemedStyledProps } from 'styled-components';
import { Label } from '../..';

type Props = {
  label: string;
  link?: string;
  value: string | number;
  isFilled?: boolean;
};

const LegendItems = ({ label, value, link, isFilled }: Props) => (
  <Container isFilled={isFilled}>
    <Span className="left-span" display="inline">
      {link
        ? (
          <Label id="link" color="#2F2F2F" weight="500">
            <Link target="_blank" to={link}>
              {label}
            </Link>
          </Label>
        )
        : (
          <Label
            className="main-label"
            weight="400"
            color="#2F2F2F">
            {`${label}${' '}`}
          </Label>
        )}
    </Span>

    <Span className="right-span" marginTop="1.5px">
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
  margin: 0 0;
  padding: 3px 25px;
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

  @media (min-width: 1366px) and (max-width: 1799px){
    min-height: 28px;
  }
`;

export default LegendItems;
