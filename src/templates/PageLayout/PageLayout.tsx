import { type PropsWithChildren } from "react";

export default function Page(props: PropsWithChildren) {
  const { children } = props;

  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
