import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { IconNames } from '../../Icon/IconNames';
import Navbar from '../../NavBar';

interface Props {
  header?: {
    title?: string;
    iconName?: IconNames;
    action?: () => void;
  };
}

export default function WrapperPage({
  children,
  header,
}: PropsWithChildren<Props>) {
  return (
    <div>
      {header && <Navbar {...header} />}
      <Container>{children}</Container>
    </div>
  );
}

const Container = styled.div`
  margin-top: 50px;
`;
