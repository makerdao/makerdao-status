import React from 'react';
import { down } from 'styled-breakpoints';
import styled from 'styled-components';
import { Label } from '../../components';

interface Props {
  headersLevel: { level: number; title: string; id: string; href: string }[];
}

const ContentTable = ({ headersLevel }: Props) => {
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

  return (
    <Root>
      <Label weight="600" size="16px" lineHeight="19px" color="#000">
        Table of contents
      </Label>
      {headersLevel.map(({ id, title, href, level }) => (
        <StyledLink
          key={id}
          href={href}
          color="#748aa1"
          marginLeft={paddingCreator(level)}
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
  box-shadow: 0 1px 4px #e5e9f2;
  border-radius: 5px;
  display: inline-block;
  width: 100%;
  position: sticky;
  top: 10px;
  padding: 40px 30px 30px 30px;
  ${down('md')} {
    display: none;
  }
`;

const StyledLink = styled.a`
  color: ${({ color }) => color || 'black'};
  cursor: 'pointer';
  font-weight: 400;
  text-decoration: none;
  margin-top: 20px;
  margin-left: ${({ marginLeft }: { marginLeft?: string }) => `${marginLeft}`};
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledLabel = styled.label`
  cursor: pointer;
  font-size: ${({ fontSize }: { fontSize?: string }) => `${fontSize}`};
`;
