export function getWalinePath(pathname: string): string {
  // The existing About comments are stored under the path with a trailing slash.
  return pathname === '/about' ? '/about/' : pathname
}
