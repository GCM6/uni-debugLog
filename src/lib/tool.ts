export const isObject = (data: any) => {
  if (Object.prototype.toString.call(data) === "[object Object]") {
    return true;
  }
  return false;
};
export const getResponseSizeText = (bytes: number) => {
  if (bytes <= 0) {
    return "";
  }
  if (bytes >= 1000 * 1000) {
    return (bytes / 1000 / 1000).toFixed(1) + " MB";
  }
  if (bytes >= 1000 * 1) {
    return (bytes / 1000).toFixed(1) + " KB";
  }
  return bytes + " B";
};
