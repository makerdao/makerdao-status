import { Moment } from 'moment';
import React, { useCallback, useState } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { down, up } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import styled from 'styled-components';
import { Icon } from '..';

interface Props {
  startDate?: Moment;
  endDate?: Moment;
  onDatesChange: ({
    startDate,
    endDate,
  }: {
    startDate?: Moment;
    endDate?: Moment;
  }) => void;
}

interface ArrowDirection {
  isPrev?: boolean;
}

const DatePicker = ({ startDate, endDate, onDatesChange }: Props) => {
  const isDownSm = useBreakpoint(down('sm'));
  const isOverMd = useBreakpoint(up('md'));
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);

  const onDatesChangeCallBack = useCallback(
    ({
      // eslint-disable-next-line @typescript-eslint/no-shadow
      startDate,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      endDate,
    }: {
      startDate: Moment | null;
      endDate: Moment | null;
    }) => {
      onDatesChange({
        startDate: startDate !== null ? startDate : undefined,
        endDate: endDate !== null ? endDate : undefined,
      });
    },
    [onDatesChange],
  );

  const NextArrowCustomized = ({ isPrev }: ArrowDirection) => (
    <NextArrow isPrev={isPrev}>
      <Icon name="nextArrow" />
    </NextArrow>
  );

  return (
    <DateRangePickerContainer>
      <DateRangePicker
        startDate={startDate || null}
        startDateId="your_unique_start_date_id"
        endDate={endDate || null}
        endDateId="your_unique_end_date_id"
        onDatesChange={onDatesChangeCallBack}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        isOutsideRange={() => false}
        orientation={isDownSm ? 'vertical' : 'horizontal'}
        anchorDirection={isDownSm ? undefined : 'right'}
        minimumNights={0}
        hideKeyboardShortcutsPanel
        navNext={isOverMd && <NextArrowCustomized />}
        navPrev={isOverMd && <NextArrowCustomized isPrev />}
      />
    </DateRangePickerContainer>
  );
};

const DateRangePickerContainer = styled.div`
  .DateRangePicker {
    width: 100%;
  }
  div input {
    width: 100px;
    color: black;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    ::placeholder {
      font-size: 14px;
      line-height: 16px;
      color: black;
    }
  }
  .DateRangePickerInput {
    width: 100%;
    min-height: 43px;
    padding-top: 5px;
    border-radius: 10px;
    border: 0px;
    box-shadow: 2px 1px 4px #e5e9f2;
  }
  .DateRangePickerInput_arrow_svg {
    height: 14px;
    width: 14px;
    fill: black;
  }
  .DayPickerNavigation__verticalDefault {
    position: absolute;
    width: 100px;
    height: 32px;
  }
  DayPickerNavigation_svg__vertical {
    height: 22px;
    width: 22px;
    fill: #b8c5d3;
  }

  .DayPicker_weekHeader {
    text-align: center;
    top: 70px;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    align-items: center;
    text-align: center;
    font-feature-settings: 'tnum' on, 'lnum' on;
    color: #000000;
  }

  ul li {
    margin: 0;
  }

  .CalendarMonth_caption {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
    margin-bottom: 20px;
  }
  .CalendarDay__selected_span {
    background: #A2DDD7;
  }

  .CalendarDay__selected {
    background: #1AAB9B;
  }
`;

const NextArrow = styled.div`
  width: fit-content;
  transform: ${({ isPrev }: { isPrev?: boolean }) => isPrev && 'rotate(180deg)'};
  position: absolute;
  right: ${({ isPrev }: { isPrev?: boolean }) => (!isPrev ? '36px' : '565px')};
  top: ${({ isPrev }: { isPrev?: boolean }) => (!isPrev ? '23px' : '22px')};
`;

export default DatePicker;
