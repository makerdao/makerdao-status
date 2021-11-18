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
    <CardContainer>
      <Header>
        <Label color="#1AAB9B" size="20px" lineHeight="24px" weight="bold">
          {title}
        </Label>
      </Header>
      <div>
        {data.map((item) => (
          <SummaryItem key={Math.random()} {...item} alignItems="start" />
        ))}
      </div>
    </CardContainer>
  );
}

const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem 4rem 1rem 4rem;
`;

const Header = styled.div`
  padding-bottom: 1rem;
`;

const SummaryItem = styled(JustifiedRowItem)`
  padding: 1rem 0px 1rem 0px;
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
