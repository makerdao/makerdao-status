/* eslint-disable no-confusing-arrow */
import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

interface Props {
  label: string;
  enframedLabel: string;
  value: string;
  selected?: boolean;
  margin?: string;
  border?: string;
  onAction: () => void;
}

const ItemCard = ({
  label,
  enframedLabel,
  value,
  selected = false,
  border = '',
  margin = '',
  onAction,
}: Props) => (
  <ItemContainer selected={selected} border={border} margin={margin}>
    <div>
      <Span>
        <Label color="#748AA1">{`${label}(`}</Label>
        <Label color="#2F80ED">{enframedLabel}</Label>
        <Label color="#31394D" weight="500">
          )
        </Label>
      </Span>
    </div>
    <div>
      <Span>
        <Label>{value}</Label>
        <Button onClick={onAction}>
          <Icon width={12} height={12} name="openInNewIcon" fill="#748AA1" />
        </Button>
      </Span>
    </div>
  </ItemContainer>
);

const ItemContainer = styled.div`
  padding: 5px 20px 5px 20px;
  background: ${({ selected }: Partial<Props>) =>
    selected ? '#EBEDF4' : 'white'};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: ${({ weight }: { weight?: string }) => weight || ''};
  font-size: 12px;
  line-height: 16px;
  color: ${({ color }: { color?: string }) => color};
`;

const Button = styled.button`
  margin-left: 10px;
  background: none;
  border: none;
`;

export default ItemCard;
