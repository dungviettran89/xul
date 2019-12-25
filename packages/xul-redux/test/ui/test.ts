import { customElement, LitElement, property } from "lit-element";
import { html } from "lit-html";
import { litState, state } from "../../src/Index";
import { LOGGER } from "../../src/Logger";
import { enableHashStateStore } from "../../src/store/HashStateStore";
import { enableLocalStateStore } from "../../src/store/LocalStateStore";
import { enableSessionStateStore } from "../../src/store/SessionStateStore";
import { testService } from "./TestService";
export { context } from "@xul/core";

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
      <button @click=${e => testService.increase(this.localValue)}>Click me</button>
      <h2>Session ${this.sessionValue}</h2>
      <button @click=${e => testService.increaseSession(this.sessionValue)}>Click me</button>
      <h2>Hash ${this.hashValue}</h2>
      <button @click=${e => testService.increaseHash(this.hashValue)}>Click me</button>
    `;
  }
}
document.getElementById("app").innerHTML = `
<test-component heading="Hello world"></test-component>
`;
