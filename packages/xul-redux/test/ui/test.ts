import {html} from "lit-html";
import {customElement, LitElement, property} from "lit-element";
import {reduxStore} from "../../src/ReduxStore";

@customElement("test-component")
class TestComponent extends LitElement {
    @property()
    heading: string = "test";

    render() {
        return html`
      <h2>${this.heading}</h2>
    `;
    }
}

console.log(`reduxStore`, reduxStore);
export default TestComponent;
document.getElementById("app").innerHTML = `
<test-component heading="Hello world"></test-component>
`;