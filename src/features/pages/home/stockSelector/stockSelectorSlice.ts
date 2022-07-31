import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";
import { getData } from "../../../../services/asyncServiceManager";
import { getAPIKey } from "../../../../services/configManager";

export interface StockSelector {
  loading: boolean;
  stockSymbolsList: any[];
  selectedStockSymbols: any[];
}

const initialState: StockSelector = {
  loading: false,
  stockSymbolsList: [],
  selectedStockSymbols: [],
};

export const fetchSymbolAsync = createAsyncThunk(
  "stockSelector/fetchStockSymbol",
  async () => {
    const fetchParams = { exchange: "US", mic: "XNAS", token: getAPIKey() };
    const response = await getData("stockSymbols", fetchParams);
    if (response.data && response.data.length > 0) {
      return response.data.sort((a: any, b: any) => {
        if (a.symbol < b.symbol) {
          return -1;
        }
        if (a.symbol > b.symbol) {
          return 1;
        }

        return 0;
      });
    }
    return [];
  },
);

export const stockSelectorSlice = createSlice({
  name: "stockSelector",
  initialState,
  reducers: {
    onStockSelect: (state, action: PayloadAction<any[]>) => {
      state.selectedStockSymbols = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSymbolAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSymbolAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.stockSymbolsList = action.payload;
      })
      .addCase(fetchSymbolAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { onStockSelect } = stockSelectorSlice.actions;

export const stockSymbols = (state: RootState) =>
  state.stockSelector.stockSymbolsList;

export const selectedStockSymbols = (state: RootState) =>
  state.stockSelector.selectedStockSymbols;

export default stockSelectorSlice.reducer;
