const DEFAULT_SITE_URL = "https://www.edvolvefoundation.org";

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.AUTH_URL || DEFAULT_SITE_URL;

  try {
    const url = new URL(configuredUrl);
    return `${url.protocol}//${url.host}`;
  } catch {
    return DEFAULT_SITE_URL;
  }
}
