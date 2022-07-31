import chartDataSliceReducer, {
  ChartData,
  onFilterChange,
  selectedFilterOption,
} from "./chartPanelDataSlice";

describe("Search Accordion Selector Reducer", () => {
  const initialState: ChartData = {
    chartDataMap: {},
    filterValue: "h",
  };

  it("should handle initial state", () => {
    expect(chartDataSliceReducer(undefined, { type: "unknown" })).toEqual({
      chartDataMap: {},
      filterValue: "h",
    });
  });

  it("should handle on filter change", () => {
    const param = {
      filteredBy: "h",
      fromToDate: { fromDt: "123", toDt: "123" },
      stockPricesData: [],
    };
    const actual = chartDataSliceReducer(initialState, onFilterChange(param));
    expect(actual.chartDataMap).toEqual(expect.any(Object));
  });

  it("should handle selected Filter Option", () => {
    const actual = chartDataSliceReducer(
      initialState,
      selectedFilterOption("h"),
    );
    expect(actual.filterValue).toEqual("h");
  });
});
