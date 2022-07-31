import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";

import { getLineChartData } from "../../../../services/lineChartRegistry";

export interface ChartData {
  chartDataMap: any;
  filterValue: string;
}

const initialState: ChartData = {
  chartDataMap: {},
  filterValue: "h",
};

export const chartDataSlice = createSlice({
  name: "chartData",
  initialState,
  reducers: {
    onFilterChange: (state, action: PayloadAction<any>) => {
      const params = action.payload;
      let chartData = getLineChartData(
        params.fromToDate,
        params.stockPricesData,
        params.filteredBy,
      );

      state.chartDataMap = chartData;
    },
    selectedFilterOption: (state, action: PayloadAction<string>) => {
      state.filterValue = action.payload;
    },
  },
});

export const { onFilterChange, selectedFilterOption } = chartDataSlice.actions;

export const filterValue = (state: RootState) => state.chartData.filterValue;

export const chartDataMap = (state: RootState) => state.chartData.chartDataMap;

export default chartDataSlice.reducer;
