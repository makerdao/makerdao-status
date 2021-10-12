/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import { getEtherscanLink } from '../../../services/utils/formatsFunctions';
import DataSmallList from '../DataSmallList';

const DataBlockContainer = styled.div`
  width: 100%;
  margin-left: 2rem;

  .dataBlockTitle {
    display: flex;
    align-items: baseline;

    .dataBlockMainTitle {
      font-size: 1.2rem;
      font-weight: 600;
      min-height: 1.2rem;
    }
    .dataBlockSecondaryTitle {
      font-size: 0.8rem;
      margin-left: 0.5rem;
      display: flex;

      a,
      span {
        color: #505050;
      }

      a {
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

interface Props {
  data: any;
}

export default function DataBlockOverview({ data, ...props }: Props) {
  if (!data) return null;

  const title = data.blockTitle;
  const { blockSubtitleLink } = data;
  const { blockData } = data;

  const linksSubtitle = Array.isArray(blockSubtitleLink)
    ? blockSubtitleLink
    : [blockSubtitleLink];

  return (
    <DataBlockContainer {...props}>
      <div className="dataBlockTitle">
        <div className="dataBlockMainTitle">{title}</div>
        {blockSubtitleLink && (
          <div className="dataBlockSecondaryTitle">
            <span>(</span>

            {linksSubtitle.map((item, i) => (
              <a key={Math.random()} href={getEtherscanLink(item.linkKey)}>
                {i > 0 && i < linksSubtitle.length && ', '}
                {item.label}
              </a>
            ))}

            <span>)</span>
          </div>
        )}
      </div>
      <DataSmallList data={blockData} />
    </DataBlockContainer>
  );
}
