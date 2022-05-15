import {
  getFormattedBody,
  NetworkItemDetail,
  queryRequestData,
} from "./requestItemDetail";
// 泛型约束
class XmlReqHandler<T extends XMLHttpRequest> {
  private reqItemDetail: NetworkItemDetail;
  public callback: Function;
  public xmlReq: XMLHttpRequest;
  constructor(xhr: XMLHttpRequest, callback: Function) {
    this.reqItemDetail = new NetworkItemDetail();
    this.callback = callback;
    this.xmlReq = xhr;
    this.xmlReq.onreadystatechange = () => {
      this.onreadystatechange();
    };
  }
  public get(target: T, key: string) {
    console.log("key", key);

    switch (key) {
      case "open":
        return this.getOpenData(target);

      case "send":
        return this.getSendData(target);

      case "setRequestHeader":
        return this.getSetRequestHeader(target);
      default:
        const xhrVal = Reflect.get(target, key);
        if (typeof xhrVal === "function") {
          return xhrVal.bind(target);
        } else {
          return xhrVal;
        }
    }
  }
  public set(target: T, key: string, val: any) {
    return Reflect.set(target, key, val);
  }
  private getOpenData(target: T) {
    return (...args: any) => {
      console.log("aaa", args);
      // 设置请求类型默认值
      const requestMethod = args[0] ? args[0].toUpperCase() : "GET";
      this.reqItemDetail.method = requestMethod;
      this.reqItemDetail.url = args[1];
      this.reqItemDetail.getData = queryRequestData(this.reqItemDetail.url, {});
      this.callback(this.reqItemDetail);
      return Reflect.get(target, "open").apply(target, args);
    };
  }
  // return function，function => return object
  private getSendData(target: T) {
    return (...args: string[]) => {
      const data = getFormattedBody(args[0]);
      this.reqItemDetail.postData = data;
      this.callback(this.reqItemDetail);
      return Reflect.get(target, "send").apply(target, args);
    };
  }
  protected getSetRequestHeader(target: T) {
    return (...args: string[]) => {
      if (!this.reqItemDetail.requestHeader) {
        this.reqItemDetail.requestHeader = {};
      }
      // key 的类型来自约定的类型 keyof
      this.reqItemDetail.requestHeader[args[0] as keyof HeadersInit] = args[1];
      console.log("this.reqItemDetail", this.reqItemDetail);
      this.callback(this.reqItemDetail);
      return Reflect.get(target, "setRequestHeader").apply(target, args);
    };
  }
  protected onreadystatechange() {
    this.reqItemDetail.readyState = this.xmlReq.readyState;
    this.reqItemDetail.responseType = this.xmlReq.responseType;
    this.reqItemDetail.endTime = Date.now();
    this.reqItemDetail.costTime = this.reqItemDetail.endTime -
      this.reqItemDetail.startTime;
    // TODO
    this.reqItemDetail.response = this.reqItemDetail.responseType;
    this.callback(this.reqItemDetail);
  }
}
export class requestProxy {
  // 保持默认方式
  public static origXHR = XMLHttpRequest;
  // 代理ajax的请求
  public static create(callback: Function) {
    return new Proxy(XMLHttpRequest, {
      construct(XHR) {
        const XMLReq = new XHR();
        return new Proxy(XMLReq, new XmlReqHandler(XMLReq, callback));
      },
    });
  }
}
