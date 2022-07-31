import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";


export interface DateSelector {
    fromDate: number;
    toDate: number;
    minToDate: number;
    maxFromDate: number;
    dateErrorMessage: string
}

const initialState: DateSelector = {
    fromDate: 0,
    toDate: 0,
    minToDate: -19800000,
    maxFromDate: 4102424940000,
    dateErrorMessage: ''
};

export const dateSelectorSlice = createSlice({
    name: "dateSelector",
    initialState,
    reducers: {
        onFromDateChange(state, action: PayloadAction<number>) {
            state.fromDate = action.payload;
            state.minToDate = action.payload;
        },
        onToDateChange(state, action: PayloadAction<number>) {
            state.toDate = action.payload;
            state.maxFromDate = action.payload;
        },
        setDateErrorMessage(state, action: PayloadAction<string>) {
            state.dateErrorMessage = action.payload;
        }
    }
});

export const { onFromDateChange, onToDateChange, setDateErrorMessage } = dateSelectorSlice.actions;

export const fromDate = (state: RootState) =>
    state.dateSelector.fromDate;

export const maxFromDate = (state: RootState) =>
    state.dateSelector.maxFromDate;

export const toDate = (state: RootState) =>
    state.dateSelector.toDate;

export const minToDate = (state: RootState) =>
    state.dateSelector.minToDate;

export const dateErrorMessage = (state: RootState) =>
    state.dateSelector.dateErrorMessage;

export default dateSelectorSlice.reducer;
