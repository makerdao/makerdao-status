import React, { useCallback, useState } from 'react';
import { down } from 'styled-breakpoints';
import styled, { css } from 'styled-components';
import { Label } from '../../components';

interface Props {
  headersLevel: { level: number; title: string; id: string; href: string }[];
}

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

  const fontSizeCreator = (level: number) => {
    if (level > 2) return '12px';
    return '14px';
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
          color="#748aa1"
          paddingLeft={paddingCreator(level)}
        >
          <StyledLabel fontSize={fontSizeCreator(level)}>{title}</StyledLabel>
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
  paddingLeft: string;
}

const StyledLinkProps = css`
  background: rgba(217, 235, 237, 0.35);
  border-left: 3px solid #71c8be;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
`;

const StyledLink = styled.a<ItemSelectProps>`
  color: ${({ color }) => color || 'black'};
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
const StyledLabel = styled.label`
  cursor: pointer;
  font-size: ${({ fontSize }: { fontSize?: string }) => `${fontSize}`};
  margin-left: 30px;
  margin-right: 30px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  color: #000000;
`;
