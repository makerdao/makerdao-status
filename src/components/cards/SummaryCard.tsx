/* eslint-disable no-confusing-arrow */
import React from 'react';
import styled from 'styled-components';
import { Label } from '..';
import JustifiedRowItem from './JustifiedRowItem';

interface Props {
  summary: {
    title: string;
    data: {
      label: string;
      enframedLabel: string;
      value: string;
    }[];
  };
  headerRightBorder?: boolean;
  headerBorderRadius?: string;
  notRightBorder?: boolean;
}

export default function SummaryCard({
  summary: { data, title },
  headerRightBorder,
  headerBorderRadius,
  notRightBorder,
}: Props) {
  return (
    <CardContainer>
      <Header
        headerRightBorder={headerRightBorder}
        headerBorderRadius={headerBorderRadius}
      >
        <Label color="#1AAB9B" size="20px" lineHeight="24px" weight="bold">
          {title}
        </Label>
      </Header>
      <ItemContainer>
        {data.map((item, i) => (
          <SummaryItem
            transparent
            key={Math.random()}
            {...item}
            alignItems="start"
            notFramedLabel={false}
            isLastItem={i === data.length - 1}
            notRightBorder={notRightBorder}
          />
        ))}
      </ItemContainer>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
`;

const ItemContainer = styled.div`
  background: transparent;
  padding: 20px 0px 36px 28px;
`;

const Header = styled.div<Partial<Props>>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d1eeeb;
  height: 58px;
  width: 100%;
  ${({ headerBorderRadius }) =>
    headerBorderRadius ? `border-radius: ${headerBorderRadius};` : ''}
  label {
    height: 38px;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    ${({ headerRightBorder }) =>
      headerRightBorder ? 'border-right: 1px solid white;' : ''}
  }
`;

interface PropStyled {
  notRightBorder?: boolean;
  isLastItem?: boolean;
}

const SummaryItem = styled(JustifiedRowItem)<Partial<PropStyled>>`
  ${({ notRightBorder }) =>
    notRightBorder ? '' : 'border-right: 1px solid #d1eeeb;'}
  padding: 0rem 20px 1.92rem 0px;
  ${({ isLastItem }: { isLastItem?: boolean }) =>
    isLastItem ? 'padding-bottom: 0px;' : ''}
  align-items: flex-start;
  span {
    #main-label {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #000000;
    }
    #parenthesis {
      color: #898989;
    }
    #enframedLabel {
      font-size: 16px;
      line-height: 19px;
    }
    #value {
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
    }
  }
`;
