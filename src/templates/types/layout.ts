import type { FunctionComponent, ReactNode } from "react";

export type LayoutComponent = FunctionComponent<{
  children: ReactNode;
  title?: string;
}>;
