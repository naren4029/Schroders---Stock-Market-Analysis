import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import stockSelectorReducer from "../features/pages/home/stockSelector/stockSelectorSlice";
import dateSelectorSlice from "../features/pages/home/dateSelector/dateSelectorSlice";
import searchAccordionSelectorSlice from "../features/pages/home/searchAccordion/searchAccordionSlice";
import chartPanelDataSlice from "../features/pages/home/chartPanel/chartPanelDataSlice";

export const store = configureStore({
  reducer: {
    stockSelector: stockSelectorReducer,
    dateSelector: dateSelectorSlice,
    searchAccordionSelector: searchAccordionSelectorSlice,
    chartData: chartPanelDataSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
