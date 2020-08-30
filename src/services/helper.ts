export const isValidJSON = (json: string) => {
  try {
    JSON.parse(json);
    return true;
  } catch (e) {
    return false;
  }
};

export const getError = (errors: Record<string, string | string[]>) => {
  const keys = Object.keys(errors);
  if (keys.length === 0) {
    return;
  } else {
    return errors[keys[0]];
  }
};

export const getHeaders = (headers: Record<string, string>) => {
  return Object.keys(headers).map((name) => ({
    name,
    value: headers[name],
  }));
};
