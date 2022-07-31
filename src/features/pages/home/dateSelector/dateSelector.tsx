import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fromDate, toDate, minToDate, maxFromDate, onFromDateChange, onToDateChange, setDateErrorMessage } from '../dateSelector/dateSelectorSlice';

const DateSelector = (props: any) => {

  const fieldLabel = props.label;

  const dispatch = useAppDispatch();

  const fromDt = useAppSelector(fromDate);

  const toDt = useAppSelector(toDate);

  const minToDt = useAppSelector(minToDate);

  const maxFromDt = useAppSelector(maxFromDate);

  const getDateValue = () => {
    if (fieldLabel === 'To Date') {
      const dateValue = (toDt === 0) ? null : new Date(toDt);
      return dateValue;
    }
    const dateValue = (fromDt === 0) ? null : new Date(fromDt);
    return dateValue;
  }

  const getMinDate = () => {
    if (fieldLabel === 'To Date') {
      return new Date(minToDt);
    }
  }

  const getMaxDate = () => {
    if (fieldLabel === 'From Date') {
      return new Date(maxFromDt);
    }
  }

  const fromDtChange = (newValue: Date) => {

    const dtValue = new Date(newValue).getTime();

    dispatch(onFromDateChange(dtValue));
  }

  const toDateChange = (newValue: Date) => {

    const dtValue = new Date(newValue).getTime();

    dispatch(onToDateChange(dtValue));
  }

  const onDateChange = ((newValue: any) => {
    if (fieldLabel === 'From Date') {
      fromDtChange(newValue);
    } else {
      toDateChange(newValue);
    }
  });

  const errorNotify = ((reason: any, value: any) => {

    const msg = (reason) ? 'Invalid ' + fieldLabel : '';
    dispatch(setDateErrorMessage(msg));
  })

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label={fieldLabel}
            value={getDateValue()}
            minDate={getMinDate()}
            maxDate={getMaxDate()}
            onError={errorNotify}
            onChange={onDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
    </>
  );
}

export default DateSelector;
