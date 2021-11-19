import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { IconNames, NavBar } from '..';

interface Props {
  header?: {
    title?: string;
    iconName?: IconNames;
    action?: () => void;
  };
}

export default function PageWrapper({
  children,
  header,
}: PropsWithChildren<Props>) {
  return (
    <div>
      {header && <NavBar {...header} />}
      <Container>{children}</Container>
    </div>
  );
}

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;
