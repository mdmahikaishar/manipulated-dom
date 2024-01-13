type StyleObject = Partial<CSSStyleDeclaration>;
type StyleKeys = keyof CSSStyleDeclaration | string;
type EventObject = HTMLElementEventMap;
type EventKeys = keyof HTMLElementEventMap;
type MDomElement = MDom | Node | string;

export default class MDom {
  private $ele: any = {};

  /**
   * MDom
   * ---
   * ```ts
   * const $box = new MDom(".box");
   * ```
   */
  public constructor(selector: string) {
    if (selector) {
      this.$ele = document.querySelector(selector);
    }
  }

  private getAttr(key: string): string | null {
    return this.$ele.getAttribute(key);
  }
  private setAttr(key: string, value: any) {
    this.$ele.setAttribute(key, value);
  }
  /**
   * Attribute
   * ---------
   * ```ts
   * // set attribute
   * $body.attr("hello", "world");
   * // set multipule attributes
   * $body.attr({ id: "001" });
   * // get attribute
   * $body.attr("hello"); // "world"
   * ```
   */
  public attr(
    key: string | Record<string, any>,
    value?: any
  ): string | null | undefined {
    if (typeof key === "string") {
      if (!value) return this.getAttr(key);

      this.setAttr(key, value);
      return;
    }

    Object.entries(key).forEach((data) => {
      this.setAttr(data[0], data[1]);
    });
  }

  private getStyle(key: StyleKeys): any {
    return this.$ele.style[key];
  }
  private setStyle(key: StyleKeys, value: any) {
    this.$ele.style[key] = value;
  }
  /**
   * Style Sheet
   * ---------
   * ```ts
   * // set style
   * $body.attr("width", "10rem");
   * // set multipule styles
   * $body.attr({ height: "15rem" });
   * // get style
   * $body.attr("width"); // 10rem
   * ```
   */
  public style(
    key: StyleKeys | StyleObject,
    value?: string | any
  ): string | undefined {
    if (typeof key === "string") {
      if (!value) return this.getStyle(key as any);

      this.setStyle(key as any, value);
      return;
    }

    Object.entries(key).forEach((data) => {
      this.setStyle(data[0] as any, data[1]);
    });
  }

  /**
   * Show Element
   * ----
   * ```ts
   * const $name = MDom.create("p");
   * $name.show();
   * ```
   */
  public show() {
    this.setStyle("display", "block");
  }
  /**
   * Hide Element
   * ----
   * ```ts
   * const $name = MDom.create("p");
   * $name.hide();
   * ```
   */
  public hide() {
    this.setStyle("display", "none");
  }

  /**
   * Event Listener
   * ----
   * ```ts
   * const $button = MDom.create("button");
   * $button.on("click", () => console.log("Clicked"));
   * ```
   */
  public on(
    event: EventKeys,
    callback: (this: any, event: EventObject[EventKeys]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    this.$ele.addEventListener(event, callback as any, options);
  }

  /**
   * Parent
   * ------
   * ```ts
   * const $box = MDom.create("div");
   * $body.child([$box]);
   * $box.parent();
   * ```
   */
  public parent(): Element | null {
    return this.$ele.parentElement;
  }

  /**
   * Remove
   * ------
   * ```ts
   * const $box = MDom.create("div");
   * $box.remove();
   * ```
   */
  public remove() {
    this.$ele.remove();
  }

  /**
   * ReplaceWith
   * ------
   * ```ts
   * const $box = MDom.create("div");
   * const $container = MDom.create("div");
   * $box.replace($container);
   * ```
   */
  public replace(element: MDomElement) {
    if (typeof element === "object" && "$ele" in element) {
      this.$ele.replaceWith(element.$ele);
    }

    this.$ele.replaceWith(Element);
  }

  private addChild(child: MDomElement) {
    if (typeof child === "object" && "$ele" in child) {
      return this.$ele.appendChild(child.$ele);
    }
    this.$ele.append(child);
  }
  /**
   * Children
   * ------
   * ```ts
   * const $box = MDom.create("div");
   * // get all childrens
   * $body.child();
   * // add child
   * $body.child([document.createElement("div")]);
   * // add multiple childs
   * $body.child([MDom.create("div"), $box]);
   * ```
   */
  public child(content?: MDomElement[]): Element[] | void {
    if (!content) return [...this.$ele.children];

    content.forEach((childEle) => {
      this.addChild(childEle);
    });
  }

  /**
   * HTML
   * ---------
   * ```ts
   * // set html
   * $body.html("<h1>Hello</h1>");
   * // get html
   * $body.html(); // "<h1>Hello</h1>"
   * ```
   */
  public html(content?: string): string | void {
    if (!content) return this.$ele.innerHTML;
    this.$ele.innerHTML = content;
  }

  /**
   * Text
   * ---------
   * ```ts
   * // set text
   * $body.txt("Hello");
   * // get text
   * $body.txt(); // "Hello"
   * ```
   */
  public txt(content?: string): string | void {
    if (!content) return this.$ele.innerText;
    this.$ele.innerText = content;
  }

  /**
   * CreateElement
   * ---------
   * ```ts
   * const $body = MDom.create("body");
   * ```
   */
  public static create(tagName: keyof HTMLElementTagNameMap): MDom {
    const dom = new MDom("");
    dom.$ele = document.createElement(tagName);
    return dom;
  }
  /**
   * CreateText
   * ---------
   * ```ts
   * const $name = MDom.createTxt("hello");
   * ```
   */
  public static createTxt(text: string): MDom {
    const dom = new MDom("");
    dom.$ele = document.createTextNode(text);
    return dom;
  }

  public toString(): string {
    return `${this.$ele || "<Empty MDom>"}`;
  }
}
