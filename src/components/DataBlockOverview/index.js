import React from "react";
import styled from "styled-components";
import DataSmallList from "../DataSmallList";

const DataBlockContainer = styled.div`
  width: 100%;
  color: black;
  .dataBlockTitle {
    display: flex;
    align-items: baseline;

    .dataBlockMainTitle {
      font-size: 1rem;
      font-weight: 600;
    }
    .dataBlockSecondaryTitle {
      font-size: 0.8rem;
      font-weight: 600;
      margin-left: 1rem;
    }
  }
`;

export default function DataBlockOverview({ data, ...props }) {
  if (!data) return null;

  const title = data.blockTitle;
  const subTitle = data.blockSubtitle;
  const blockData = data.blockData;

  return (
    <DataBlockContainer {...props}>
      <div className="dataBlockTitle">
        <div className="dataBlockMainTitle">{title}</div>
        <div className="dataBlockSecondaryTitle">{subTitle}</div>
      </div>
      <DataSmallList data={blockData} />
    </DataBlockContainer>
  );
}
