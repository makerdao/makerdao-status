import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
interface Props {
  bottom?: string;
  top?: string;
}

const Spinner = styled.div<Props>`
  z-index: 20;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid rgb(219 247 243);
  border-right: 2px solid #71c8be;
  border-bottom: 2px solid #71c8be;
  border-left: 2px solid rgb(80 195 179);
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: absolute;
  left: 48.53%;
  ${({ bottom }) => (bottom ? `bottom: ${bottom}` : '')};
  ${({ top }) => (top ? `top: ${top}` : 'top: 50%')};
  transform: translate(-50%, -50%);
`;

export default Spinner;
