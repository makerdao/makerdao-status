/* eslint-disable no-confusing-arrow */
import React from 'react';
import { between, down, up } from 'styled-breakpoints';
import styled from 'styled-components';
import { useSideBarContext } from '../../context/SidebarContext';
import Icon from '../Icon';
import { IconNames } from '../Icon/IconNames';
import { Label } from '../styledComponents';

interface Props {
  title?: string;
  iconName?: IconNames;
  action?: () => void;
}

export default function Navbar({ title, iconName, action }: Props) {
  const { expanded } = useSideBarContext();
  return (
    <Nav>
      <Container>
        <Span>
          {iconName && (
            <Icon width={70} height={70} name={iconName} fill="#748AA1" />
          )}
          <Label color="#31394D" size="24px" lineHeight="30px">
            {title}
          </Label>
        </Span>
        <ActionDiv expanded={expanded}>
          <Span>
            <Label color="#748AA1" size="14px" lineHeight="16px">
              Feedback
            </Label>
            <Button onClick={action}>
              <Icon width={30} height={30} name="feedBack" fill="white" />
            </Button>
          </Span>
        </ActionDiv>
      </Container>
    </Nav>
  );
}

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${down('sm')} {
    margin-left: 0.5rem;
    padding-right: 0.5rem;
  }
  ${between('sm', 'md')} {
    margin-left: 1rem;
    padding-right: 1rem;
  }
  ${between('md', 'lg')} {
    margin-left: 1.5rem;
    padding-right: 1.5rem;
  }
  ${up('lg')} {
    margin-left: 3rem;
    padding-right: 3rem;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  div {
    margin-top: 5px;
  }
`;
const ActionDiv = styled.nav`
  margin-right: ${({ expanded }: { expanded?: boolean }) =>
    expanded ? '260px' : '100px'};
`;

const Nav = styled.nav`
  position: fixed;
  top: 0px;
  z-index: 100px;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background: rgb(219 247 243);
  justify-content: space-between;
  a {
    color: white;
    text-decoration: none;
  }
`;
