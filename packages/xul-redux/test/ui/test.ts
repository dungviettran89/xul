import { customElement, LitElement, property } from "lit-element";
import { html } from "lit-html";
import { litState, state } from "../../src/Index";
import { LOGGER } from "../../src/Logger";
import { enableHashStateStore } from "../../src/store/HashStateStore";
import { enableLocalStateStore } from "../../src/store/LocalStateStore";
import { enableSessionStateStore } from "../../src/store/SessionStateStore";
import { testController } from "./TestController";
export { context } from "@xul/core";
import { scopedController, ScopedController } from "./ScopedController";
LOGGER.level = "debug";
@enableHashStateStore()
@enableLocalStateStore()
@enableSessionStateStore()
@customElement("test-component")
@litState()
class TestComponent extends LitElement {
  @state(`hash.value`, 0)
  @property()
  public hashValue: number;

  @state(`local.value`, 0)
  @property()
  public localValue: number;

  @state(`session.value`, 0)
  @property()
  public sessionValue: number;

  public render() {
    return html`
      <h2>Local ${this.localValue}</h2>
      <button @click=${e => testController.increase(this.localValue)}>Click me</button>
      <h2>Session ${this.sessionValue}</h2>
      <button @click=${e => testController.increaseSession(this.sessionValue)}>Click me</button>
      <h2>Hash ${this.hashValue}</h2>
      <button @click=${e => testController.increaseHash(this.hashValue)}>Click me</button>
      <h2>Scoped Hash ${scopedController.value}</h2>
      <button @click=${e => scopedController.increase()}>Click me</button>
    `;
  }
}
document.getElementById("app").innerHTML = `
<test-component heading="Hello world"></test-component>
`;
