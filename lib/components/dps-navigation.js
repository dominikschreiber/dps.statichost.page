import css from "./dps-navigation.css" with { type: "css" };
import data from "./dps-navigation.data.json" with { type: "json" };

document.adoptedStyleSheets.push(css);

export default class DPSNavigation extends HTMLElement {
  connectedCallback() {
    const currentHref = location.pathname;
    Object.entries(data.items).forEach(([href, textContent]) => {
      const a = document.createElement("a");
      a.href = href;
      a.textContent = textContent;
      if (currentHref === href) {
        a.classList.add("active");
      }
      this.appendChild(a);
    });
  }
}

window.customElements.define("dps-navigation", DPSNavigation);
