/* eslint-disable no-confusing-arrow */
import React, { PropsWithChildren, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import styled from 'styled-components';
import { useSideBarContext } from '../../context/SidebarContext';
import { routes } from '../../routes';

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
  const { pathname } = useLocation();
  const isDownXs = useBreakpoint(down('xs'));
  const { expanded: expandedInStorage } = useSideBarContext();

  const expanded = useMemo(
    () => expandedInStorage && !isDownXs,
    [expandedInStorage, isDownXs],
  );

  const hidden = useMemo(
    () =>
      routes.some(
        (route) =>
          route.hiddenSidebar === true && pathname.includes(route.path),
      ),
    [pathname],
  );
  return (
    <Container isDownXs={!!isDownXs || hidden} expanded={expanded}>
      {children}
    </Container>
  );
};

export default MainContainer;
