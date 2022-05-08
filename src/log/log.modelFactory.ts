/**
 * 生产数据工厂
 */
import { isWindow } from "../utils";
import { LogStore as Store, Losgs } from "../lib/store";
// 针对这几种类型
type logType = "log" | "info" | "warn" | "error";
class LogModelFactory {
  // 是否window
  public windowLike: boolean;
  // 只读类型
  public readonly logMthods: logType[] = ["log", "info", "warn", "error"];
  public origLog: { [methods: string]: any } = {};
  constructor() {
    // 数据存储仓创建
    Store.create("log");
    this.windowLike = isWindow(window);
    // console.log("window", this.windowLike);
  }
  private addLog(itemData: Losgs) {
    // 数据更新存储
    Store.getStore("log").update((store) => {
      store.logList.push(itemData);
      return store;
    });
    this.origLogMethods(itemData.type, itemData.logs);
  }
  public watchLog() {
    // this.addLog({
    //   type: "log",
    //   logs: [1, 2, 3, 4, 5],
    // });
    //is window
    this.logMthods.forEach((methods) => {
      this.origLog[methods] = window.console[methods];
    });
    if (this.windowLike) {
      this.logMthods.forEach((method) => {
        window.console[method] = (args: any) => {
          this.addLog({
            type: method,
            logs: args,
          });
        };
      });
    } else {
      // 没有window对象的情况下
      this.notWindowObj();
    }
  }
  // 恢复控制台打印
  origLogMethods(method: string, ...args: any) {
    if (typeof this.origLog[method] === "function") {
      this.origLog[method].apply(window.console, args);
    }
  }
  notWindowObj() {
    const consoleMap = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error,
    };
    this.logMthods.forEach((method) => {
      console[method] = (args) => {
        this.addLog({
          type: method,
          logs: args,
        });
        consoleMap[method](args);
      };
    });
  }
}
export default LogModelFactory;
