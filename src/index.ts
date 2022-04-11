import App from "./App.svelte";
// dev 开发调式
new App({ target: document.body });
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
