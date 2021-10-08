import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import Icon from "../icon";
import { IconNames } from "../icon/IconNames";

interface Props {
  title?: string;
  iconName?: IconNames;
  action?: () => void;
}

export default function Navbar({ title, iconName, action }: Props) {
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
      <ActionDiv>Actions</ActionDiv>
    </Nav>
  );
}

const Span = styled.span`
  margin-left: 50px;
  display: flex;
  align-items: center;
  div {
    margin-top: 5px;
    margin-right: -8px;
  }
`;
const ActionDiv = styled.nav`
  margin-right: 150px;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background: #71c8be;
  background: rgba(113, 200, 190, 0.2);
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
