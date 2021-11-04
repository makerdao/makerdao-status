import React from 'react';
import styled from 'styled-components';

interface Props {
  markdownText: string;
}

const MdViewerPage = ({ markdownText }: Props) => (
  <ViewerContainer dangerouslySetInnerHTML={{ __html: markdownText }} />
);

export default MdViewerPage;

const ViewerContainer = styled.div`
max-width: 70%;
text-align: justify;
`;
