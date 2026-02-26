export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  LISTING: '/listing/:id',
} as const;

export function listingPath(id: string): string {
  return `/listing/${id}`;
}
