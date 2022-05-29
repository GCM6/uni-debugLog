import ServerPlugin from "../lib/serverPlugin";
import networkComponent from "./network.svelte";
import { NetworkModelFactory } from "./network.modelFactory";

class AppNetWork extends ServerPlugin {
  constructor() {
    super("network", networkComponent);
    this.initNetWork();
    new NetworkModelFactory();
  }
  private initNetWork() {
    super.render((el: Element) => {
      console.log(el);
    });
  }
}
export default AppNetWork;
