// ================================================================== //
// label-input - Label and Input tag set
// ================================================================== //

class LabelInput extends HTMLElement {
  constructor() {
    super(); // 상위 클래스의 생성자 호출
    const shadow = this.attachShadow({ mode: "closed" });
    this.shadow = shadow;
  }

  connectedCallback() {
    const style = document.createElement("style");
    style.textContent = `
      div {
        width: 300px;
        display: flex;
        gap: 5px;
        flex-direction: column;
        align-items: flex-start;
        margin: 6px;
      }
      label {
        margin-right: 10px;
        font-size: 1.1rem;
      }
      input {
        border: 1px solid;
        border-radius: 4px;
        height: 18px;
        width: 100%;
      }
    `;
    this.shadow.appendChild(style);
  }

  static get observedAttributes() {
    return ["input-name"];
  }

  attributeChangedCallback() {
    this._render();
  }

  get id() {
    return this.getAttribute("input-id");
  }

  get name() {
    return this.getAttribute("input-name");
  }

  _render() {
    if (this.shadow.querySelector("div")) {
      this.shadow.removeChild(this.shadow.querySelector("div"));
    }
    const $div = document.createElement("div");
    const $label = document.createElement("label");
    $label.innerText = `${this.name}을 입력하세요!`;
    $label.setAttribute("for", this.id);

    const $input = document.createElement("input");
    $input.setAttribute("type", "text");
    $input.setAttribute("id", this.id);

    $div.appendChild($label);
    $div.appendChild($input);
    this.shadow.appendChild($div);
  }
}
customElements.define("label-input", LabelInput);

// ================================================================== //
// custom-btn - Full Customed Button Tag
// ================================================================== //

class MyCustomButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    button.innerText = this.getAttribute("text") || "Click Me"; // 기본 텍스트 설정
    button.addEventListener("click", () => {
      alert("Button was clicked!");
    });

    const style = document.createElement("style");
    style.textContent = `
      button {
        background-color: #007bff;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
    `;
    shadow.appendChild(style);
    shadow.appendChild(button);
  }
}

customElements.define("custom-btn", MyCustomButton);
