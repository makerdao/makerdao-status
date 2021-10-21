/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Select, {
  StylesConfig,
  DropdownIndicatorProps,
  GroupBase,
  Props,
} from 'react-select';
import Icon from '../Icon';

const defaultStyles: StylesConfig<any, true> = {
  indicatorSeparator: () => ({
    borderWidth: 0,
  }),
  placeholder: (styles) => ({
    ...styles,
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#B8C5D3',
  }),
  singleValue: (styles) => ({
    ...styles,
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#B8C5D3',
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    minHeight: 48,
    boxShadow: '2px 1px 4px #E5E9F2;',
    borderRadius: 10,
    border: 'none',
    paddingLeft: 30,
    paddingRight: 30,
  }),
  option: (styles, { isDisabled, isSelected }) => ({
    ...styles,
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#B8C5D3',
    backgroundColor: isSelected
      ? 'rgb(219 247 243)'
      : isDisabled
      ? '#F2F2F2'
      : 'white',
    ':active': {
      ...styles[':active'],
      backgroundColor: !isDisabled
        ? isSelected
          ? '#F2F2F2'
          : '#F2F2F2'
        : undefined,
    },
    cursor: isDisabled ? 'not-allowed' : 'default',
  }),
};

const DropdownIndicator = ({
  selectProps: { menuIsOpen },
}: DropdownIndicatorProps<any, boolean, GroupBase<any>>) => (
  <Icon width={15} height={15} name={menuIsOpen ? 'upArrow' : 'upArrow'} />
);

export default (props: Props<any, boolean, GroupBase<any>>) => (
  <Select
    closeMenuOnSelect={false}
    styles={defaultStyles}
    components={{
      DropdownIndicator,
    }}
    {...props}
  />
);
