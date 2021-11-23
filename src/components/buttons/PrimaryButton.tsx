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

const Button = styled.button`
  border: none;
  padding: 15px 32px;
  cursor: pointer;
  background: #71c8be;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

export default PrimaryButton;
