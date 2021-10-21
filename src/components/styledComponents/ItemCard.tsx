/* eslint-disable no-confusing-arrow */
import React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import Icon from '../Icon';

interface Props {
  label: string;
  enframedLabel?: string;
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
    <Flex flex="0.6">
      <Span display="inline">
        <Label
          weight={isTitleSection ? '600' : '500'}
          fontSize={isTitleSection ? '16px' : '14px'}
          lineHeight={isTitleSection ? '19px' : '16px'}
          color={isTitleSection ? '#31394D' : '#748AA1'}
        >
          {`${label}${enframedLabel ? ' (' : ''}`}
        </Label>
        <Label color="#2F80ED">{enframedLabel}</Label>
        <Label color="#31394D" weight="500">
          {enframedLabel ? ')' : ''}
        </Label>
      </Span>
    </Flex>
    <div>
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
    </div>
  </ItemContainer>
);

const ItemContainer = styled.div`
  padding: 5px 0px 5px 0px;
  margin: 0px 20px 0px 20px;
  background: ${({ selected }: Partial<Props>) =>
    selected ? '#EBEDF4' : 'white'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: ${({ isTitleSection }: Partial<Props>) =>
    isTitleSection ? '1px solid #EBEDF4' : ''};
  border-bottom: ${({ isTitleSection }: Partial<Props>) =>
    isTitleSection ? '1px solid #EBEDF4' : ''};
`;

const Flex = styled.div`
  flex: ${({ flex }: { flex?: string }) => flex || '1'};
`;

const Span = styled.span`
  display: ${({ display }: { display?: string }) => display || 'flex'};
  align-items: center;
`;

type LabelProps = ThemedStyledProps<
  {
    textAlign?: string;
    weight?: string;
    fontSize?: string;
    lineHeight?: string;
    color?: string;
  },
  unknown
>;
const Label = styled.label`
  text-align: ${({ textAlign }: LabelProps) => textAlign || 'center'};
  font-family: Roboto;
  font-style: normal;
  font-weight: ${({ weight }: LabelProps) => weight || '500'};
  font-size: ${({ fontSize }: LabelProps) => fontSize || '14px'};
  line-height: ${({ lineHeight }: LabelProps) => lineHeight || '16px'};
  color: ${({ color }: LabelProps) => color};
`;

const Button = styled.button`
  margin-left: 10px;
  background: none;
  border: none;
`;

export default ItemCard;
