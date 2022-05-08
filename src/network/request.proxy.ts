import { NetworkItemDetail } from "./requestItemDetail";
export class requestProxy {
  // 保持默认方式
  public static origXHR = XMLHttpRequest;
  // 代理ajax的请求
  public static create(callback: Function) {
    return new Proxy(XMLHttpRequest, {
      construct(XHR) {
        const XMLReq = new XHR();
        console.log("----------->", XMLReq);
        // TODO
        return XMLReq;
      },
    });
  }
}
