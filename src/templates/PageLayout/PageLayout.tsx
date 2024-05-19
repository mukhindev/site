import type { LayoutComponent } from "../types";
import { getTitle } from "../../utils";
import { SITE_TITLE } from "../../../config";

const Page: LayoutComponent = (props) => {
  const { children, title } = props;

  return (
    <html lang="ru">
      <head>
        <title>{getTitle(title)}</title>
        <nav>
          <ul>
            <li>
              <a>1</a>
              <a>2</a>
              <a>3</a>
            </li>
          </ul>
        </nav>
      </head>
      <body>
        <header>{SITE_TITLE}</header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Page;
