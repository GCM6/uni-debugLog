import App from "./App.svelte";
import Log from "./log/index";
const log = new Log();
log.init();
// dev 开发调式
const compInstance = new App({ target: document.body });
setTimeout(() => {
  compInstance.testList = { test: "change" };
}, 1000);
console.log(compInstance);

export default class AppLog {
  constructor(target?: HTMLElement) {
    console.log("这个方法执行了");

    this._Init(target);
  }
  // 整个组件初始化
  private _Init(target?: HTMLElement) {
    console.log("执行了");
    new App({ target: target || document.documentElement });
  }
}
