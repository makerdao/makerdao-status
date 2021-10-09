import { PropsWithChildren } from "react";
import styled from "styled-components";
import { useSideBarContext } from "../../context/SideBarContext";

export const Container = styled.div`
  margin-left: ${({ expanded }: { expanded?: boolean }) =>
    expanded ? "240px" : "79px"};
`;

const MainContainer = ({ children }: PropsWithChildren<{}>) => {
  const {
    state: { expandedSideBar },
  } = useSideBarContext();
  return <Container expanded={expandedSideBar}>{children}</Container>;
};

export default MainContainer;
