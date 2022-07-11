/* eslint-disable no-confusing-arrow */
import React, { useCallback } from 'react';
import styled from 'styled-components';

type Props = {
  tabs: string[];
  onSelect: (index: number) => void;
  selected: number;
};

const LegendTab = ({ tabs, onSelect, selected }: Props) => {
  const onClick = useCallback(
    (index: number) => () => onSelect(index),
    [onSelect],
  );

  return (
    <Container>
      {tabs.map((t, i) => (
        <Tab
          key={Math.random()}
          onClick={onClick(i)}
          selected={i === selected}
          leftBorder={i === 0}
          rightBorder={i === tabs.length - 1}
          fullBorder={i === 0 && i === tabs.length - 1}>
          {t}
        </Tab>
      ))}
    </Container>
  );
};

interface StyledProps {
  leftBorder?: boolean;
  rightBorder?: boolean;
  selected?: boolean;
  fullBorder?: boolean;
}

const Container = styled.div`
  padding-top: 28%;
  display: flex;
  justify-content: center;
`;

const Tab = styled.button<StyledProps>`
  font-family: 'Roboto',sans-serif;
  font-style: normal;
  ${({ selected }) =>
    selected
      ? `
color: rgba(49, 57, 77, 0.5);
font-weight: 400;
font-size: 12px;
line-height: 16px;
  `
      : `color: #31394d;
      font-weight: 500;
      font-size: 13px;
      line-height: 18px;`}
  height: 39px;
  border: none;
  padding: 0 10px;
  background: ${({ selected }) =>
    selected ? 'rgba(184, 197, 211, 0.1)' : '#ffffff'};
  box-shadow: ${({ selected }) =>
    selected ? '' : '0px 4px 9.03012px rgba(176, 190, 197, 0.25)'};
  ${({ leftBorder }: StyledProps) =>
    leftBorder ? 'border-radius: 10px 0px 0px 10px;' : ''}
  ${({ rightBorder }: StyledProps) =>
    rightBorder ? 'border-radius: 0px 10px 10px 0px;' : ''}
  ${({ fullBorder }: StyledProps) =>
    fullBorder ? 'border-radius: 10px 10px 10px 10px;' : ''}
`;
export default LegendTab;
