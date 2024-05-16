import type { ReactElement } from "react";

type Theme = Record<string, string>;

export abstract class TransformerNode<T = Record<string, unknown>> {
  type: string;
  theme: Theme = {};
  state = {} as T;

  constructor() {
    this.type = "";
  }

  setState(state: T) {
    this.state = state;
    return this;
  }

  setTheme(theme: Theme) {
    this.theme = theme;
    return this;
  }

  get className(): string {
    return this.theme[this.type] ?? this.type;
  }

  public abstract render(): ReactElement;
}
