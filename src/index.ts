import App from "./App.svelte";
import LogData from "./log/index";
import Network from "./network/index";
// dev 开发调式
const app = new App({ target: document.body });
console.log("app======>", app);
// 事件监听
app.$on("changePanel", (val) => {
  console.log("changePanel--->", val.detail.moduleId);
});

// new LogData();
new Network();
// ================================
export default class AppLog {
  public pluginId: string = "";
  constructor(target?: HTMLElement) {
    this._Init(target);
  }
  // 整个组件初始化
  private _Init(target?: HTMLElement) {
    const app = new App({ target: target || document.documentElement });
    app.$on("changePanel", (val) => {
      this.pluginId = val.detail.moduleId;
    });
    new LogData();
  }
}
