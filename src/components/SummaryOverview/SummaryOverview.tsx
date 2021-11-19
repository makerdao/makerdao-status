import React from 'react';
import { down, up } from 'styled-breakpoints';
import styled from 'styled-components';
import SummaryCard from '../cards/SummaryCard';

interface Props {
  summaries: {
    title: string;
    data: {
      label: string;
      enframedLabel: string;
      value: string;
    }[];
  }[];
}

export default function SummaryOverview({ summaries }: Props) {
  return (
    <CardsContainer>
      {summaries.map((summary) => (
        <SummaryCard key={Math.random()} summary={summary} />
      ))}
    </CardsContainer>
  );
}

const CardsContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 4.4rem;
  ${down('sm')} {
    grid-gap: 2rem;
  }
  ${up('xl')} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
