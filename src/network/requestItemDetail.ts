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
