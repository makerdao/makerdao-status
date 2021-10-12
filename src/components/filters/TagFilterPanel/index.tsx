import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FilterTag, Flex } from '../../styledComponents';

interface SelectableValue {
  label: string;
  selected?: boolean;
}
interface Props {
  filters: SelectableValue[];
  color: string;
  onClick: (label: string, oldSelectedValue?: boolean) => void;
  onClear: () => void;
}
export default function TagFilterPanel({
  filters,
  color,
  onClick,
  onClear,
}: Props) {
  const onClickCallback = useCallback(
    (label: string, selected?: boolean) => () => onClick(label, selected),
    [onClick],
  );

  return (
    <Flex full alignCenter>
      {filters.map(({ label, selected }) => (
        <FilterTag
          key={Math.random()}
          onSelect={onClickCallback(label, false)}
          label={label}
          selected={selected}
          color={color}
          margin="5px 5px 5px 5px"
          onClose={onClickCallback(label, true)}
        />
      ))}
      <Button onClick={onClear}>
        <Label>Clear All</Label>
      </Button>
    </Flex>
  );
}

const Label = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #2f80ed;
`;

const Button = styled.button`
  margin-left: 10px;
  background: none;
  border: none;
`;
