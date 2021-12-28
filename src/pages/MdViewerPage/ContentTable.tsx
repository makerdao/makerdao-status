/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback, useState } from 'react';
import { down } from 'styled-breakpoints';
import styled, { css } from 'styled-components';
import { Label } from '../../components';

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
    `;
  }
  return css`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    opacity: 0.5;
  `;
};

const ContentTable = ({ headersLevel }: Props) => {
  const [isActive, setIsActive] = useState('');
  const paddingCreator = (level: number) => {
    switch (level) {
      case 2:
        return '10px';
      case 3:
        return '20px';
      default:
        return '0px';
    }
  };

  const handleOnClick = useCallback(
    (id: string) => () => {
      setIsActive(id);
    },
    [],
  );

  return (
    <Root>
      <Label
        weight="600"
        size="16px"
        lineHeight="19px"
        color="#000000"
        margin="30px"
      >
        Table of contents
      </Label>
      {headersLevel.map(({ id, title, href, level }) => (
        <StyledLink
          isActive={id === isActive}
          onClick={handleOnClick(id)}
          key={id}
          href={href}
          paddingLeft={paddingCreator(level)}
        >
          <StyledLabel isActive={id === isActive} level={level}>
            {title}
          </StyledLabel>
        </StyledLink>
      ))}
    </Root>
  );
};

export default ContentTable;

const Root = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 15px rgba(113, 200, 190, 0.25);
  border-radius: 10px;
  display: inline-block;
  width: 100%;
  position: sticky;
  top: 10px;
  padding-top: 40px;
  padding-bottom: 30px;
  ${down('md')} {
    display: none;
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
  border-left: 3px solid #71c8be;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
`;

const StyledLink = styled.a<Partial<ItemSelectProps>>`
  color: ${({ color }) => color || '#000000;'};
  cursor: 'pointer';
  border-left: 3px solid transparent;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-decoration: none;
  padding-left: ${({ paddingLeft }) => paddingLeft};
  display: flex;
  align-items: center;
  padding-top: 14px;
  padding-bottom: 14px;
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
  margin-left: 30px;
  margin-right: 30px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  color: ${({ isActive }) => (isActive ? '#1AAB9B;' : '#000000')};
  ${({ level }) => levelCreateStyle(level || 3)};
`;
