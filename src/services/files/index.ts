export const exportToJsonFile = (jsonData, fileName?: string) => {
  let dataStr = JSON.stringify(jsonData);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
  const date = new Date();

  let exportFileDefaultName =
    fileName ||
    `mokku-mocks-${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}.json`;

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
  linkElement.remove();
};
