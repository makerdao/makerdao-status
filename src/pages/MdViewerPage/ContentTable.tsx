/* eslint-disable no-confusing-arrow */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback, useState } from 'react';
import { down, up } from 'styled-breakpoints';
import styled, { css } from 'styled-components';
import { Label } from '../../components';
import { useSideBarContext } from '../../context/SidebarContext';

interface Props {
  headersLevel: { level: number; title: string; id: string; href: string }[];
}

const levelCreateStyle = (level: number) => {
  if (level === 1) {
    return css`
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      margin-left: 23px;
    `;
  }
  if (level === 2) {
    return css`
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      opacity: 0.7;
      margin-left: 31px;
    `;
  }
  return css`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    opacity: 0.5;
    margin-left: 40px;
  `;
};

const ContentTable = ({ headersLevel }: Props) => {
  const { expanded } = useSideBarContext();
  const [isActive, setIsActive] = useState('');
  const handleOnClick = useCallback(
    (id: string) => () => {
      setIsActive(id);
    },
    [],
  );

  return (
    <Root expanded={expanded}>
      <DivTitleTable>
        <Label
          weight="600"
          size="16px"
          lineHeight="19px"
          color="#000000"
          marginLeft="23px"
        >
          Table of contents
        </Label>
      </DivTitleTable>
      {headersLevel.map(({ id, title, href, level }) => (
        <StyledLink
          isActive={id === isActive}
          onClick={handleOnClick(id)}
          key={id}
          href={href}
          level={level}
        >
          <DivLink>
            <DivBorder isActive={id === isActive} />
            <StyledLabel isActive={id === isActive} level={level}>
              {title}
            </StyledLabel>
          </DivLink>
        </StyledLink>
      ))}
    </Root>
  );
};

export default ContentTable;

const DivLink = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
const DivBorder = styled.div`
  width: 3px;
  background-color: #71c8be;
  border-radius: 0px 3px 3px 0px;
  visibility: ${({ isActive }: { isActive?: boolean }) =>
    isActive ? 'visible' : 'hidden'};
`;
const DivTitleTable = styled.div`
  margin-bottom: 10px;
`;
const Root = styled.div`
  width: 21%;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 4px 15px rgba(113, 200, 190, 0.25);
  border-radius: 10px;
  display: inline-block;
  position: fixed;
  right: ${({ expanded }: { expanded?: boolean }) =>
    expanded ? '10px' : '40px'};
  padding-top: 53px;
  bottom: 38px;
  overflow-y: auto;
  scrollbar-width: thin;
  top: 88px;
  ${down('md')} {
    display: none;
  }
  *::-webkit-scrollbar {
    width: 5px;
  }
  ${up('xl')} {
    width: 20%;
  }
`;
interface ItemSelectProps {
  isActive: boolean;
  paddingLeft?: string;
  colorLinkActive?: string;
  fontSize?: string;
  level?: number;
}

const StyledLinkProps = css`
  background: rgba(217, 235, 237, 0.35);
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
`;

const StyledLink = styled.a<Partial<ItemSelectProps>>`
  color: ${({ color }) => color || '#000000;'};
  cursor: 'pointer';
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-decoration: none;
  padding-left: ${({ paddingLeft }) => paddingLeft};
  display: flex;
  align-items: center;
  ${({ isActive }: { isActive?: boolean }) => (isActive ? StyledLinkProps : '')}
  &:hover {
    background-color: #f5f5f5;
    align-items: center;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
  }
`;

const StyledLabel = styled.label<Partial<ItemSelectProps>>`
  cursor: pointer;
  font-size: ${({ fontSize }: { fontSize?: string }) => `${fontSize}`};
  font-family: Roboto;
  width: 100%;
  font-style: normal;
  font-weight: normal;
  padding-top: 14px;
  padding-bottom: 11px;
  margin-right: 5px;
  color: ${({ isActive }) => (isActive ? '#1AAB9B;' : '#000000')};
  ${({ level }) => levelCreateStyle(level || 3)};
`;
