/* eslint-disable no-confusing-arrow */
import React from 'react';
import { down } from 'styled-breakpoints';
import styled, { ThemedStyledProps } from 'styled-components';
import { useSideBarContext } from '../../context/SidebarContext';
import Icon from '../Icon';
import { IconNames } from '../Icon/IconNames';

interface Props {
  title?: string;
  iconName?: IconNames;
  action?: () => void;
}

export default function Navbar({ title, iconName, action }: Props) {
  const { expanded } = useSideBarContext();
  return (
    <Nav>
      <TitleContainer>
        <Span>
          {iconName && (
            <Icon width={35} height={35} name={iconName} fill="#748AA1" />
          )}
          <Label>{title}</Label>
        </Span>
      </TitleContainer>
      <ActionDiv expanded={expanded}>
        <Span>
          <Label fontSize="14px" color="#748AA1" lineHeight="16px">
            Feedback
          </Label>
          <Button onClick={action}>
            <Icon width={17} height={17} name="feedBack" fill="white" />
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

const TitleContainer = styled.div`
  height: 25px;
  ${down('xs')} {
    width: 100%;
    padding-top: 5px;
  }
`;

const Span = styled.span`
  margin-left: 50px;
  height: 25px;
  ${down('xs')} {
    margin-left: 1rem;
  }
  display: flex;
  align-items: center;
  div {
    height: 25px
    margin-top: 5px;
    margin-right: 10px;
  }
`;
const ActionDiv = styled.div`
  ${down('xs')} {
    display: flex;
    width: 100%;
    justify-content: end;
  }
  margin-right: ${({ expanded }: { expanded?: boolean }) =>
    expanded ? '310px' : '150px'};
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
  ${down('xs')} {
    flex-direction: column;
  }
`;

type LabelProps = ThemedStyledProps<
  {
    textAlign?: string;
    weight?: string;
    fontSize?: string;
    lineHeight?: string;
    color?: string;
  },
  unknown
>;

const Label = styled.label`
  font-size: ${({ fontSize }: LabelProps) => fontSize || '24px'};
  color: ${({ color }: LabelProps) => color || '#31394d'};
  line-height: ${({ lineHeight }: LabelProps) => lineHeight || '30px'};
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
`;
