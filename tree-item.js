const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: block;
      margin: 10px 0;
      padding-left: 20px;
      font-family: Arial, sans-serif;
      line-height: 1.6;
      cursor: pointer;
      transition: color 0.3s;
    }
    :host:hover {
      color: #555;
    }
    :host > span::before {
      content: "▶";
      display: inline-block;
      margin-right: 10px;
    }
    :host([expanded]) > span::before {
      content: "▼";
    }
    :host([leaf]) > span::before {
      content: "•";
      color: #888;
    }
    div {
      display: none;
      margin-top: 5px;
    }
    :host([expanded]) div {
      display: block;
    }
    span {
      font-size: 16px;
    }
    :host([leaf]) span {
      font-size: 14px;
      font-style: italic;
      color: #666;
    }
  </style>
  <span><slot></slot></span>
  <div>
    <slot name="children"></slot>
  </div>
`;

class TreeItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.addEventListener("click", this.toggle.bind(this));
  }

  connectedCallback() {
    const hasChildren = this.querySelector("tree-item");
    if (!hasChildren) {
      this.setAttribute("leaf", "");
    }
  }

  toggle(e) {
    if (e.target === this) {
      this.toggleAttribute("expanded");
    }
  }
}

customElements.define("tree-item", TreeItem);
