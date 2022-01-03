import React from 'react';
import styled from 'styled-components';
import { Label, LabelProps } from '..';

type Props = {
  label?: string;
  labelProps?: LabelProps;
} & React.HTMLAttributes<HTMLButtonElement>;
const PrimaryButton = ({ label = '', labelProps = {}, ...rest }: Props) => (
  <Button {...rest}>
    <Label
      size="16px"
      color="#FFFFFF"
      lineHeight="19px"
      {...labelProps}
      cursor="pointer"
    >
      {label}
    </Label>
  </Button>
);

interface PropsButton {
  paddingButton?: string;
  backgroundButton?: string;
}

const Button = styled.button<PropsButton>`
  border: none;
  background: ${({ backgroundButton }: { backgroundButton?: string }) =>
    backgroundButton || '#71c8be'};
  cursor: pointer;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: ${({ paddingButton }) => paddingButton || '15px 32px'};
`;
export default PrimaryButton;
