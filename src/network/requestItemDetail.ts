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
  responseType: XMLHttpRequest["responseType"] = "";
  requestHeader: HeadersInit = {};
  response: any;
  responseSize: number = 0;
  startTime: number = 0;
  endTime: number = 0;
  costTime: number = 0;
  postData: { [key: string]: string } | string | null = null;
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

export const getFormattedBody = (body?: BodyInit) => {
  if (!body) return null;
  let formattedBody: string | { [key: string]: string } = {};
  if (typeof body === "string") {
    try {
      formattedBody = JSON.parse(body);
    } catch (error) {
      const bodyArr = body.split("&");
      if (bodyArr.length === 1) {
        formattedBody = body;
      } else {
        // 保证类型是{}
        formattedBody = {};
        for (const iterator of bodyArr) {
          const splitVal = iterator.split("=");
          formattedBody[splitVal[0] as keyof typeof formattedBody] =
            splitVal[1] === undefined ? "undefined" : splitVal[1];
        }
      }
    }
  } else {
  }
  return formattedBody;
};
export const responseParse = (responseType: string, response: any) => {
  if (responseType === "json") {
  } else {
  }
};
