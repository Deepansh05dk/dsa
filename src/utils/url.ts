/**
 * Resolves an internal application path with Astro's configured BASE_URL.
 * Supports running at root in dev or under a subpath like /dsa on GitHub Pages.
 * Ensures directory/page routes always include a trailing slash to prevent
 * GitHub Pages 301 redirects and Service Worker navigation interception issues.
 */
export function getUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  let cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Check if path has an anchor/hash or query string
  const hashIndex = cleanPath.indexOf('#');
  const queryIndex = cleanPath.indexOf('?');
  let suffix = '';

  if (hashIndex !== -1 || queryIndex !== -1) {
    const splitIndex =
      hashIndex !== -1 && queryIndex !== -1
        ? Math.min(hashIndex, queryIndex)
        : hashIndex !== -1
        ? hashIndex
        : queryIndex;
    suffix = cleanPath.slice(splitIndex);
    cleanPath = cleanPath.slice(0, splitIndex);
  }

  // Check if it's a file with an extension (e.g. .svg, .png, .js, .json, .webmanifest)
  const isFile = /\.[a-zA-Z0-9]+$/.test(cleanPath);

  // If it's a directory/route and doesn't end with slash, append trailing slash
  if (!isFile && !cleanPath.endsWith('/')) {
    cleanPath = `${cleanPath}/`;
  }

  const combined = `${cleanBase}${cleanPath}${suffix}`;
  return combined.startsWith('/') ? combined : `/${combined}`;
}
