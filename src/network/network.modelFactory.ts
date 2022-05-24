import { isWindow } from "../utils";
import { LogStore as Store, Losgs } from "../lib/store";
import { requestProxy } from "./request.proxy";
import { NetworkItemDetail } from "./requestItemDetail";
import { get, writable } from "svelte/store";
// Store初始化
const requestItemList = writable<{ [reqId: string]: NetworkItemDetail }>({});
class networkModelFactory {
  constructor() {
    Store.create("network");
    this.mockXHRData();
  }
  // 设置为空
  public clearReqLog() {
    requestItemList.set({});
  }
  private mockXHRData() {
    if (!isWindow(window)) {
      // 没有window的情况
    } else {
      window.XMLHttpRequest = requestProxy.create(
        (reqItem: NetworkItemDetail) => {
          console.log("劫持的request", reqItem);
          this.updateNetworkData(reqItem.id, reqItem);
        },
      );
    }
  }
  private updateNetworkData<T extends NetworkItemDetail>(id: string, data: T) {
    const reqMap = get(requestItemList);
    const reqItem = reqMap[id];
    console.log(id, 13);
    const reqId = !!data[id as keyof typeof data]; //转化为boolean
    // 如果是同一个请求
    if (reqId) {
      // 更新这个的请求的状态
      // for (const key in data) {
      //   reqItem[key as keyof typeof data] = data[key]
      // }
      // data = reqItem
    }
    requestItemList.update((store) => {
      store[id] = data;
      return store;
    });
  }
}
export default networkModelFactory;
