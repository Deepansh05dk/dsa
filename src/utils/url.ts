/**
 * Resolves an internal application path with Astro's configured BASE_URL.
 * Supports running at root in dev or under a subpath like /dsa on GitHub Pages.
 */
export function getUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (!cleanBase) {
    return cleanPath;
  }
  return `${cleanBase}${cleanPath}`;
}
