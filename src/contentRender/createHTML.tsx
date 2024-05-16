import { renderToString } from "react-dom/server";
import { Fragment, type ReactElement } from "react";
import type { LayoutComponent } from "../templates/types";

export function createHTML(layout: LayoutComponent, content: ReactElement[]) {
  const Layout = layout;

  return renderToString(
    <Layout>
      {content.map((el, index) => {
        return <Fragment key={index}>{el}</Fragment>;
      })}
    </Layout>
  );
}
