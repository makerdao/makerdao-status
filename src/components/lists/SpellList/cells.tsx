/* eslint-disable no-confusing-arrow */
/* eslint-disable no-extra-boolean-cast */
import moment from 'moment';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { Icon, IconNames } from '../..';
import { getColorFromStatus } from '../../../services/utils/color';
import { getEtherscanAddressLinkFromHash } from '../../../services/utils/links';

export const LabelCell = ({
  color,
  emptyColor,
  label,
  emptyMsg,
  id,
  selectedSpell,
  icon,
  onIconClick,
  iconPosition = 'start',
  iconColor = '#B8C5D3',
  background,
  paddingLeft,
  ...rest
}: {
  color?: string;
  emptyColor?: string;
  label?: string;
  emptyMsg: string;
  icon?: IconNames;
  iconColor?: string;
  onIconClick?: (id: string) => void;
  iconPosition?: 'start' | 'end';
} & Partial<ColumnProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectedRef = useRef<any | undefined>();

  useLayoutEffect(() => {
    if (
      selectedSpell &&
      selectedSpell === id &&
      selectedRef &&
      selectedRef?.current
    ) {
      const yOffset = -60;
      const y =
        selectedRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [id, selectedSpell]);

  const onClick = useCallback(() => {
    onIconClick && id && onIconClick(id);
  }, [id, onIconClick]);

  return (
    <Cell
      ref={selectedRef}
      data-tag="allowRowEvents"
      key={Math.random()}
      background={background}
      paddingLeft={paddingLeft}
      paddingRight="6%"
    >
      {icon && iconPosition === 'start' && (
        <Button marginRight="18.25px" onClick={onClick}>
          <Icon width={7.5} height={6} name={icon} fill={iconColor} />
        </Button>
      )}
      {label ? (
        <LabelColumn
          {...rest}
          color={color || '#31394d'}
          data-tag="allowRowEvents"
        >
          {label}
        </LabelColumn>
      ) : (
        <LabelColumn data-tag="allowRowEvents" color={emptyColor || '#dadada'}>
          {emptyMsg}
        </LabelColumn>
      )}
      {icon && iconPosition === 'end' && (
        <Button marginLeft="18.25px" onClick={onClick}>
          <Icon width={7.5} height={6} name={icon} fill={iconColor} />
        </Button>
      )}
    </Cell>
  );
};

const format = 'MM-DD-YYYY hh:mm a';

export const CreatedCell = ({
  timestamp,
  background,
}: Definitions.Spell & Partial<ColumnProps>) => (
  <Cell background={background} data-tag="allowRowEvents" key={Math.random()}>
    <LabelColumn data-tag="allowRowEvents" weight="600">
      {timestamp
        ? moment(timestamp).format(format)
        : 'there is no date of creation'}
    </LabelColumn>
  </Cell>
);

export const StatusCell = ({ status }: Definitions.Spell) => (
  <Cell data-tag="allowRowEvents" key={Math.random()}>
    <StatusColumn data-tag="allowRowEvents" color={getColorFromStatus(status)}>
      <LabelColumn
        data-tag="allowRowEvents"
        textAlign="center"
        color={getColorFromStatus(status)}
        weight="bold"
        lineHeight="23px"
        size="12px"
      >
        {status ? status.toLocaleUpperCase() : 'UNKNOWN'}
      </LabelColumn>
    </StatusColumn>
  </Cell>
);

export const AddressCell = ({
  spell,
  emptyColor,
  background,
}: Definitions.Spell & { emptyColor?: string } & Partial<ColumnProps>) => (
  <Cell background={background} data-tag="allowRowEvents" key={Math.random()}>
    <Span data-tag="allowRowEvents" wrap="wrap">
      {!!spell ? (
        <Link target="_blank" href={getEtherscanAddressLinkFromHash(spell)}>
          <LabelLink>
            {`${spell.substring(0, 6)}...${spell.substring(
              spell.length - 4,
              spell.length,
            )}`}
          </LabelLink>
        </Link>
      ) : (
        <LabelColumn color={emptyColor || '#dadada'} data-tag="allowRowEvents">
          there is no link
        </LabelColumn>
      )}
    </Span>
    {}
  </Cell>
);

export const ParamsCell = ({
  label,
  enframedLabel,
  emptyColor,
  emptyMsg,
}: Partial<ColumnProps> & {
  label?: string;
  enframedLabel?: string;
  emptyColor?: string;
  emptyMsg?: string;
}) => (
  <Cell data-tag="allowRowEvents" key={Math.random()}>
    {label ? (
      <Span display="inline">
        <LabelColumn width="none" weight="500" size="14px" color="#31394D">
          {`${label} ${enframedLabel ? '(' : ''}`}
        </LabelColumn>
        <LabelColumn width="none" weight="500" size="14px" color="#2F80ED">
          {enframedLabel}
        </LabelColumn>
        <LabelColumn width="none" weight="500" size="14px" color="#31394D">
          {enframedLabel ? ')' : ''}
        </LabelColumn>
      </Span>
    ) : (
      <LabelColumn color={emptyColor || '#dadada'} data-tag="allowRowEvents">
        {emptyMsg}
      </LabelColumn>
    )}
  </Cell>
);

interface ColumnProps {
  color?: string;
  weight?: string;
  width?: string;
  lineHeight?: string;
  justifyContent?: string;
  borderRight?: boolean;
  textAlign?: string;
  marginRight?: string;
  marginLeft?: string;
  size?: string;
  id?: string;
  selectedSpell?: string;
  paddingRight?: string;
  paddingLeft?: string;
  background?: string;
}

const Cell = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding-top: 2px;
  padding-bottom: 2px;
  justify-content: ${({ justifyContent }: ColumnProps) =>
    justifyContent || 'start'};
  align-items: center;
  padding-left: ${({ paddingLeft }: ColumnProps) => paddingLeft || '5px'};
  padding-right: ${({ paddingRight }: ColumnProps) => paddingRight || ''};
  ${({ background }: ColumnProps) => `background: ${background};` || ''}
`;

const LabelColumn = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: ${({ weight }: ColumnProps) => weight || 'normal'};
  width: ${({ width }: ColumnProps) => width || '100%'};
  font-size: ${({ size }: ColumnProps) => size || '14px'};
  line-height: ${({ lineHeight }: ColumnProps) => lineHeight || '16px'};
  color: ${({ color }: ColumnProps) => color || '#31394d'};
  margin-right: ${({ marginRight }: ColumnProps) => marginRight || ''};
  border-right: ${({ borderRight }: ColumnProps) =>
    borderRight ? '1px solid #C4C4C4' : ''};
  text-align: ${({ textAlign }: ColumnProps) => textAlign || ''};
  cursor: pointer;
`;

const LabelLink = styled.label`
  font-family: Roboto;
  font-style: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: ${({ width }: ColumnProps) => width || '100%'};
  font-size: 14px;
  line-height: 16px;
  color: #2f80ed;
  cursor: pointer;
`;

const Link = styled.a`
  background: none;
  border: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
  width: ${({ width }: ColumnProps) => width || '100%'};
  font-size: 14px;
  line-height: 16px;
  color: #2f80ed;
  div {
    height: 15px;
  }
  :hover {
    cursor: pointer;
  }
  margin-right: ${({ marginRight }: ColumnProps) => marginRight || ''};
  margin-left: ${({ marginLeft }: ColumnProps) => marginLeft || ''};
  border-right: ${({ borderRight }: ColumnProps) =>
    borderRight ? '1px solid #C4C4C4' : ''};
`;

const Span = styled.span`
  display: ${({ display }: { display?: string }) => display || 'flex'};
  flex-wrap: ${({ wrap }: { wrap?: string; display?: string }) =>
    wrap || 'inherit'};
  align-items: center;
  div {
    height: ${({ height }: { height?: string; display?: string }) =>
      height || ''};
  }
`;

const StatusColumn = styled.div`
  display: flex;
  border: 1px solid ${({ color }: ColumnProps) => color};
  border-radius: 7px;
  padding: 1px 5px 2px 5px;
  height: 20px;
  width: 80px;
  justify-content: center;
`;

const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  margin-right: ${({ marginRight }: ColumnProps) => marginRight || ''};
  margin-left: ${({ marginLeft }: ColumnProps) => marginLeft || ''};
  height: 20px;
  padding-right: 0px;
`;
