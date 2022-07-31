import config from "../config/config.json";

export const getAPIKey = () => {
  return config.api.key;
};

export const getAPIURL = (key: string, params: any) => {
  let pathVariables: string = "";
  const urlMap: any = config.url;

  Object.keys(params).forEach((element) => {
    if (params[element]) {
      if (!pathVariables) {
        pathVariables = "?" + element + "=" + params[element];
      } else {
        pathVariables = pathVariables + "&" + element + "=" + params[element];
      }
    }
  });
  return urlMap[key] + pathVariables;
};
