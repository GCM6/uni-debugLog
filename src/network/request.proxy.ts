import {
  getFormattedBody,
  NetworkItemDetail,
  queryRequestData,
  responseParse,
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
      this.onReadyStateChange();
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
    switch (key) {
      case "onreadystatechange":
        return this.setOnReadyStateChange(target, key, val);
    }
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
  protected onReadyStateChange() {
    this.reqItemDetail.readyState = this.xmlReq.readyState;
    this.reqItemDetail.responseType = this.xmlReq.responseType;
    this.reqItemDetail.endTime = Date.now();
    this.reqItemDetail.costTime = this.reqItemDetail.endTime -
      this.reqItemDetail.startTime;
    // 根据状态设置值
    this.updateReqItemReadyState();
    this.reqItemDetail.response = responseParse(
      this.reqItemDetail.responseType,
      this.xmlReq.response,
    );
    this.callback(this.reqItemDetail);
  }
  protected setOnReadyStateChange(target: T, key: string, value: any) {
    return Reflect.set(target, key, (...args: any[]) => {
      this.onReadyStateChange();
      value.apply(target, args);
    });
  }
  protected updateReqItemReadyState() {
    switch (this.xmlReq.readyState) {
      case 0:
        // 初始化状态
        this.reqItemDetail.status = 0;
        this.reqItemDetail.statusText = "Pending";
        // 初始化开始时间
        if (!this.reqItemDetail.startTime) {
          this.reqItemDetail.startTime = Date.now();
        }
        break;
      case 1:
        // 初始化状态
        this.reqItemDetail.status = 0;
        this.reqItemDetail.statusText = "Pending";
        // 初始化开始时间
        if (!this.reqItemDetail.startTime) {
          this.reqItemDetail.startTime = Date.now();
        }
        break;
      case 2:
        this.reqItemDetail.status = this.xmlReq.status;
        this.reqItemDetail.statusText = "Loading";
        const reqHeader: string = this.xmlReq.getAllResponseHeaders() || "";
        const headerList: string[] = reqHeader.split("\n");
        // 组合header
        for (let index = 0; index < headerList.length; index++) {
          const line = headerList[index];
          if (!line) continue;
          const arr = line.split(": ");
          const key = arr[0];
          const value = arr.slice(1).join(": ");
          this.reqItemDetail.header[key] = value;
        }
        break;
      case 3:
        this.reqItemDetail.status = this.xmlReq.status;
        this.reqItemDetail.statusText = "Loading";
        if (!!this.xmlReq.response && this.xmlReq.response?.length) {
          this.reqItemDetail.responseSize = this.xmlReq.response?.length;
        }
        break;
      case 4:
        this.reqItemDetail.status = this.xmlReq.status ||
          this.reqItemDetail.status || 0;
        this.reqItemDetail.statusText = String(this.reqItemDetail.status);
        this.reqItemDetail.endTime = Date.now();
        this.reqItemDetail.costTime = this.reqItemDetail.endTime -
          (this.reqItemDetail.startTime || Date.now());
        this.reqItemDetail.response = this.xmlReq.response;
        if (!!this.xmlReq.response && this.xmlReq.response?.length) {
          this.reqItemDetail.responseSize = this.xmlReq.response?.length;
        }
        break;
      default:
        this.reqItemDetail.status = this.xmlReq.status;
        this.reqItemDetail.statusText = "Unknown";
        break;
    }
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
