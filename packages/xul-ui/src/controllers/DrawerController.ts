import { singleton, singletons } from "@xul/core";
import { action, reduce, state } from "@xul/redux";
import { noopState } from "./NoopState";

@singleton()
@noopState(`session.drawer`)
export class DrawerController {
  @state("open")
  public open: boolean;

  public openDrawer() {
    this.change(true);
  }

  public closeDrawer() {
    this.change(false);
  }

  @action()
  public change(open: boolean) {
    return { open };
  }

  @reduce()
  public onChange(s: any, { open }: { open: boolean }) {
    return { ...s, open };
  }
}

export const drawerController: DrawerController = singletons.get(DrawerController);
