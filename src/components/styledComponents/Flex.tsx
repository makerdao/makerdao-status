import styled from "styled-components";

interface Props {
  column?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  alignCenter?: boolean;
  alignBetween?: boolean;
}
const Flex = styled.div`
  display: flex;
  flex-direction: ${({ column }: Props) => (column ? "column" : "row")};
  justify-content: ${({ justifyCenter, justifyBetween }) =>
    justifyCenter ? "center" : justifyBetween ? "space-between" : "init"};
  align-items: ${({ alignCenter, alignBetween }) =>
    alignCenter ? "center" : alignBetween ? "space-between" : "init"};
`;
export default Flex;
