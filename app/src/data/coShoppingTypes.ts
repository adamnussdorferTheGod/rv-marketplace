// ─── Reaction types ─────────────────────────────────────────────────

/** Reaction sentiment for a listing on a shared list. */
export type ReactionType = 'love' | 'maybe' | 'pass' | 'none';

// ─── List member ────────────────────────────────────────────────────

/** A participant on a shared co-shopping list. */
export interface ListMember {
  id: string;              // Unique member identifier (e.g. "user-1", "user-sarah")
  displayName: string;     // Display name (e.g. "You", "Sarah")
  avatarColor: string;     // Hex color for avatar circle (e.g. "#4CAF50")
  avatarInitials: string;  // 1-2 letter initials (e.g. "Y", "SB")
  isOwner: boolean;        // List creator flag
}

// ─── Reaction ───────────────────────────────────────────────────────

/** A member's reaction to a specific listing on a shared list. */
export interface Reaction {
  memberId: string;        // Who reacted
  listingId: string;       // Which listing
  type: ReactionType;      // The reaction sentiment
  updatedAt: string;       // ISO timestamp of last change
}

// ─── Comment ────────────────────────────────────────────────────────

/** A comment on a listing within a shared list. */
export interface Comment {
  id: string;              // Unique comment ID
  listingId: string;       // Which listing
  authorId: string;        // Member ID of commenter
  text: string;            // Comment body
  createdAt: string;       // ISO timestamp
}

// ─── Shared listing ─────────────────────────────────────────────────

/** A listing added to a shared co-shopping list (references SRPListing by ID). */
export interface SharedListing {
  listingId: string;       // References SRPListing.id
  addedBy: string;         // Member ID who added it
  addedAt: string;         // ISO timestamp
  note: string | null;     // Optional note when adding
}

// ─── Shared list ────────────────────────────────────────────────────

/** A co-shopping shared list containing members, listings, reactions, and comments. */
export interface SharedList {
  id: string;              // Unique list ID
  name: string;            // List display name
  members: ListMember[];   // Array of members (max 4)
  listings: SharedListing[]; // Array of shared listing references
  reactions: Reaction[];   // All reactions for listings on this list
  comments: Comment[];     // All comments for listings on this list
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
}

// ─── Reducer state ──────────────────────────────────────────────────

/** State shape for the co-shopping useReducer. */
export interface CoShoppingState {
  lists: SharedList[];           // All shared lists
  activeListId: string | null;   // Currently viewed list
  currentUserId: string;         // The logged-in user's member ID (default "user-you")
}

// ─── Reducer actions ────────────────────────────────────────────────

/** Discriminated union of all co-shopping reducer actions. */
export type CoShoppingAction =
  | { type: 'CREATE_LIST'; name: string }
  | { type: 'DELETE_LIST'; listId: string }
  | { type: 'RENAME_LIST'; listId: string; name: string }
  | { type: 'SET_ACTIVE_LIST'; listId: string | null }
  | { type: 'ADD_LISTING'; listId: string; listingId: string; addedBy: string; note?: string }
  | { type: 'REMOVE_LISTING'; listId: string; listingId: string }
  | { type: 'SET_REACTION'; listId: string; listingId: string; memberId: string; reactionType: ReactionType }
  | { type: 'ADD_COMMENT'; listId: string; listingId: string; authorId: string; text: string }
  | { type: 'ADD_MEMBER'; listId: string; member: ListMember }
  | { type: 'REMOVE_MEMBER'; listId: string; memberId: string }
  | { type: 'LOAD_STATE'; state: CoShoppingState };
