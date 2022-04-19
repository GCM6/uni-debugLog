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
  public render(cb: Function) {
    const div = document.createElement("div");
    new this.Component({
      target: div,
    });
    console.log("zheg", div);

    cb(div);
  }
  get moduleId() {
    return this.id;
  }
  set moduleId(moduleId: string) {
    this.id = moduleId;
  }
}
