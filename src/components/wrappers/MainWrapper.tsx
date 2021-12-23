/* eslint-disable no-confusing-arrow */
import React, { PropsWithChildren, useMemo } from 'react';
import { down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import styled from 'styled-components';
import { useSideBarContext } from '../../context/SidebarContext';

export const Container = styled.div`
  transition: margin-left 0.2s;
  margin-left: ${({
    expanded,
    isDownXs,
  }: {
    expanded?: boolean;
    isDownXs?: boolean;
  }) => {
    let value = '90px';
    let expandedValue = '240px';
    if (isDownXs) {
      value = '0px';
      expandedValue = '79px';
    }
    return expanded ? expandedValue : value;
  }};
`;

const MainContainer = ({ children }: PropsWithChildren<{}>) => {
  const isDownXs = useBreakpoint(down('xs'));
  const { expanded: expandedInStorage } = useSideBarContext();

  const expanded = useMemo(
    () => expandedInStorage && !isDownXs,
    [expandedInStorage, isDownXs],
  );

  return (
    <Container isDownXs={!!isDownXs} expanded={expanded}>
      {children}
    </Container>
  );
};

export default MainContainer;
