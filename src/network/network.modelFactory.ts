import { isWindow } from "../utils";
import { requestProxy } from "./request.proxy";
import { NetworkItemDetail } from "./requestItemDetail";
import { get, writable } from "svelte/store";
// Store初始化
export const requestItemList = writable<Record<string, NetworkItemDetail>>({});
export class NetworkModelFactory {
  constructor() {
    this.mockXHRData();
  }
  // 设置为空
  public static clearReqLog() {
    requestItemList.set({});
  }
  private mockXHRData() {
    if (!isWindow(window)) {
      // 没有window的情况
    } else {
      window.XMLHttpRequest = requestProxy.create(
        (reqItem: NetworkItemDetail) => {
          this.updateNetworkData(reqItem.id, reqItem);
        },
      );
    }
  }
  private updateNetworkData(id: string, data: NetworkItemDetail) {
    const reqMap = get(requestItemList);
    console.log("reqMap----->", reqMap);
    let reqItem = reqMap[id];
    const reqId = !!data[id as keyof typeof data]; //转化为boolean
    // 如果是同一个请求
    if (reqId) {
      // 更新这个的请求的状态
      reqItem = { ...reqItem, ...data }; //这才是最优解
      // let key: keyof NetworkItemDetail;
      // for (key in data) {
      //   if (reqItem.hasOwnProperty(key)) {//这里检查有没有这个key，就安全了
      //     // 因为reqItem【key】不同的key可能出现不同的类型，没有交集，就出现never了
      //     // 你看这个页面上基本上都是放到等号的右边，等号左边用key索引才会出现never，
      //     // 这里转成any，
      //     (reqItem as any)[key] = data[key];
      //   }
      // }
      data = reqItem;
    }
    requestItemList.update((store) => {
      store[id] = data;
      return store;
    });
  }
}
