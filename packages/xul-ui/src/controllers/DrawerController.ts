import { singleton } from "@xul/core";
import { reactState, state } from "@xul/redux";

@singleton()
@reactState(`session.drawer`)
export class DrawerController {
  @state("open")
  private open: boolean;
}
