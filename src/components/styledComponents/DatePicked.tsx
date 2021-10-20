import { Moment } from 'moment';
import React, { useCallback, useState } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import styled from 'styled-components';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import { down } from 'styled-breakpoints';

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

const DateRangeFilter = ({
  startDate: startDateProp,
  endDate: endDateProp,
  onDatesChange,
}: Props) => {
  const isDownSm = useBreakpoint(down('sm'));
  const [startDate, setStartDate] = useState<Moment | null>(
    startDateProp || null,
  );
  const [endDate, setEndDate] = useState<Moment | null>(endDateProp || null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null,
  );

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
      setStartDate(startDate);
      setEndDate(endDate);
      onDatesChange({
        startDate: startDate !== null ? startDate : undefined,
        endDate: endDate !== null ? endDate : undefined,
      });
    },
    [onDatesChange],
  );

  return (
    <DateRangePickerContainer>
      <DateRangePicker
        startDate={startDate}
        startDateId="your_unique_start_date_id"
        endDate={endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={onDatesChangeCallBack}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        isOutsideRange={() => false}
        orientation={isDownSm ? 'vertical' : 'horizontal'}
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
    color: #b8c5d3;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    ::placeholder {
      font-size: 14px;
      line-height: 16px;
      color: #b8c5d3;
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
    fill: #b8c5d3;
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
`;

export default DateRangeFilter;
