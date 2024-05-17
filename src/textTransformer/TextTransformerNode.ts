import type { ReactElement } from "react";
import type {
  TextTransformerNodeTheme,
  TextTransformerNodeType,
} from "./types.ts";

export abstract class TextTransformerNode<T = Record<string, unknown>> {
  type = "" as TextTransformerNodeType;
  theme = {} as TextTransformerNodeTheme;
  state = {} as T;

  setState(state: T) {
    this.state = state;
    return this;
  }

  setTheme(theme: TextTransformerNodeTheme) {
    this.theme = theme;
    return this;
  }

  get className(): string {
    return this.theme[this.type] ?? this.type;
  }

  public abstract render(): ReactElement;
}
