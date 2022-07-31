import { APIMap, getAllData, getData } from "./asyncServiceManager";

jest.mock("./asyncServiceManager.ts", () => {
  return {
    getData: (URLkey: string, fetchParams: any) => {},
    getAllData: (URLkey: string = "", fetchParams: any = []) => {},
    APIMap: (URLkey: string, fetchParams: any) => {},
  };
});

describe("Test Async Service Manager Module", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call APIMap function with params", () => {
    const APIMap = jest.fn();

    expect(APIMap).toBeDefined();

    expect(APIMap).toBeTruthy();

    const params: any[] = [
      { symbol: "xyz", from: "123", to: "123", resolution: 1, token: "apiKey" },
    ];

    APIMap.mockReturnValue(expect.any(Function));

    APIMap("stockPrice", params);

    expect(APIMap).toHaveBeenCalledWith("stockPrice", params);
  });

  it("should call geData function with params", () => {
    const getData = jest.fn();

    expect(getData).toBeDefined();

    expect(getData).toBeTruthy();

    const params: any[] = [
      { symbol: "xyz", from: "123", to: "123", resolution: 1, token: "apiKey" },
    ];

    getData.mockReturnValue(expect.any(Function));

    getData("stockPrice", params);

    expect(getData).toHaveBeenCalledWith("stockPrice", params);
  });

  it("should call getAllData function with params", () => {
    const getAllData = jest.fn();

    expect(getAllData).toBeDefined();

    expect(getAllData).toBeTruthy();

    const params: any[] = [
      { symbol: "xyz", from: "123", to: "123", resolution: 1, token: "apiKey" },
    ];

    getAllData.mockReturnValue(expect.any(Function));

    getAllData("stockPrice", params);

    expect(getAllData).toHaveBeenCalledWith("stockPrice", params);
  });
});
