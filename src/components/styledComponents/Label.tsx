/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';

export interface LabelProps {
  color?: string;
  weight?: string;
  margin?: string;
  size?: string;
  lineHeight?: string;
  fonts?: 'Roboto' | 'Poppins' | 'Work Sans';
  textAlign?: string;
  textTransform?: string;
  cursor?: string;
  marginLeft?: string;
}

const Label = styled.label`
  ${({ margin }: Partial<LabelProps>) => (margin ? `margin: ${margin}` : '')};
  ${({ cursor }: Partial<LabelProps>) => (cursor ? `cursor: ${cursor}` : '')};
  ${({ textAlign }: Partial<LabelProps>) =>
    textAlign ? `text-align: ${textAlign}` : ''};
  ${({ textTransform }: Partial<LabelProps>) =>
    textTransform ? `text-transform: ${textTransform}` : ''};
  color: ${({ color }: Partial<LabelProps>) => color || '#31394d'};
  font-weight: ${({ weight }: Partial<LabelProps>) => weight || '500'};
  font-size: ${({ size }: Partial<LabelProps>) => size || '14px'};
  line-height: ${({ lineHeight }: Partial<LabelProps>) => lineHeight || '16px'};
  font-family: ${({ fonts }: Partial<LabelProps>) => fonts || 'Roboto'};
  font-style: normal;
  ${({ cursor }: Partial<LabelProps>) => (cursor ? `cursor: ${cursor}` : '')};
  ${({ marginLeft }: Partial<LabelProps>) =>
    marginLeft ? `margin-left: ${marginLeft}` : ''};

    a {
      color: #2F80ED;
      text-decoration: none;
      &:hover {
      cursor: pointer;
      }
    }
`;

export default Label;
