type requestMethod =
  | ""
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "HEAD"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

export class NetworkItemDetail {
  name: string = "";
  status: number | string = 0;
  url: string = "";
  cancelState?: 0 | 1 | 2 | 3 = 0;
  readyState?: XMLHttpRequest["readyState"] = 0;
  header: { [key: string]: string } = {};
  method: requestMethod = "";
  requestType: "xhr" | "fetch" | "ping" | "custom" = "xhr";
  requestHeader: HeadersInit = {};
  response: any;
  responseSize: number = 0;
  startTime: number = 0;
  endTime: number = 0;
  postData: { [key: string]: string } = {};
  getData: { [key: string]: string } = {};
}
export const queryRequestData = (
  url: string,
  getData: { [key: string]: string } = {},
) => {
  if (Object.prototype.toString.call(getData) !== "[object Object]") {
    getData = {};
  }
  const isUrl =
    /^http|https:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\’:+!]*([^<>\"\"])*$/
      .test(url);
  if (isUrl) {
    let searchQuery: string[] = url.split("?") || [];
    searchQuery.shift(); //去除URL项
    if (searchQuery.length) {
      searchQuery = searchQuery.join("?").split("&");
      for (const iterator of searchQuery) {
        const splitKey: string[] = iterator.split("=");
        try {
          getData[splitKey[0]] = decodeURIComponent(splitKey[1]);
        } catch (error) {
          getData[splitKey[0]] = splitKey[1];
        }
      }
    }
  }
  return getData;
};
