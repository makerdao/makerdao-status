import styled from 'styled-components';

const Input = styled.input`
  background: #ffffff;
  box-shadow: 2px 1px 4px #e5e9f2;
  border-radius: 10px;
  border: none;
  outline: none;
  min-height: 48px;
  font-size: 14px;
  line-height: 16px;
  color: #b8c5d3;
  ::placeholder {
    font-size: 14px;
    line-height: 16px;
    color: #b8c5d3;
  }
  padding-inline-start: 30px;
  padding-inline-end: 20px;
`;

export default Input;
