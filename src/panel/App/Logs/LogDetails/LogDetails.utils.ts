import { isNull } from "lodash";

export const getResponse = (response) => {
  let result = "";
  try {
    result = JSON.stringify(JSON.parse(response), undefined, 2);
  } catch {
    result = response;
  }
  return result;
};

export const parseJSONIfPossible = (original: string) => {
  let result = { json: {}, parsed: false, original };
  try {
    const json = JSON.parse(original);
    result = {
      original,
      parsed: typeof json === "object" && !isNull(json),
      json,
    };
  } catch {
    result = { original, parsed: false, json: {} };
  }
  return result;
};
