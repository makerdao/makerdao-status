import React from 'react';
import styled from 'styled-components';
import { Label } from '..';
import Card from './Card';
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
}

export default function SummaryCard({ summary: { data, title } }: Props) {
  return (
    <Card>
      <Header>
        <Label color="#1AAB9B" size="20px" lineHeight="24px" weight="bold">
          {title}
        </Label>
      </Header>
      <ItemsContainer>
        {data.map((item) => (
          <SummaryItem key={Math.random()} {...item} />
        ))}
      </ItemsContainer>
    </Card>
  );
}

const ItemsContainer = styled.div`
  padding: 0px 63px 15px 63px;
`;

const Header = styled.div`
  padding: 25px 63px 1px 63px;
`;

const SummaryItem = styled(JustifiedRowItem)`
  padding: 15px 0px 15px 0px;
  span {
    #main-label {
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
    }
    #parenthesis {
      color: #898989;
    }
    #value {
      font-weight: bold;
      font-size: 20px;
      line-height: 23px;
      color: #000000;
    }
  }
`;
