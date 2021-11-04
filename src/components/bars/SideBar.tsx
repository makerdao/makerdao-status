/* eslint-disable no-confusing-arrow */
import SideNav, { NavIcon, NavItem, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import styled, { css } from 'styled-components';
import { useSideBarContext } from '../../context/SidebarContext';
import { PathType, routes } from '../../routes';
import { Icon } from '..';

const SideBar = () => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const isDownXs = useBreakpoint(down('xs'));
  const { expanded: expandedInStorage, toggleSideBar } = useSideBarContext();
  const [expandedInDownXs, setExpandedInDownXs] = useState(false);

  const fullExpanded = useMemo(
    () => expandedInStorage && !isDownXs,
    [expandedInStorage, isDownXs],
  );
  const shortExpanded = useMemo(
    () => isDownXs && expandedInDownXs,
    [expandedInDownXs, isDownXs],
  );

  const toggleSideBarCallBack = useCallback(() => {
    if (isDownXs) {
      setExpandedInDownXs(!expandedInDownXs);
    } else {
      toggleSideBar();
    }
  }, [expandedInDownXs, isDownXs, toggleSideBar]);

  useEffect(() => {
    if (!isDownXs && expandedInDownXs) {
      setExpandedInDownXs(false);
    }
  }, [expandedInDownXs, isDownXs]);

  const onSelect = useCallback(
    (selected: PathType) => {
      pathname !== selected && push(selected);
      if (isDownXs) {
        toggleSideBarCallBack();
      }
    },
    [isDownXs, pathname, push, toggleSideBarCallBack],
  );

  const hidden = useMemo(() => pathname.includes('md-viewer'), [pathname]);

  return (
    <SideBarWrapper
      hidden={hidden}
      shortExpanded={!!shortExpanded}
      isDownXs={!!isDownXs}>
      <SideNav onToggle={() => {}} expanded={fullExpanded}>
        <SideNav.Nav defaultSelected={pathname}>
          <Brand fullExpanded={fullExpanded}>
            <Icon name={fullExpanded ? 'fullLogo' : 'logo'} />
            <Button onClick={toggleSideBarCallBack}>
              <Icon
                width={21}
                height={21}
                name={
                  shortExpanded || fullExpanded ? 'leftArrow' : 'rightArrow'
                }
              />
            </Button>
          </Brand>
          <Line absolute />
          <Line />
          <Brand />
          {routes.filter((f) => f.hiddenInSidebar === undefined || f.hiddenInSidebar === false)
          .map(({ label, path, iconName: icon }) => (
            <SelectedNavItem
              key={Math.random()}
              onSelect={onSelect}
              eventKey={path}
              selected={pathname === path}>
              {icon && (
              <NavIcon>
                <Icon
                  name={icon}
                  fill={pathname === path ? '#1aab9b' : '#F5F6FA'}
                  width={38}
                  height={38}
                    />
              </NavIcon>
                )}
              <NavText>{label}</NavText>
            </SelectedNavItem>
            ))}
        </SideNav.Nav>
      </SideNav>
      {shortExpanded && <OverLay onClick={toggleSideBarCallBack} />}
    </SideBarWrapper>
  );
};

const SideBarWrapper = styled.div`
  nav {
    ${({ hidden }) => (hidden ? 'display: none;' : undefined)}
    position: fixed;
    transition: margin-left 0.2s, min-width 0.2s;
    margin-left: ${({
      isDownXs,
      shortExpanded,
    }: {
      isDownXs?: boolean;
      shortExpanded?: boolean;
    }) => {
      if (!isDownXs) return '0px';
      if (shortExpanded) {
        return '0px';
      }
      return '-90px';
    }};
    background-color: #71c8be;
    div[role='menu'] {
      background-color: #71c8be;
      padding: 21px 18px 10px 16px;
    }
    div[role='presentation'] {
      height: 38px;
      margin-top: 30px;
      div[role='menuitem'] {
        div {
          font-family: Work Sans;
          font-style: normal;
          width: 56px !important;
          margin-right: 0px !important;
          height: 38px !important;
          opacity: 1 !important;
          line-height: 40px;
        }
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

const OverLay = styled.div`
  position: fixed;
  right: 0px;
  top: 0px;
  left: 79px;
  height: 100%;
  z-index: 110;
`;

const Brand = styled.div`
  padding-top: 3px;
  padding-top: ${({ fullExpanded }: { fullExpanded?: boolean }) =>
    fullExpanded ? '3px' : '0px'};
  display: flex;
  justify-content: center;
  height: 50px;
`;

const AbsoluteLineStyle = css`
  position: absolute;
  top: 71px;
  left: 0;
  width: 20px;
`;

const Line = styled.div`
  height: 1px;
  // width: 100%;
  margin-right: -18px;
  background-color: white;
  ${({ absolute }: { absolute?: boolean }) =>
    absolute ? AbsoluteLineStyle : ''}
`;

const Button = styled.button`
  cursor: pointer;
  position: absolute;
  z-index: 5000;
  top: 60px;
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
    selected ? '#F5F6FA !important' : '#71c8be'};
  color: ${({ selected }: { selected?: boolean }) =>
    !selected ? '#F5F6FA' : '#71c8be'};
  border-radius: ${({ selected }: { selected?: boolean }) =>
    selected ? '13px' : '0px'};
  div[role='menuitem'] {
    height: 38px !important;
    border-radius: 10px;
    ${({ selected }: { selected?: boolean }) =>
      selected ? 'box-shadow: 0px 4px 10px rgba(36, 173, 154, 0.6);' : ''}
    ${({ selected }: { selected?: boolean }) =>
      !selected
        ? `&:hover {
        background: #a2ddd7;
        svg {
          path:not([class='not_filling']) {
            fill: #46bbae;
          }
          path:not([class='not_stroke']) {
            stroke: #46bbae;
          }
          line {
            fill: #46bbae;
            stroke: #46bbae;
          }
        }
      }`
        : ''}
    

    div {
      width: 56px;
    }
  }
  div {
    color: ${({ selected }: { selected?: boolean }) =>
      selected ? '#71c8be !important' : '#F5F6FA !important'};
  }
  &:hover {
    opacity: 0;
  }
`;

export default SideBar;
