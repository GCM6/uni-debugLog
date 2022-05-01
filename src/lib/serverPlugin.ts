/**
 * 编译
 */
//  interface Props {
//     data: { [key: string]: number | string }[]
//   }
import { SvelteComponent } from "svelte";
type puginType = "log | network | store ";
export default class ServerPlugin {
  Component: typeof SvelteComponent;
  public id: string;
  // svelte组件类型
  constructor(moduleId: string, component: typeof SvelteComponent) {
    this.id = moduleId;
    this.Component = component;
  }
  //通过插槽形式插入每个插件显示
  public render(cb: Function) {
    const container = document.createElement("div");
    const body = document.getElementsByTagName("body");
    new this.Component({
      target: container,
    });

    body[0].append(container);
    console.log(container);

    cb(container);
  }
  get moduleId() {
    return this.id;
  }
  set moduleId(moduleId: string) {
    this.id = moduleId;
  }
}
