import type { LayoutComponent } from "../types";
import { getTitle } from "../../utils";

const Page: LayoutComponent = (props) => {
  const { children, title } = props;

  return (
    <html lang="ru">
      <head>
        <title>{getTitle(title)}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default Page;
