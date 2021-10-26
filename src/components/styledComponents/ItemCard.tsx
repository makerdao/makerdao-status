/* eslint-disable no-confusing-arrow */
import React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import Icon from '../Icon';

interface Props {
  label: string;
  enframedLabel?: string;
  link?: string;
  value?: string;
  selected?: boolean;
  margin?: string;
  border?: string;
  onAction?: () => void;
  isTitleSection?: boolean;
}

const ItemCard = ({
  label,
  enframedLabel = '',
  link,
  value = '',
  selected = false,
  border = '',
  margin = '',
  isTitleSection = false,
  onAction,
}: Props) => (
  <ItemContainer
    isTitleSection={isTitleSection}
    selected={selected}
    border={border}
    margin={margin}
  >
    <Span display="inline">
      <Label
        weight={isTitleSection ? '600' : '500'}
        fontSize={isTitleSection ? '16px' : '14px'}
        lineHeight={isTitleSection ? '19px' : '16px'}
        color={isTitleSection ? '#31394D' : '#748AA1'}
      >
        {`${label}${enframedLabel ? ' (' : ''}`}
      </Label>
      <Link target="_blank" href={link}>
        <Label color="#2F80ED">{enframedLabel}</Label>
      </Link>
      <Label color="#31394D" weight="500">
        {enframedLabel ? ')' : ''}
      </Label>
    </Span>
    {!isTitleSection && (
      <Span>
        <Label textAlign="end">{value}</Label>
        <Button onClick={onAction}>
          <Icon
            width={12}
            height={12}
            name="openInNewIcon"
            fill={isTitleSection ? '#2F80ED' : '#748AA1'}
          />
        </Button>
      </Span>
    )}
  </ItemContainer>
);

const ItemContainer = styled.div`
  padding: 5px 0px 5px 0px;
  background: ${({ selected }: Partial<Props>) =>
    selected ? '#EBEDF4' : 'white'};
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  grid-gap: 10px;
  align-items: center;
  justify-content: space-between;
  border-top: ${({ isTitleSection }: Partial<Props>) =>
    isTitleSection ? '1px solid #EBEDF4' : ''};
  border-bottom: ${({ isTitleSection }: Partial<Props>) =>
    isTitleSection ? '1px solid #EBEDF4' : ''};
`;

type LabelProps = ThemedStyledProps<
  {
    textAlign?: string;
    weight?: string;
    fontSize?: string;
    lineHeight?: string;
    marginRight?: string;
    color?: string;
    display?: string;
  },
  unknown
>;

const Span = styled.span`
  display: ${({ display }: LabelProps) => display || 'flex'};
  margin-right: ${({ marginRight }: LabelProps) => marginRight || '0px'};
  align-items: center;
`;

const Label = styled.label`
  text-align: ${({ textAlign }: LabelProps) => textAlign || 'center'};
  font-weight: ${({ weight }: LabelProps) => weight || '500'};
  font-size: ${({ fontSize }: LabelProps) => fontSize || '14px'};
  line-height: ${({ lineHeight }: LabelProps) => lineHeight || '16px'};
  color: ${({ color }: LabelProps) => color};
`;

const Link = styled.a`
  background: none;
  border: none;
  text-decoration: none;
  color: #2f80ed;
`;

const Button = styled.button`
  margin-left: 10px;
  background: none;
  border: none;
  padding-right: 0px;
`;

export default ItemCard;
