/* eslint-disable no-confusing-arrow */
import React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import { Icon, Label } from '..';

interface Props {
  label: string;
  enframedLabel?: string;
  termsLink?: string;
  value?: string;
  selected?: boolean;
  alignItems?: string;
  paramsLink?: string;
  blank?: string;
  isTitleSection?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onHover?: React.MouseEventHandler<HTMLDivElement>;
  onLeave?: React.MouseEventHandler<HTMLDivElement>;
  hover?: boolean;
}

const JustifiedRowItem = ({
  label,
  enframedLabel = '',
  termsLink,
  value = '',
  selected = false,
  alignItems = 'center',
  isTitleSection = false,
  paramsLink,
  blank,
  className,
  onClick,
  onHover,
  onLeave,
  hover,
}: Props) => (
  <ItemContainer
    className={className}
    isTitleSection={isTitleSection}
    alignItems={alignItems}
    selected={selected}
    hover={hover}
    onClick={onClick}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}>
    <Span id="left-span" display="inline">
      <Label
        id="main-label"
        weight={isTitleSection ? '600' : '500'}
        size={isTitleSection ? '16px' : '14px'}
        lineHeight={isTitleSection ? '19px' : '16px'}
        color={isTitleSection ? '#31394D' : '#748AA1'}>
        {`${label}${' '}`}
      </Label>
      <Label id="parenthesis" color="#31394D" weight="500">
        {enframedLabel ? '(' : ''}
      </Label>
      <Link target="_blank" href={termsLink}>
        <Label id="enframedLabel" color="#2F80ED" cursor="pointer">
          {enframedLabel}
        </Label>
      </Link>
      <Label id="parenthesis" color="#31394D" weight="500">
        {enframedLabel ? ')' : ''}
      </Label>
    </Span>
    {!isTitleSection && (
      <Span id="right-span">
        <Label id="value" textAlign="end">
          {value}
        </Label>
        {paramsLink && (
          <Link
            target={blank ? '_blank' : undefined}
            href={paramsLink}
            marginLeft="10px">
            <Icon
              width={12}
              height={12}
              name="openInNewIcon"
              fill={isTitleSection ? '#2F80ED' : '#748AA1'}
            />
          </Link>
        )}
      </Span>
    )}
  </ItemContainer>
);

const ItemContainer = styled.div`
  padding: 5px 30px 5px 30px;
  background: ${({ selected, hover }: Partial<Props>) =>
    selected || hover ? '#D6E6FB' : 'white'};
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  grid-gap: 10px;
  align-items: ${({ alignItems }: Partial<Props>) => alignItems};
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
    marginLeft?: string;
    cursor?: string;
  },
  unknown
>;

const Span = styled.span`
  display: ${({ display }: LabelProps) => display || 'flex'};
  margin-right: ${({ marginRight }: LabelProps) => marginRight || '0px'};
  align-items: center;
`;

const Link = styled.a`
  background: none;
  border: none;
  text-decoration: none;
  color: #2f80ed;
  margin-left: ${({ marginLeft }: LabelProps) => marginLeft || '0px'};
  margin-right: ${({ marginRight }: LabelProps) => marginRight || '0px'};
`;

export default JustifiedRowItem;
