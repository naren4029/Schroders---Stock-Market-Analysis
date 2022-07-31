import { getAPIURL, getAPIKey } from "./configManager";

describe("Test Async Service Manager Module", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should call getAPIKey function with params", () => {
    const container = { getAPIKey };

    const spy = jest.spyOn(container, "getAPIKey");

    const getAPIKeySpy: any = container.getAPIKey();

    expect(spy).toHaveBeenCalled();
    expect(getAPIKeySpy).toEqual(expect.any(String));
  });

  it("should call getAPIKey function with params", () => {
    const container = { getAPIURL };

    const spy = jest.spyOn(container, "getAPIURL");

    const getAPIURLSpy: any = container.getAPIURL("stockSymbols", {});

    expect(spy).toHaveBeenCalledWith("stockSymbols", {});

    expect(getAPIURLSpy).toEqual(expect.any(String));
  });
});
