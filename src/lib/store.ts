import { Writable, writable } from "svelte/store";
export interface Losgs {
  type: string;
  logs: any;
}
interface Store {
  logList: Losgs[];
}
export default class LogStore {
  public storeDataMap: { [moduleId: string]: Writable<Store> };
  constructor() {
    this.storeDataMap = {};
  }
  //   为每个模块插件仓库
  public create(moduleId: string) {
    if (!this.storeDataMap[moduleId]) {
      this.storeDataMap[moduleId] = writable<Store>({ logList: [] });
    }
    return this.storeDataMap[moduleId];
  }
  //   获取模块对应的数据
  public getStore(moduleId: string) {
    return this.storeDataMap[moduleId];
  }
}
