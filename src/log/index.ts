import { isWindow } from "../utils";
import { writable } from "svelte/store";
interface log {
  type: string;
  logs: any[];
}
type logType = "log" | "info" | "warn" | "error";
class Log {
  public windowLike: boolean;
  public readonly logMthods: logType[] = ["log", "info", "warn", "error"];
  public logList: log[];
  constructor() {
    this.logId = writable({ logs: [] });
    this.windowLike = isWindow(window);
    // console.log("window", this.windowLike);
    this.logList = [];
    this.mockLog();
  }
  private addLog(itemData: log) {
    this.logId.update((store) => {
      store.logs = [];
      return itemData.logs;
    });
  }
  private mockLog() {
    // this.addLog({
    //   type: "log",
    //   logs: [1, 2, 3, 4, 5],
    // });
    //is window
    if (this.windowLike) {
      this.logMthods.forEach((method) => {
        window.console[method] = (...args: any) => {
          window.list = args;
          this.addLog({
            type: method,
            logs: args || [],
          });
        };
      });
    }
  }
}
export default Log;
