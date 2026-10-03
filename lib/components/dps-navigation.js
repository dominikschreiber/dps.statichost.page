import css from "./dps-navigation.css" with { type: "css" };
import sitemap from "../../sitemap.tokens.json" with { type: "json" };
import { toFlattened } from "../tokens.js";

document.adoptedStyleSheets.push(css);

export default class DPSNavigation extends HTMLElement {
  connectedCallback() {
    const { pathname } = location;
    const flat = toFlattened(sitemap);
    for (const [href, { $value }] of Object.entries(flat)) {
      const depth = href.replaceAll(/[^\/]/g, "").length;
      while (this.childElementCount < depth) {
        const div = document.createElement("div");
        this.appendChild(div);
      }
      const siblingPrefix = href.replace(/(\/[^\/]*){1,2}$/, "");
      if (pathname.startsWith(siblingPrefix)) {
        const parent = this.children[depth - 1];
        const a = document.createElement("a");
        a.textContent = $value;
        a.href = href;
        const thisPrefix = href.replace(/\/[^\/]*$/, "");
        if (pathname.startsWith(thisPrefix)) {
          a.classList.add("active");
        }
        parent.appendChild(a);
      }
      if (pathname === href) {
        document.title = `${$value} | Dominik Schreiber`;
      }
    }
  }
}

window.customElements.define("dps-navigation", DPSNavigation);
