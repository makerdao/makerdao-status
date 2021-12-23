import React from 'react';
import styled from 'styled-components';
import dompurify from 'dompurify';
import './headingStyle.css';
import { down, between, up } from 'styled-breakpoints';
import { Icon, PageWrapper } from '../../components';
import ContentTable from './ContentTable';

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
  const sanitizer = dompurify.sanitize;
  return (
    <PageWrapper header={{}}>
      <Root>
        <Coll flex="0.75" marginLeft="10px" downMdFull>
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
        <Coll flex="0.25" marginLeft="50px" marginRight="10px">
          <ContentTable headersLevel={headersLevel} />
        </Coll>
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

const Root = styled.div`
  display: flex;
  padding: 5%;
  padding-top: 4.68%;
  background-color: #f5f6fa;
`;

const Coll = styled.div`
  flex: ${({ flex }: StyledProps) => flex || '100%'};
  ${down('md')} {
    ${({ downMdFull }: StyledProps) => (downMdFull ? 'flex: 1;' : 'flex: 0;')}
    margin-left: 0px;
    margin-right: 0px;
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
  padding: 7% 7%;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const StyledLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 90px;
  right: 85px;
  width: 70px;
  ${down('sm')} {
    top: 55px;
    right: 20px;
  }
  ${between('sm', 'md')} {
    top: 80px;
    right: 40px;
  }
  ${between('md', 'lg')} {
    top: 90px;
    right: 55px;
  }
  ${up('xl')} {
    top: 150px;
    right: 120px;
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
