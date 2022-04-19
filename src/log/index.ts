import ServerPlugin from "../lib/serverPlugin";
import logComponent from "./log.svelte";

class Log extends ServerPlugin {
  constructor() {
    super("log", logComponent);
  }
  init() {
    super.render(() => {});
  }
}
export default Log;
