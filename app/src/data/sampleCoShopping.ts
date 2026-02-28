import type {
  ListMember,
  SharedListing,
  Reaction,
  Comment,
  SharedList,
  CoShoppingState,
} from './coShoppingTypes';
import { sampleSrpListings } from './sampleSrpListings';

// ─── Mock users ──────────────────────────────────────────────────────

export const MOCK_USER_YOU: ListMember = {
  id: 'user-you',
  displayName: 'You',
  avatarColor: '#4CAF50',
  avatarInitials: 'Y',
  isOwner: true,
};

export const MOCK_USER_SARAH: ListMember = {
  id: 'user-sarah',
  displayName: 'Sarah',
  avatarColor: '#E91E63',
  avatarInitials: 'SB',
  isOwner: false,
};

// ─── Sample shared list ─────────────────────────────────────────────

// Pick 5 listings from SRP sample data covering a variety of RV types
const listingIds = [
  sampleSrpListings[0].id,   // travel trailer
  sampleSrpListings[2].id,   // travel trailer (used)
  sampleSrpListings[5].id,   // travel trailer (new)
  sampleSrpListings[10].id,  // travel trailer (new, Grand Design)
  sampleSrpListings[15].id,  // travel trailer (used, Coachmen)
];

const sampleListings: SharedListing[] = [
  {
    listingId: listingIds[0],
    addedBy: 'user-you',
    addedAt: '2026-02-21T10:15:00Z',
    note: null,
  },
  {
    listingId: listingIds[1],
    addedBy: 'user-sarah',
    addedAt: '2026-02-22T14:30:00Z',
    note: null,
  },
  {
    listingId: listingIds[2],
    addedBy: 'user-you',
    addedAt: '2026-02-23T09:45:00Z',
    note: null,
  },
  {
    listingId: listingIds[3],
    addedBy: 'user-sarah',
    addedAt: '2026-02-24T16:20:00Z',
    note: null,
  },
  {
    listingId: listingIds[4],
    addedBy: 'user-you',
    addedAt: '2026-02-25T11:00:00Z',
    note: null,
  },
];

// ─── Pre-populated reactions ─────────────────────────────────────────
// Listing 0: both love (match!)
// Listing 1: you=maybe, sarah=love
// Listing 2: you=love, sarah=maybe
// Listing 3: you=pass, sarah=maybe
// Listing 4: you=love, sarah=none

const sampleReactions: Reaction[] = [
  // Listing 0 — both love = match
  { memberId: 'user-you', listingId: listingIds[0], type: 'love', updatedAt: '2026-02-21T12:00:00Z' },
  { memberId: 'user-sarah', listingId: listingIds[0], type: 'love', updatedAt: '2026-02-21T18:30:00Z' },
  // Listing 1 — mixed
  { memberId: 'user-you', listingId: listingIds[1], type: 'maybe', updatedAt: '2026-02-22T16:00:00Z' },
  { memberId: 'user-sarah', listingId: listingIds[1], type: 'love', updatedAt: '2026-02-22T20:15:00Z' },
  // Listing 2 — mixed
  { memberId: 'user-you', listingId: listingIds[2], type: 'love', updatedAt: '2026-02-23T11:30:00Z' },
  { memberId: 'user-sarah', listingId: listingIds[2], type: 'maybe', updatedAt: '2026-02-23T19:00:00Z' },
  // Listing 3 — you pass, sarah maybe
  { memberId: 'user-you', listingId: listingIds[3], type: 'pass', updatedAt: '2026-02-24T17:45:00Z' },
  { memberId: 'user-sarah', listingId: listingIds[3], type: 'maybe', updatedAt: '2026-02-25T08:00:00Z' },
  // Listing 4 — you love, sarah no reaction
  { memberId: 'user-you', listingId: listingIds[4], type: 'love', updatedAt: '2026-02-25T13:00:00Z' },
  { memberId: 'user-sarah', listingId: listingIds[4], type: 'none', updatedAt: '2026-02-25T14:00:00Z' },
];

// ─── Pre-populated comments ─────────────────────────────────────────

const sampleComments: Comment[] = [
  {
    id: 'comment-1',
    listingId: listingIds[0],
    authorId: 'user-sarah',
    text: 'Love the floor plan!',
    createdAt: '2026-02-21T19:00:00Z',
  },
  {
    id: 'comment-2',
    listingId: listingIds[0],
    authorId: 'user-you',
    text: 'Can we go see this one Saturday?',
    createdAt: '2026-02-22T08:30:00Z',
  },
  {
    id: 'comment-3',
    listingId: listingIds[2],
    authorId: 'user-you',
    text: 'The storage is huge for weekend trips',
    createdAt: '2026-02-23T12:00:00Z',
  },
  {
    id: 'comment-4',
    listingId: listingIds[3],
    authorId: 'user-sarah',
    text: 'I think this one might be too heavy for our truck',
    createdAt: '2026-02-25T09:15:00Z',
  },
];

// ─── Sample shared list ─────────────────────────────────────────────

const sampleSharedList: SharedList = {
  id: 'list-1',
  name: 'Our RV Shortlist',
  members: [MOCK_USER_YOU, MOCK_USER_SARAH],
  listings: sampleListings,
  reactions: sampleReactions,
  comments: sampleComments,
  createdAt: '2026-02-20T10:00:00Z',
  updatedAt: '2026-02-27T14:00:00Z',
};

// ─── Export full state ──────────────────────────────────────────────

export const sampleCoShoppingState: CoShoppingState = {
  lists: [sampleSharedList],
  activeListId: 'list-1',
  currentUserId: 'user-you',
};
