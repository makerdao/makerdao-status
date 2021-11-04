import React from 'react';
import styled from 'styled-components';
import { Label } from '../../components';

interface Props {
  headersLevel: { level: string; title: string; id: string; href: string }[];
}

const ContentTable = ({ headersLevel }: Props) => (
  <>
    {headersLevel && (
      <Label
        size="20px"
        lineHeight="19px"
        color="#000"
        margin="30px 0px 0px 0px">
        Table of content
      </Label>
    )}
    {headersLevel.map((a) => (
      <StyledLink key={Math.random()} href={a.href} color="#748aa1">
        {`${a.title}`}
      </StyledLink>
    ))}
  </>
);

export default ContentTable;

const StyledLink = styled.a`
  width: 200px;
  padding: 10px;
  color: ${({ color }) => color || 'black'};
  cursor: 'pointer';
  font-weight: 400;
  text-decoration: none;
  font-size: 12;
`;
