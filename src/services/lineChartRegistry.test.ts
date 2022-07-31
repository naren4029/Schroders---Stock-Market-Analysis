import {
  getLineChartData,
  padTo2Digits,
  formatDate,
} from "./lineChartRegistry";

describe("Test Line Chart Registry Module", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should call getAPIKey function with params", () => {
    const container = { getLineChartData };

    const spy = jest.spyOn(container, "getLineChartData");

    const params: any = {
      filteredBy: "h",
      fromToDate: { fromDt: 123, toDt: 344 },
      stockPricesData: [{ symbol: "h", selectedData: {} }],
    };

    const getLineChartDataSpy: any = container.getLineChartData(
      params.fromToDate,
      params.stockPricesData,
      params.filteredBy,
    );

    expect(spy).toHaveBeenCalledWith(
      params.fromToDate,
      params.stockPricesData,
      params.filteredBy,
    );
    expect(getLineChartDataSpy).toEqual(expect.any(Object));
  });

  it("should call padTo2Digits function with params", () => {
    const container = { padTo2Digits };

    const spy = jest.spyOn(container, "padTo2Digits");

    const padTo2DigitsSpy: any = container.padTo2Digits(5);

    expect(spy).toHaveBeenCalledWith(5);
    expect(padTo2DigitsSpy).toEqual("05");
  });

  it("should call padTo2Digits function with params", () => {
    const container = { formatDate };

    const spy = jest.spyOn(container, "formatDate");

    const formatDateSpy: any = container.formatDate(543349800000);

    expect(spy).toHaveBeenCalledWith(543349800000);

    expect(formatDateSpy).toEqual("03/22/1987 00:00:00");
  });
});
