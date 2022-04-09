import { isWindow } from "../utils";
class Log {
  public windowLike: boolean;
  constructor() {
    this.windowLike = isWindow(window);
    console.log("window", this.windowLike);
  }
}
export default Log
