export const getResponse = (response) => {
  let result = "";
  try {
    result = JSON.stringify(JSON.parse(response), undefined, 2);
  } catch {
    result = response;
  }
  return result;
};
