import ServerPlugin from "../lib/serverPlugin";
import LogModelFactory from "./log.modelFactory";
import logComponent from "./log.svelte";
const model = new LogModelFactory();
class Log extends ServerPlugin {
  constructor() {
    super("log", logComponent);
    model.watchLog();
  }
  init() {
    super.render(() => {});
  }
}
export default Log;
