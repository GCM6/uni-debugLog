import App from "./App.svelte";
import Log from "./log/index";
const log = new Log();
log.init();
// dev 开发调式
new App({ target: document.body });

export default class AppLog {
  constructor(target?: HTMLElement) {
    this._Init(target);
  }
  // 整个组件初始化
  private _Init(target?: HTMLElement) {
    new App({ target: target || document.documentElement });
  }
}
