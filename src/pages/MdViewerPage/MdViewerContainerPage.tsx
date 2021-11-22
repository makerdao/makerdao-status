// eslint-disable-next-line import/extensions
import marked from 'marked/lib/marked.js';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from '../../components';
import {
  isMdUrlFile,
  isValidGithubMdUrl,
  isValidRawMdUrl,
} from '../../services/utils/urlRegExp';
import './headingStyle.css';
import MdViewerPage, { MarkDownHeaders } from './MdViewerPage';
import makerRender from './renderingMDutil';

export default function MdViewerContainerPage() {
  const {
    push,
    location: { search: urlQuery },
  } = useHistory();

  const url = useMemo(
    () => new URLSearchParams(urlQuery).get('url') || '',
    [urlQuery],
  );

  const rowGithubURl = useMemo(
    () =>
      url
        .toString()
        .replace('/blob', '')
        .replace('github.com', 'raw.githubusercontent.com'),
    [url],
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [markdownText, setMarkdownText] = useState<string>('');
  const [headersLevel, setHeadersLevel] = useState<MarkDownHeaders[]>([]);

  const creatingIndexItems = useCallback(
    (level: number, htmlCleanedText: string, escapedText: string) => {
      const cleanedText = htmlCleanedText
        .replace(/[^a-zA-Z,:" ";?]/g, '')
        .replace(';', '`');

      if (headersLevel.some((a) => a.title === cleanedText)) return;
      setHeadersLevel([
        ...headersLevel,
        {
          level,
          title: cleanedText,
          id: escapedText,
          href: `#${escapedText}`,
        },
      ]);
    },
    [headersLevel],
  );

  const isUrlValid = useMemo(() => {
    const mutatedUrl = url
      .toString()
      .replace('/blob', '')
      .replace('github.com', 'raw.githubusercontent.com');
    return (
      isMdUrlFile(url) &&
      (isValidGithubMdUrl(url) || isValidRawMdUrl(mutatedUrl))
    );
  }, [url]);

  useEffect(() => {
    if (!isUrlValid) {
      push('not-found');
    } else {
      const fetchCreator = async () => {
        try {
          setLoading(true);
          const response = await fetch(rowGithubURl);
          if (!response.ok) {
            push('not-found');
          } else {
            const parsed = await response.text();
            setMarkdownText(marked.parse(parsed));
          }
          setLoading(false);
        } catch (error) {
          push('not-found');
        }
      };
      fetchCreator();
    }
  }, [push, isUrlValid, url, rowGithubURl]);

  marked.use({
    renderer: makerRender({ forEachHeading: creatingIndexItems }),
  });

  if (loading) return <Spinner />;

  return (
    <MdViewerPage
      markdownText={markdownText}
      mdUrl={url}
      headersLevel={headersLevel}
    />
  );
}
