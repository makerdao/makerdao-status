import React from "react";
import styled from "styled-components";
import { useSideBarContext } from "../../context/SideBarContext";
import Icon from "../icon";
import { IconNames } from "../icon/IconNames";

interface Props {
  title?: string;
  iconName?: IconNames;
  action?: () => void;
}

export default function Navbar({ title, iconName, action }: Props) {
  const {
    state: { expandedSideBar: expanded },
  } = useSideBarContext();
  return (
    <Nav>
      <div>
        <Span>
          {iconName && (
            <Icon width={70} height={70} name={iconName} fill="#748AA1" />
          )}
          <Label>{title}</Label>
        </Span>
      </div>
      <ActionDiv expanded={expanded}>
        <Span>
          <Label>Feedback</Label>
          <Button onClick={action}>
            <Icon width={30} height={30} name="feedBack" fill="white" />
          </Button>
        </Span>
      </ActionDiv>
    </Nav>
  );
}

const Button = styled.button`
  background: none;
  border: none;
`;

const Span = styled.span`
  margin-left: 50px;
  display: flex;
  align-items: center;
  div {
    margin-top: 5px;
    margin-right: -8px;
    margin-left: 8px;
  }
`;
const ActionDiv = styled.nav`
  margin-right: ${({ expanded }: { expanded?: boolean }) =>
    expanded ? "310px" : "150px"};
`;

const Nav = styled.nav`
  position: fixed;
  top: 0px;
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

const Label = styled.label`
  color: #31394d;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
`;
