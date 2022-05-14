import { NetworkItemDetail, queryRequestData } from "./requestItemDetail";
// 泛型约束
class XmlReqHandler<T extends XMLHttpRequest> {
  private reqItemDetail: NetworkItemDetail;
  public callback: Function;
  constructor(xhr: XMLHttpRequest, callback: Function) {
    this.reqItemDetail = new NetworkItemDetail();
    this.callback = callback;
  }
  public get(target: T, key: string) {
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
      console.log("args", args);
      // 设置请求类型默认值
      const requestMethod = args[0] ? args[0].toUpperCase() : "GET";
      this.reqItemDetail.method = requestMethod;
      this.reqItemDetail.url = args[1];
      this.reqItemDetail.getData = queryRequestData(this.reqItemDetail.url, {});
      this.callback(this.reqItemDetail);
      return Reflect.get(target, "open");
    };
  }
  private getSendData(target: T) {
  }
  private getSetRequestHeader(target: T) {
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
