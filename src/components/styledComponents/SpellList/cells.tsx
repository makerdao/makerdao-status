/* eslint-disable no-confusing-arrow */
/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import styled from 'styled-components';
import { getColorFromStatus } from '../../../services/utils/color';
import { getEtherscanLinkFromHash } from '../../../services/utils/fetch';
import { formatDate, isPlural } from '../../../services/utils/formatsFunctions';
import Icon from '../../Icon';

export const LabelCell = ({
  color,
  emptyColor,
  label,
  emptyMsg,
  ...rest
}: {
  color?: string;
  emptyColor?: string;
  label?: string;
  emptyMsg: string;
} & Partial<ColumnProps>) => (
  <Cell data-tag="allowRowEvents" key={Math.random()}>
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
  </Cell>
);

export const CreatedCell = ({ created }: Definitions.Spell) => (
  <Cell data-tag="allowRowEvents" key={Math.random()}>
    <LabelColumn data-tag="allowRowEvents" weight="600">
      {created ? formatDate(created) : 'there are not date of creation'}
    </LabelColumn>
  </Cell>
);

export const ChangesCell = ({ changes }: Definitions.Spell) => (
  <Cell data-tag="allowRowEvents" key={Math.random()}>
    <LabelColumn data-tag="allowRowEvents">
      {!!changes.length &&
        `There ${isPlural(changes) ? 'were' : 'was'} (${changes.length}) ${
          isPlural(changes) ? 'changes' : 'change'
        }`}
      {!changes.length && 'There were no changes'}
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
      >
        {status ? status.toLocaleUpperCase() : 'UNKNOWN'}
      </LabelColumn>
    </StatusColumn>
  </Cell>
);

export const AddressCell = ({
  address,
  emptyColor,
}: Definitions.Spell & { emptyColor?: string }) => (
  <Cell data-tag="allowRowEvents" key={Math.random()}>
    <Span data-tag="allowRowEvents" wrap="wrap">
      {!!address ? (
        <>
          <LabelLink data-tag="allowRowEvents" width="60px">
            {address}
          </LabelLink>
          <LabelColumn
            data-tag="allowRowEvents"
            borderRight
            marginRight="12px"
            width="40px"
            color="#2F80ED"
          >
            {address.substring(address.length - 4, address.length)}
          </LabelColumn>
          <Link target="_blank" href={getEtherscanLinkFromHash(address)}>
            <Icon width={15} height={15} name="openInNewIcon" fill="#2F80ED" />
          </Link>
        </>
      ) : (
        <LabelColumn color={emptyColor || '#dadada'} data-tag="allowRowEvents">
          there is not link
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
    {label && enframedLabel ? (
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
  size?: string;
}

const Cell = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }: ColumnProps) =>
    justifyContent || 'start'};
  align-items: center;
  margin-left: 5px;
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
`;

const Link = styled.a`
  background: none;
  border: none;
  div {
    height: 15px;
  }
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
