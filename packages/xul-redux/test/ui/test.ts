import { customElement, LitElement, property } from "lit-element";
import { html } from "lit-html";
import { litState, state } from "../../src/Index";
import { LOGGER } from "../../src/Logger";
import { testService } from "./TestService";

LOGGER.level = "debug";

@customElement("test-component")
@litState()
class TestComponent extends LitElement {
  @state(`value`, 0)
  @property()
  public value: number;

  public render() {
    return html`
      <h2>${this.value}</h2>
      <button @click=${e => testService.increase(this.value)}>Click me</button>
    `;
  }
}

document.getElementById("app").innerHTML = `
<test-component heading="Hello world"></test-component>
`;
