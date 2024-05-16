import { SITE_TITLE } from "../../config";

export function getTitle(subtitle?: string): string {
  if (!subtitle) {
    return SITE_TITLE;
  }

  return `${subtitle} — ${SITE_TITLE}`;
}
