import { isWindow } from "../utils";
import { LogStore as Store, Losgs } from "../lib/store";
import { requestProxy } from "./request.proxy";
import { NetworkItemDetail } from "./requestItemDetail";
class networkModelFactory {
  constructor() {
    Store.create("network");
    this.mockXHRData();
  }
  private mockXHRData() {
    if (!isWindow(window)) return;
    window.XMLHttpRequest = requestProxy.create(
      (reqItem: NetworkItemDetail) => {
        console.log("劫持的request", reqItem);
      },
    );
  }
}
export default networkModelFactory;
