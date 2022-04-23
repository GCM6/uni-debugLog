import { Writable, writable } from "svelte/store";
export interface Losgs {
  type: string;
  logs: any;
}
interface Store {
  logList: Losgs[];
}
export class LogStore {
  //设置为静态类型让外面构造函数直接调用
  // 初始化
  public static storeDataMap: { [moduleId: string]: Writable<Store> } = {};
  //   为每个模块插件仓库
  public static create(moduleId: string) {
    if (!this.storeDataMap[moduleId]) {
      this.storeDataMap[moduleId] = writable<Store>({ logList: [] });
    }
    return this.storeDataMap[moduleId];
  }
  //   获取模块对应的数据
  public static getStore(moduleId: string) {
    return this.storeDataMap[moduleId];
  }
  // 清理log
  public static clearStore(moduleId: string) {
    console.log("chufa");

    if (this.storeDataMap[moduleId]) {
      this.storeDataMap[moduleId].update((store) => {
        store.logList = [];
        return store;
      });
    }
  }
}
