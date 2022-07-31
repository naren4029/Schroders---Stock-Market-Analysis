import { getAPIURL } from "./configManager";
import axios from "axios";

export const getData = (URLkey: string = "", fetchParams: any = {}) => {
  return new Promise<{ data: any }>((resolve, reject) => {
    const getURL = getAPIURL(URLkey, fetchParams);

    axios
      .get(getURL)
      .then((res: any) => {
        resolve({ data: res.data });
      })
      .then((err) => reject(err));
  });
};

export const getAllData = (URLkey: string = "", fetchParams: any = []) => {
  return new Promise<{ data: any }>((resolve, reject) => {
    Promise.all(APIMap(URLkey, fetchParams)).then(
      (results: any) => {
        const response: any[] = [];
        results.forEach((result: any, index: number) => {
          const data = result.data;
          const reqURL = result.request.responseURL;
          const stockNameStartIndex = reqURL.indexOf("=") + 1;
          const stockNameEndIndex = reqURL.indexOf("&");
          const symbolCode = reqURL.substr(
            stockNameStartIndex,
            stockNameEndIndex - stockNameStartIndex,
          );
          data["symbol"] = symbolCode;
          response.push(data);
        });
        resolve({ data: response });
      },
      (err) => reject(err),
    );
  });
};

export const APIMap = (URLkey: string, fetchParams: any) => {
  let api = fetchParams.map((obj: any) => {
    const getURL = getAPIURL(URLkey, obj);
    return axios.get(getURL);
  });
  return api || [];
};
