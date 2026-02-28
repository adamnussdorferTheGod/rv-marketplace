export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  LISTING: '/listing/:id',
  MOBILE_SEARCH: '/mobile-search',
} as const;

export function listingPath(id: string): string {
  return `/listing/${id}`;
}
