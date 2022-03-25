/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import { down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import styled from 'styled-components';
import { Icon, Label } from '..';
import { useSideBarContext } from '../../context/SidebarContext';

interface Props {
  title?: string;
  action?: () => void;
}

export default function Navbar({ title, action }: Props) {
  const isDownXs = useBreakpoint(down('xs'));
  const { expanded: expandedInStorage } = useSideBarContext();

  const expanded = useMemo(
    () => expandedInStorage && !isDownXs,
    [expandedInStorage, isDownXs],
  );

  return (
    <Nav isDownXs={!!isDownXs} expanded={expanded}>
      <TitleContainer>
        <Span onClick={action}>
          <Label color="#31394D" size="24px" lineHeight="30px" cursor="pointer">
            {title}
          </Label>
        </Span>
      </TitleContainer>
      <ActionDiv>
        <Span>
          {/* <Label size="14px" color="#748AA1" lineHeight="16px">
            Feedback
          </Label> */}
          {/* <Button onClick={action}>
            <Icon width={17} height={17} name="feedBack" fill="white" />
          </Button> */}
        </Span>
      </ActionDiv>
    </Nav>
  );
}

const Button = styled.button`
  background: none;
  border: none;
  padding-right: 0px;
  cursor: pointer;
`;

const TitleContainer = styled.div`
  margin-left: 4.5%;
  height: 23px;
  ${down('xs')} {
    width: 100%;
    padding-top: 5px;
  }
`;

const Span = styled.span`
  height: 25px;
  display: flex;
  align-items: center;
  div {
    margin-top: 5px;
  }
`;
const ActionDiv = styled.div`
  margin-right: 4.5%;
  ${down('xs')} {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
`;

const Nav = styled.nav`
  position: fixed;
  top: 0px;
  z-index: 100;
  height: 50px;
  display: flex;
  align-items: center;
  background: rgb(219 247 243);
  justify-content: space-between;
  a {
    color: white;
    text-decoration: none;
  }
  right: 0px;
  left: ${({
    expanded,
    isDownXs,
  }: {
    expanded?: boolean;
    isDownXs?: boolean;
  }) => {
    let left = '90px';
    let expandedLeft = '240px';
    if (isDownXs) {
      left = '0px';
      expandedLeft = '90px';
    }
    return expanded ? expandedLeft : left;
  }};
`;
