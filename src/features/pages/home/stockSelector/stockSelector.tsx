import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';

import { fetchSymbolAsync, onStockSelect, stockSymbols, selectedStockSymbols } from '../stockSelector/stockSelectorSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';


const StockSelector = () => {

    const dispatch = useAppDispatch();

    const stockSymbolsList = useAppSelector(stockSymbols);

    const stockSymbolsSelected = useAppSelector(selectedStockSymbols);

    const handleChange = (event: any, val: any) => {
        dispatch(onStockSelect(val))
    };

    const isLoading = () => {
        if (stockSymbolsList.length === 0) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        dispatch(fetchSymbolAsync());
    }, [dispatch]);

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 230 }}>
                <Autocomplete
                    multiple
                    loading={isLoading()}
                    options={stockSymbolsList}
                    onChange={(event, value) => handleChange(event, value)}
                    disableCloseOnSelect
                    getOptionLabel={(option: any) => option.symbol}
                    getOptionDisabled={(option) => stockSymbolsSelected.length > 2 && !stockSymbolsSelected.find((obj) => obj.symbol === option.symbol)}
                    renderOption={(props, option, { selected }) => (
                        <li {...props} >
                            {option.symbol + '- (' + option.description + ')'}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} label="Select Stock Name" placeholder="Enter Stock Name" />
                    )}
                />
            </FormControl>
        </>

    );
}

export default StockSelector;