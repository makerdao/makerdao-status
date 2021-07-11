import React from "react";
import styled from "styled-components";
import { getEtherscanLink } from "../../utils/formatsFunctions";
import DataSmallList from "../DataSmallList";

const DataBlockContainer = styled.div`
  width: 100%;
  margin-left: 2rem;

  .dataBlockTitle {
    display: flex;
    align-items: baseline;

    .dataBlockMainTitle {
      font-size: 1.2rem;
      font-weight: 600;
      min-height: 1rem;
    }
    .dataBlockSecondaryTitle {
      font-size: 0.8rem;
      margin-left: 1rem;
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

export default function DataBlockOverview({ data, ...props }) {
  if (!data) return null;

  const title = data.blockTitle;
  const blockSubtitleLink = data.blockSubtitleLink;
  const blockData = data.blockData;

  const linksSubtitle = Array.isArray(blockSubtitleLink)
    ? blockSubtitleLink
    : [blockSubtitleLink];

  return (
    <DataBlockContainer {...props}>
      <div className="dataBlockTitle">
        <div className="dataBlockMainTitle">{title}</div>
        {blockSubtitleLink && <div className="dataBlockSecondaryTitle">
          <span>(</span>

          {linksSubtitle.map((item, i) => (
            <a key={i} href={getEtherscanLink(item.linkKey)}>
              {i > 0 && i < linksSubtitle.length && ", "}
              {item.label}
            </a>
          ))}

          <span>)</span>
        </div>}
      </div>
      <DataSmallList data={blockData} />
    </DataBlockContainer>
  );
}
