/* eslint-disable no-confusing-arrow */
import React from 'react';
import styled, { css } from 'styled-components';
import dompurify from 'dompurify';
import './headingStyle.css';
import { down, between, up } from 'styled-breakpoints';
import { Icon, PageWrapper } from '../../components';
import ContentTable from './ContentTable';
import { useSideBarContext } from '../../context/SidebarContext';

export type MarkDownHeaders = {
  level: number;
  title: string;
  id: string;
  href: string;
};

interface Props {
  markdownText: string;
  mdUrl?: string;
  headersLevel: MarkDownHeaders[];
}

const MdViewerPage = ({ markdownText, mdUrl = '', headersLevel }: Props) => {
  const { expanded } = useSideBarContext();
  const sanitizer = dompurify.sanitize;
  return (
    <PageWrapper header={{}}>
      <Root expanded={expanded}>
        <Coll flex="0.75" downMdFull marginRight="27px">
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
        </Coll>
        <ContentTable headersLevel={headersLevel} />
      </Root>
    </PageWrapper>
  );
};

export default MdViewerPage;

interface StyledProps {
  flex: string;
  marginLeft?: string;
  marginRight?: string;
  downMdFull?: boolean;
}
const expandedBar = css`
  padding-left: 15px;
  padding-right: 16px;
`;
const notExpandedBar = css`
  padding-left: 40px;
  padding-right: 27px;
`;
const Root = styled.div`
  display: flex;
  ${({ expanded }: { expanded: boolean }) =>
    expanded ? expandedBar : notExpandedBar};
  padding-top: 38px;
  background-color: #f5f6fa;
`;

const Coll = styled.div`
  flex: ${({ flex }: StyledProps) => flex || '100%'};
  ${down('md')} {
    ${({ downMdFull }: StyledProps) => (downMdFull ? 'flex: 1;' : 'flex: 0;')}
    margin-left: 0px;
    margin-right: 10px;
  }
  ${up('xl')} {
    flex: 0.7;
  }
  position: relative;
  margin-left: ${({ marginLeft }: StyledProps) => marginLeft || '0px'};
  margin-right: ${({ marginRight }: StyledProps) => marginRight || '0px'};
`;

const ViewerContainer = styled.div`
  background: #fff;
  box-shadow: 0 1px 4px #e5e9f2;
  border-radius: 5px;
  text-align: justify;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 40px;
  padding-top: 11px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const StyledLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 42px;
  right: 85px;
  width: 70px;
  ${down('sm')} {
    display: none;
  }
  ${between('sm', 'md')} {
    top: 80px;
    right: 40px;
  }
  ${between('md', 'lg')} {
    top: 42px;
    right: 30px;
  }
  ${up('xl')} {
    top: 42px;
    right: 40px;
  }
`;

const StyledLink = styled.a`
  color: ${({ color }) => color || 'black'};
  cursor: 'pointer';
  text-decoration: none;
  font-weight: 700;
  font-size: 12px;
  color: #2f80ed;
`;
