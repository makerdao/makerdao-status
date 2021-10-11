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
    <Header>
      <div>
        <Span>
          <Label>{`${label}(`}</Label>
          <EnframedLabel>{enframedLabel}</EnframedLabel>
          <Label>)</Label>
        </Span>
      </div>
      <div>
        <Span>
          <Button onClick={onAction}>
            <Label>{value}</Label>
            <Icon width={15} height={15} name="openInNewIcon" fill="white" />
          </Button>
        </Span>
      </div>
    </Header>
  </ItemContainer>
);

const Header = styled.div`
  padding: 15px 20px 8px 20px;
  background: #d1eeeb;
  border-radius: 10px 10px 0px 0px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemContainer = styled.div`
  margin: ${({ margin }: Partial<Props>) => margin};
  border: 1px solid red;
  border-radius: 10px 10px 10px 10px;
  min-height: 300px;
  width: 100%;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;

const EnframedLabel = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;

const Button = styled.button`
  margin-left: 10px;
  background: none;
  border: none;
`;

export default ItemCard;
