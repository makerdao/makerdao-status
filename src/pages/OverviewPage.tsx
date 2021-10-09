import React from "react";
import styled from "styled-components";
import { MainDAICard, ResumeData } from "../components";
import WrapperPage from "../components/wrappers/WrapperPage";

export default function OverviewPage() {
  return (
    <WrapperPage header={{ title: "Overview", iconName: "overview" }}>
      <Container>
        <MainDAICard />
        <ResumeData />
      </Container>
    </WrapperPage>
  );
}

const Container = styled.div`
  margin-left: 70px;
  margin-top: 80px;
`;
