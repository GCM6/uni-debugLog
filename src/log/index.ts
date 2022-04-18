import { isWindow } from "../utils";
import { Writable, writable } from "svelte/store";
interface log {
  type: string;
  logs: any[];
}
interface logs {
  logs: log[];
}
type logType = "log" | "info" | "warn" | "error";
class Log {
  public windowLike: boolean;
  public readonly logMthods: logType[] = ["log", "info", "warn", "error"];
  public logId: Writable<logs>;
  constructor() {
    this.logId = writable<logs>({ logs: [] });
    this.windowLike = isWindow(window);
    // console.log("window", this.windowLike);
    this.mockLog();
  }
  public get() {
    return this.logId;
  }
  private addLog(itemData: log) {
    this.logId.update((store) => {
      store.logs.push(itemData);
      return store;
    });
    console.log();
  }
  private mockLog() {
    this.addLog({
      type: "log",
      logs: [1, 2, 3, 4, 5],
    });
    //is window
    if (this.windowLike) {
      this.logMthods.forEach((method) => {
        // window.console[method] = (...args: any) => {
        //   this.addLog({
        //     type: method,
        //     logs: args || [],
        //   });
        // };
      });
    }
  }
}
export default Log;
