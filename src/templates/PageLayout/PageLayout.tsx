import type { LayoutComponent } from "../types";
import { getTitle } from "../../utils";
import { SITE_TITLE } from "../../../config";
import { metadataStore } from "../../metadata";

const Page: LayoutComponent = (props) => {
  const { children, title } = props;

  const { pages, tags } = metadataStore;

  return (
    <html lang="ru">
      <head>
        <title>{getTitle(title)}</title>
      </head>
      <body>
        <header>
          <a href={"/"}>{SITE_TITLE}</a>
          <nav>
            <ul>
              {pages.map((page) => {
                return (
                  <li key={page.link}>
                    <a href={page.link}>{page.title}</a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <ul>
            {tags.map((tag) => {
              return (
                <li key={tag.name}>
                  {tag.name}: {tag.pages.length}
                </li>
              );
            })}
          </ul>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Page;
