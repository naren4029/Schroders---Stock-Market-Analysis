import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";
import { getAllData } from "../../../../services/asyncServiceManager";


export interface SearchAccordionSelector {
    loading: boolean;
    stockPrices: any;
}

const initialState: SearchAccordionSelector = {
    loading: false,
    stockPrices: []
}

export const fetchPricesAsync = createAsyncThunk(
    "searchAccordionSelector/fetchPrice",
    async (fetchParams: any[]) => {

        const response = await getAllData("stockPrice", fetchParams);
        return response.data;
    },
);

export const searchAccordionSelectorSlice = createSlice({
    name: "searchAccordionSelector",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPricesAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPricesAsync.fulfilled, (state, action) => {
                state.stockPrices = action.payload;
                state.loading = false;
            })
            .addCase(fetchPricesAsync.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const loading = (state: RootState) =>
    state.searchAccordionSelector.loading;

export const stockPrices = (state: RootState) =>
    state.searchAccordionSelector.stockPrices;

export default searchAccordionSelectorSlice.reducer;