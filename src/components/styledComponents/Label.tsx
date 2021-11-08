/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';

export interface LabelProps {
  color?: string;
  weight?: string;
  margin?: string;
  size?: string;
  lineHeight?: string;
  fonts?: 'Roboto' | 'Work Sans';
  textAlign?: string;
}

const Label = styled.label`
  ${({ margin }: Partial<LabelProps>) => (margin ? `margin: ${margin}` : '')};
  ${({ textAlign }: Partial<LabelProps>) =>
    textAlign ? `textAlign: ${textAlign}` : ''};
  color: ${({ color }: Partial<LabelProps>) => color || '#31394d'};
  font-weight: ${({ weight }: Partial<LabelProps>) => weight || '500'};
  font-size: ${({ size }: Partial<LabelProps>) => size || '14px'};
  line-height: ${({ lineHeight }: Partial<LabelProps>) => lineHeight || '16px'};
  font-family: ${({ fonts }: Partial<LabelProps>) => fonts || 'Roboto'};
  font-style: normal;
`;

export default Label;
