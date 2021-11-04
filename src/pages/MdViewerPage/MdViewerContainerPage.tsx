// eslint-disable-next-line import/extensions
import marked from 'marked/lib/marked.js';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PageWrapper } from '../../components';
import { Container } from '../../components/wrappers/MainWrapper';
import {
  isAValidRawMdUrl,
  isAValidUrl,
} from '../../services/utils/urlRegExpressions';
import ContentTable from './ContentTable';
import MdViewerPage from './MdViewerPage';

export default function MdViewerContainerPage() {
  const {
    push,
    location: { search: urlQuery },
  } = useHistory();

  const url = useMemo(
    () => new URLSearchParams(urlQuery).get('url') || '',
    [urlQuery],
  );

  const [markdownText, setMarkdownText] = useState<string>('');
  const [headersLevel, setHeadersLevel] = useState<
    { level: string; title: string; id: string; href: string }[]
  >([]);

  const handleIndexItems = useCallback(
    (level: number, text: string, escapedText: string) => {
      const alreadyExist = headersLevel.findIndex((a) => a.title === text);
      if (alreadyExist === -1) {
        setHeadersLevel([
          ...headersLevel,
          {
            level: `<h${level}>`,
            title: text,
            id: escapedText,
            href: `#${escapedText}`,
          },
        ]);
      }
    },
    [headersLevel],
  );

  const isUrlValid = useMemo(
    () => url && isAValidUrl(url) && isAValidRawMdUrl(url),
    [url],
  );

  useEffect(() => {
    if (!isUrlValid) {
      push('not-found');
    } else {
      const fetchCreator = async () => {
        const response = await fetch(url);
        if (!response.ok) {
          push('not-found');
        } else {
          const parsed = await response.text();
          setMarkdownText(marked.parse(parsed));
        }
      };
      fetchCreator();
    }
  }, [push, markdownText, isUrlValid, url]);

  const renderer = {
    heading(text: string, level: number) {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      handleIndexItems(level, text, escapedText);
      return `<h${level}><a style={{ text-decoration: none; }} id="${escapedText}" href="#${escapedText}">x </a>${text}</h${level}>`;
    },
  };

  marked.use({ renderer });

  return (
    <PageWrapper>
      <Container>
        <Root>
          <MdReader>
            <ContentTable headersLevel={headersLevel} />
          </MdReader>
          <MdViewerPage markdownText={markdownText} />
        </Root>
      </Container>
    </PageWrapper>
  );
}

const Root = styled.div`
  display: flex;
`;

const MdReader = styled.div`
  display: flex;
  padding-right: 50px;
  flex-direction: column;
`;
