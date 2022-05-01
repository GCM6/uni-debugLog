import ServerPlugin from "../lib/serverPlugin";
import LogModelFactory from "./log.modelFactory";
import logComponent from "./log.svelte";
const model = new LogModelFactory();
class Log extends ServerPlugin {
  constructor() {
    super("log", logComponent);
    model.watchLog();
    this.id = "los";
    console.log(12333, this.id);
  }
  init() {
    console.log("super----》", this);

    super.render((el: Element) => {
      console.log("1111", el);
    });
  }
}
export default Log;
