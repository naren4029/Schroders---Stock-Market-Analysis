import SearchAccordionSelectorReducer, {
  SearchAccordionSelector,
} from "./searchAccordionSlice";

describe("Search Accordion Selector Reducer", () => {
  const initialState: SearchAccordionSelector = {
    loading: false,
    stockPrices: [],
  };

  it("should handle initial state", () => {
    expect(
      SearchAccordionSelectorReducer(undefined, { type: "unknown" }),
    ).toEqual({
      loading: false,
      stockPrices: [],
    });
  });
});
