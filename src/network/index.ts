import ServerPlugin from "../lib/serverPlugin";
import networkComponent from "./network.svelte";
import networkModelFactory from "./network.modelFactory";

class AppNetWork extends ServerPlugin {
  constructor() {
    super("network", networkComponent);
    this.initNetWork();
    new networkModelFactory();
  }
  private initNetWork() {
    super.render((el: Element) => {
      console.log(el);
    });
  }
}
export default AppNetWork;
