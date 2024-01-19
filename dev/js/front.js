import G_G from "./libs/G_G.js";
import { G_Bus } from "./libs/G_Control.js";
class Front extends G_G{
  constructor(){
    super();
    const _ = this;
    // G_Bus
  }
  define(){
    const _ = this;
    _.componentName = 'front';
  }
}
new Front();