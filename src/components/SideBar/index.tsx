/* eslint-disable no-confusing-arrow */
import SideNav, { NavIcon, NavItem, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useSideBarContext } from '../../context/SidebarContext';
import { PathType, routes } from '../../routes';
import Icon from '../Icon';

const SideBarWrapper = styled.div`
  nav {
    position: fixed;
    background-color: #71c8be;
    div[role='menu'] {
      padding: 10px;
    }
    div[role='presentation'] {
      height: 40px;
      div[role='menuitem'] {
        margin-top: 20px;
        div {
          eight: 40px;
          line-height: 40px;
        }
      }
      svg {
        margin-left: -5px;
      }
      &:hover {
        opacity: 1;
        div[role='menuitem'] {
          opacity: 1;
        }
      }
    }
  }
`;
const Brand = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
`;
const AbsoluteLineStyle = css`
  position: absolute;
  top: 60px;
  left: 0;
  width: 10px;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: white;
  ${({ absolute }: { absolute?: boolean }) =>
    absolute ? AbsoluteLineStyle : ''}
`;

const Button = styled.button`
  position: absolute;
  z-index: 5000;
  top: 50px;
  right: -10px;
  width: 19px;
  height: 19px;
  border-radius: 10px;
  background: none;
  border: none;
  svg {
    position: absolute;
    top: 1px;
    left: 0px;
    border-radius: 10px;
    background: #1aab9b;
    border: 1px solid #1aab9b;
    box-shadow: -1px 0px 1px rgba(235, 237, 244, 0.5);
  }
`;

const SelectedNavItem = styled(NavItem)`
  background: ${({ selected }: { selected?: boolean }) =>
    selected ? 'white !important' : '#71c8be'};
  color: ${({ selected }: { selected?: boolean }) =>
    !selected ? 'white' : '#71c8be'};
  border-radius: ${({ selected }: { selected?: boolean }) =>
    selected ? '13px' : '0px'};
  div {
    color: ${({ selected }: { selected?: boolean }) =>
      selected ? '#71c8be !important' : 'white !important'};
  }
  &:hover {
    opacity: 0;
  }
`;

const SideBar = () => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const { expanded, toggleSideBar } = useSideBarContext();
  const onSelect = useCallback(
    (selected: PathType) => {
      pathname !== selected && push(selected);
    },
    [pathname, push],
  );

  return (
    <SideBarWrapper>
      <SideNav onToggle={() => {}} expanded={expanded}>
        <SideNav.Nav defaultSelected={pathname}>
          <Brand>
            <Icon name={expanded ? 'fullLogo' : 'logo'} />
            <Button onClick={toggleSideBar}>
              <Icon name={expanded ? 'leftArrow' : 'rightArrow'} />
            </Button>
          </Brand>
          <Line absolute />
          <Line />
          <Brand />
          {routes.map(({ label, path, iconName: icon }) => (
            <SelectedNavItem
              key={Math.random()}
              onSelect={onSelect}
              eventKey={path}
              selected={pathname === path}
            >
              <NavIcon>
                <Icon
                  name={icon}
                  fill={pathname === path ? '#1aab9b' : 'white'}
                  width={38}
                  height={38}
                />
              </NavIcon>
              <NavText>{label}</NavText>
            </SelectedNavItem>
          ))}
        </SideNav.Nav>
      </SideNav>
    </SideBarWrapper>
  );
};

export default SideBar;
