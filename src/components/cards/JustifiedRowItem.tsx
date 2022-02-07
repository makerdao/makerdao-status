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
  center?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onHover?: React.MouseEventHandler<HTMLDivElement>;
  onLeave?: React.MouseEventHandler<HTMLDivElement>;
  hover?: boolean;
  notFramedLabel?: boolean;
}

const JustifiedRowItem = ({
  label,
  enframedLabel = '',
  termsLink = '',
  notFramedLabel = true,
  value = '',
  selected = false,
  alignItems = 'center',
  isTitleSection = false,
  center,
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
    center={center}
    alignItems={alignItems}
    selected={selected}
    hover={hover}
    onClick={onClick}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <Span id="left-span" display="inline">
      <Link target="_blank" href={termsLink}>
        <Label
          id="main-label"
          cursor={termsLink ? 'pointer' : 'default'}
          weight={isTitleSection ? '600' : '500'}
          size={isTitleSection ? '16px' : '14px'}
          lineHeight={isTitleSection ? '19px' : '16px'}
          color={
            // eslint-disable-next-line no-nested-ternary
            isTitleSection ? '#31394D' : termsLink ? '#2F80ED' : '#748AA1'
          }
        >
          {`${label}${' '}`}
        </Label>
      </Link>
      {!notFramedLabel && (
        <>
          <Label id="parenthesis" color="#31394D" weight="500">
            {enframedLabel ? '(' : ''}
          </Label>
          {termsLink ? (
            <Link target="_blank" href={termsLink}>
              <Label id="enframedLabel" color="#2F80ED" cursor="pointer">
                {enframedLabel}
              </Label>
            </Link>
          ) : (
            <Label id="enframedLabel" color="gray">
              {enframedLabel}
            </Label>
          )}
          <Label id="parenthesis" color="#31394D" weight="500">
            {enframedLabel ? ')' : ''}
          </Label>
        </>
      )}
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
            marginLeft="10px"
          >
            <Icon
              width={14}
              height={14}
              name="lastChangeLink"
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
  ${({ isTitleSection }: Partial<Props>) =>
    isTitleSection ? 'margin: 0px 30px;' : ''}
  background: ${({ selected, hover }: Partial<Props>) =>
    // eslint-disable-next-line no-nested-ternary
    selected ? '#D6E6FB' : hover ? '#E9F7F5' : 'white'};
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
  ${({ center }: Partial<Props>) => (center ? 'justify-content: center;' : '')}
  align-items: center;
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
    height?: string;
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
  height: 14px;
`;

export default JustifiedRowItem;
