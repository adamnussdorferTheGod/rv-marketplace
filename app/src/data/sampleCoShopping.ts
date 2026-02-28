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
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces',
  isOwner: true,
};

export const MOCK_USER_SARAH: ListMember = {
  id: 'user-sarah',
  displayName: 'Sarah',
  avatarColor: '#E91E63',
  avatarInitials: 'SB',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces',
  isOwner: false,
};

// ─── Default state: solo user, empty list ───────────────────────────

const emptySharedList: SharedList = {
  id: 'list-1',
  name: 'Saved RVs',
  members: [MOCK_USER_YOU],
  listings: [],
  reactions: [],
  comments: [],
  createdAt: '2026-02-20T10:00:00Z',
  updatedAt: '2026-02-20T10:00:00Z',
};

export const sampleCoShoppingState: CoShoppingState = {
  lists: [emptySharedList],
  activeListId: 'list-1',
  currentUserId: 'user-you',
};

// ─── Demo state: pre-populated for testing ──────────────────────────

const listingIds = [
  sampleSrpListings[0].id,   // travel trailer
  sampleSrpListings[2].id,   // travel trailer (used)
  sampleSrpListings[5].id,   // travel trailer (new)
  sampleSrpListings[10].id,  // travel trailer (new, Grand Design)
  sampleSrpListings[15].id,  // travel trailer (used, Coachmen)
];

const demoListings: SharedListing[] = [
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

const demoReactions: Reaction[] = [
  { memberId: 'user-you', listingId: listingIds[0], type: 'love', updatedAt: '2026-02-21T12:00:00Z' },
  { memberId: 'user-sarah', listingId: listingIds[0], type: 'love', updatedAt: '2026-02-21T18:30:00Z' },
  { memberId: 'user-you', listingId: listingIds[1], type: 'love', updatedAt: '2026-02-22T16:00:00Z' },
  { memberId: 'user-sarah', listingId: listingIds[1], type: 'love', updatedAt: '2026-02-22T20:15:00Z' },
  { memberId: 'user-you', listingId: listingIds[2], type: 'love', updatedAt: '2026-02-23T11:30:00Z' },
  { memberId: 'user-sarah', listingId: listingIds[2], type: 'love', updatedAt: '2026-02-23T19:00:00Z' },
  { memberId: 'user-you', listingId: listingIds[3], type: 'pass', updatedAt: '2026-02-24T17:45:00Z' },
  { memberId: 'user-sarah', listingId: listingIds[3], type: 'pass', updatedAt: '2026-02-25T08:00:00Z' },
  { memberId: 'user-you', listingId: listingIds[4], type: 'love', updatedAt: '2026-02-25T13:00:00Z' },
  { memberId: 'user-sarah', listingId: listingIds[4], type: 'love', updatedAt: '2026-02-25T14:00:00Z' },
];

const demoComments: Comment[] = [
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

const demoSharedList: SharedList = {
  id: 'list-1',
  name: 'Saved RVs',
  members: [MOCK_USER_YOU, MOCK_USER_SARAH],
  listings: demoListings,
  reactions: demoReactions,
  comments: demoComments,
  createdAt: '2026-02-20T10:00:00Z',
  updatedAt: '2026-02-27T14:00:00Z',
};

export const DEMO_SHARED_STATE: CoShoppingState = {
  lists: [demoSharedList],
  activeListId: 'list-1',
  currentUserId: 'user-you',
};
