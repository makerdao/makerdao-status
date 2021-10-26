/* eslint-disable no-confusing-arrow */
import React, {
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
} from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

interface Props {
  selected?: boolean;
  color: string;
  margin?: string;
  label: string;
  onSelect?: () => void;
  onClose?: () => void;
}

const FilterTag = ({
  children,
  selected,
  label,
  onSelect,
  onClose,
  ...rest
}: PropsWithChildren<Props>) => {
  const onSelectCallback = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!e.defaultPrevented) {
        onSelect && onSelect();
      }
    },
    [onSelect],
  );

  const onCloseCallback = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      onClose && onClose();
    },
    [onClose],
  );

  return (
    <FilterTagContainer
      onClick={onSelectCallback}
      {...{ label, selected, ...rest }}
    >
      <Span>
        <Label selected={selected}>{label}</Label>
        {selected && (
          <Button
            onClick={
              onCloseCallback as
                | MouseEventHandler<HTMLButtonElement | HTMLDivElement>
                | undefined
            }
          >
            <Icon width={13} height={13} name="close" />
          </Button>
        )}
      </Span>
    </FilterTagContainer>
  );
};

const FilterTagContainer = styled.div`
  background: ${({ selected, color }: Props) => (selected ? color : 'white')};
  border: 1px solid ${({ color }: Props) => color};
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
  margin: ${({ margin }: Props) => margin};
  cursor: pointer;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Button = styled.button`
  padding-right: 0px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Label = styled.label`
  color: ${({ selected }: { selected?: boolean }) =>
    selected ? 'white' : '#627B96'};
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
`;

export default FilterTag;
