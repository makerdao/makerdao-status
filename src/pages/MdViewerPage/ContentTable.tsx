import React from 'react';
import styled from 'styled-components';
import { Label } from '../../components';

const factor = 20;

interface Props {
  headersLevel: { level: number; title: string; id: string; href: string }[];
}

const ContentTable = ({ headersLevel }: Props) => (
  <>
    <Label size="20px" lineHeight="19px" color="#000" margin="30px 0px 0px 0px">
      Table of contents
    </Label>
    {headersLevel.map((a) => (
      <StyledLink key={Math.random()} href={a.href} color="#748aa1">
        <StyledContainer paddingLeft={a.level * factor}>
          {a.title}
        </StyledContainer>
      </StyledLink>
    ))}
  </>
);

export default ContentTable;

const StyledLink = styled.a`
  width: 200px;
  padding: 5px;
  color: ${({ color }) => color || 'black'};
  cursor: 'pointer';
  font-weight: 400;
  text-decoration: none;
  font-size: 12;
`;

const StyledContainer = styled.p`
  padding-left: ${({ paddingLeft }: { paddingLeft?: number }) =>
    `${paddingLeft}px` || '0px'};
`;
