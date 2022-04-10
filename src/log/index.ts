import { isWindow } from "../utils";
import LogElenemt from './log.svelte'
import { SvelteComponent } from 'svelte'
class Log {
  public windowLike: boolean;
  SvelteComp: typeof SvelteComponent;

  constructor() {
    this.windowLike = isWindow(window);
    this.SvelteComp = LogElenemt;
    console.log("window", this.windowLike);
    
  }
  onReady() {
    // new this.SvelteComp({
    //   target: document.body,
    //   props: {
    //     name: 'page1'
    //   }
    // })
  }

}
export default Log
