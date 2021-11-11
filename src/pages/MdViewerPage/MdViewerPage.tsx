import React from 'react';
import styled from 'styled-components';
import dompurify from 'dompurify';
import './headingStyle.css';
import { down } from 'styled-breakpoints';
import { Icon } from '../../components';

interface Props {
  markdownText: string;
  mdUrl?: string;
}

const MdViewerPage = ({ markdownText, mdUrl = '' }: Props) => {
  const sanitizer = dompurify.sanitize;
  return (
    <>
      <ViewerContainer
        className="markDownContent"
        dangerouslySetInnerHTML={{ __html: sanitizer(markdownText) }}
      />
      <StyledLabel>
        <Icon width={20} height={20} name="Readme" fill="#0969da" />
        <StyledLink href={mdUrl} target="_blank" rel="noreferrer">
          .md File
        </StyledLink>
      </StyledLabel>
    </>
  );
};

export default MdViewerPage;

const ViewerContainer = styled.div`
  background: #fff;
  box-shadow: 0 1px 4px #e5e9f2;
  border-radius: 5px;
  text-align: justify;
  width: 75%;
  padding: 30px 45px;
  margin-bottom: 20px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  ${down('md')} {
    width: 100%;
  }
`;

const StyledLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 160px;
  right: 100px;
  width: 70px;
`;

const StyledLink = styled.a`
  color: ${({ color }) => color || 'black'};
  cursor: 'pointer';
  text-decoration: none;
  font-weight: 700;
  font-size: 12px;
  color: #2f80ed;
`;
