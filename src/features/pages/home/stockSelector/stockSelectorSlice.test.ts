import stockSelectorReducer, {
  onStockSelect,
  StockSelector,
  fetchSymbolAsync,
} from "./stockSelectorSlice";
import { RootState } from "../../../../app/store";

describe("Stock Selector Reducer", () => {
  const initialState: StockSelector = {
    loading: false,
    stockSymbolsList: [],
    selectedStockSymbols: [],
  };

  it("should handle initial state", () => {
    expect(stockSelectorReducer(undefined, { type: "unknown" })).toEqual({
      loading: false,
      stockSymbolsList: [],
      selectedStockSymbols: [],
    });
  });

  it("should handle on stock select", () => {
    const param = [{ synbol: "AMZN" }];
    const actual = stockSelectorReducer(initialState, onStockSelect(param));
    expect(actual.selectedStockSymbols).toEqual(param);
  });
});
