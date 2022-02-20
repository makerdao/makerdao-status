/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { up } from 'styled-breakpoints';
import styled from 'styled-components';
import backgroundImg from '../../assets/img/grid.png';
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
    <Container>
      <CardsContainer background={backgroundImg}>
        {summaries.map((summary, i) => (
          <SummaryCard
            key={Math.random()}
            summary={summary}
            headerRightBorder={i !== summaries.length - 1}
            headerBorderRadius={`${i === 0 ? 10 : 0}px ${
              i === summaries.length - 1 ? 10 : 0
            }px 0px 0px`}
            notRightBorder={i === summaries.length - 1}
          />
        ))}
      </CardsContainer>
    </Container>
  );
}

const Container = styled.div<any>`
  background: white;
  border-radius: 10px;
`;
const CardsContainer = styled.div<any>`
  border-radius: 10px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(241px, 1fr));
  grid-gap: 0rem;
  background: url(${({ background }: any) => background});
  background-size: cover;
  background-repeat: no-repeat;
  ${up('xl')} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;
