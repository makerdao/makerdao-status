import React from "react";
import styled from "styled-components";
import WrapperPage from "../components/wrappers/WrapperPage";

export default function CollateralPage() {
  return (
    <WrapperPage
      header={{
        title: "Collaterals",
        iconName: "collateral",
      }}
    >
      <Container>Collaterals</Container>
    </WrapperPage>
  );
}

const Container = styled.div`
  margin-left: 70px;
  margin-top: 80px;
`;
