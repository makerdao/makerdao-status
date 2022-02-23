/* eslint-disable @typescript-eslint/no-explicit-any */
import useResizeObserver from '@react-hook/resize-observer';
import React, { useMemo, useRef } from 'react';
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

const useSize = (target: any) => {
  const [size, setSize] = React.useState<{ width: number }>();

  React.useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => setSize((entry as any).contentRect));
  return size;
};

export default function SummaryOverview({ summaries }: Props) {
  const ref = useRef();
  const size = useSize(ref);

  const countCardByRow = useMemo(
    () => Math.trunc((size?.width || 0) / 241),
    [size?.width],
  );

  return (
    <Container>
      <CardsContainer background={backgroundImg} ref={ref}>
        {summaries.map((summary, i) => (
          <SummaryCard
            key={Math.random()}
            summary={summary}
            headerRightBorder={
              i !== summaries.length - 1 && countCardByRow - 1 !== i
            }
            headerBorderRadius={`${i === 0 ? 10 : 0}px ${
              countCardByRow - 1 === i ? 10 : 0
            }px 0px 0px`}
            notRightBorder={i === countCardByRow - 1}
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
