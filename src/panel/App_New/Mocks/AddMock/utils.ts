export const isJsonValid = (jsonString: string) => {
  let result = true;
  try {
    JSON.parse(jsonString);
  } catch (e) {
    result = false;
  }

  return result;
};
