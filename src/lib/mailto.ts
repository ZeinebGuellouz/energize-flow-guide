import { SITE } from "./site";

/**
 * Builds a mailto: URL that opens the user's email client pre-filled
 * with the reservation details, addressed to the studio inbox.
 */
export const buildMailto = ({
  subject,
  bodyLines,
}: {
  subject: string;
  bodyLines: Array<string | [string, string | undefined | null]>;
}) => {
  const lines = bodyLines
    .map((entry) => {
      if (typeof entry === "string") return entry;
      const [label, value] = entry;
      if (value === undefined || value === null || value === "") return null;
      return `${label} : ${value}`;
    })
    .filter((l): l is string => l !== null)
    .join("\n");

  const params = new URLSearchParams({
    subject,
    body: lines,
  });
  // URLSearchParams encodes spaces as "+" — mail clients prefer %20.
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${SITE.email}?${query}`;
};

export const openMailto = (url: string) => {
  // Use location.href so it works across browsers/in-app webviews.
  window.location.href = url;
};