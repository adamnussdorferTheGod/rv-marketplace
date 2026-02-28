import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type {
  CoShoppingState,
  CoShoppingAction,
  SharedList,
  Reaction,
  Comment,
  ListMember,
  ReactionType,
} from '../../../app/src/data/coShoppingTypes';
import { DEMO_SHARED_STATE } from '../../../app/src/data/sampleCoShopping';

// ─── Reducer ────────────────────────────────────────────────────────

function coShoppingReducer(
  state: CoShoppingState,
  action: CoShoppingAction,
): CoShoppingState {
  switch (action.type) {
    case 'CREATE_LIST': {
      if (state.lists.length >= 5) return state;
      const now = new Date().toISOString();
      const currentUser = state.lists
        .flatMap((l) => l.members)
        .find((m) => m.id === state.currentUserId);
      const ownerMember: ListMember = currentUser
        ? { ...currentUser, isOwner: true }
        : {
            id: state.currentUserId,
            displayName: 'You',
            avatarColor: '#4CAF50',
            avatarInitials: 'Y',
            isOwner: true,
          };
      const newList: SharedList = {
        id: `list-${Date.now()}`,
        name: action.name,
        members: [ownerMember],
        listings: [],
        reactions: [],
        comments: [],
        createdAt: now,
        updatedAt: now,
      };
      return { ...state, lists: [...state.lists, newList] };
    }

    case 'DELETE_LIST': {
      const filtered = state.lists.filter((l) => l.id !== action.listId);
      return {
        ...state,
        lists: filtered,
        activeListId:
          state.activeListId === action.listId ? null : state.activeListId,
      };
    }

    case 'RENAME_LIST': {
      return {
        ...state,
        lists: state.lists.map((l) =>
          l.id === action.listId
            ? { ...l, name: action.name, updatedAt: new Date().toISOString() }
            : l,
        ),
      };
    }

    case 'SET_ACTIVE_LIST': {
      return { ...state, activeListId: action.listId };
    }

    case 'ADD_LISTING': {
      return {
        ...state,
        lists: state.lists.map((l) => {
          if (l.id !== action.listId) return l;
          // Duplicate check
          if (l.listings.some((sl) => sl.listingId === action.listingId)) {
            return l;
          }
          return {
            ...l,
            listings: [
              ...l.listings,
              {
                listingId: action.listingId,
                addedBy: action.addedBy,
                addedAt: new Date().toISOString(),
                note: action.note ?? null,
              },
            ],
            updatedAt: new Date().toISOString(),
          };
        }),
      };
    }

    case 'REMOVE_LISTING': {
      return {
        ...state,
        lists: state.lists.map((l) => {
          if (l.id !== action.listId) return l;
          return {
            ...l,
            listings: l.listings.filter(
              (sl) => sl.listingId !== action.listingId,
            ),
            reactions: l.reactions.filter(
              (r) => r.listingId !== action.listingId,
            ),
            comments: l.comments.filter(
              (c) => c.listingId !== action.listingId,
            ),
            updatedAt: new Date().toISOString(),
          };
        }),
      };
    }

    case 'SET_REACTION': {
      return {
        ...state,
        lists: state.lists.map((l) => {
          if (l.id !== action.listId) return l;
          const existing = l.reactions.findIndex(
            (r) =>
              r.memberId === action.memberId &&
              r.listingId === action.listingId,
          );
          const now = new Date().toISOString();
          const newReaction: Reaction = {
            memberId: action.memberId,
            listingId: action.listingId,
            type: action.reactionType,
            updatedAt: now,
          };
          const reactions =
            existing >= 0
              ? l.reactions.map((r, i) => (i === existing ? newReaction : r))
              : [...l.reactions, newReaction];
          return { ...l, reactions, updatedAt: now };
        }),
      };
    }

    case 'ADD_COMMENT': {
      return {
        ...state,
        lists: state.lists.map((l) => {
          if (l.id !== action.listId) return l;
          const now = new Date().toISOString();
          const newComment: Comment = {
            id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            listingId: action.listingId,
            authorId: action.authorId,
            text: action.text,
            createdAt: now,
          };
          return {
            ...l,
            comments: [...l.comments, newComment],
            updatedAt: now,
          };
        }),
      };
    }

    case 'ADD_MEMBER': {
      return {
        ...state,
        lists: state.lists.map((l) => {
          if (l.id !== action.listId) return l;
          if (l.members.length >= 4) return l;
          return {
            ...l,
            members: [...l.members, action.member],
            updatedAt: new Date().toISOString(),
          };
        }),
      };
    }

    case 'REMOVE_MEMBER': {
      return {
        ...state,
        lists: state.lists.map((l) => {
          if (l.id !== action.listId) return l;
          return {
            ...l,
            members: l.members.filter((m) => m.id !== action.memberId),
            updatedAt: new Date().toISOString(),
          };
        }),
      };
    }

    case 'LOAD_STATE': {
      return action.state;
    }

    default:
      return state;
  }
}

// ─── Context value interface ────────────────────────────────────────

interface CoShoppingContextValue {
  state: CoShoppingState;
  lists: SharedList[];
  activeList: SharedList | null;
  currentUserId: string;
  // Action dispatchers
  createList: (name: string) => void;
  deleteList: (listId: string) => void;
  renameList: (listId: string, name: string) => void;
  setActiveList: (listId: string | null) => void;
  addListing: (listId: string, listingId: string, note?: string) => void;
  removeListing: (listId: string, listingId: string) => void;
  setReaction: (
    listId: string,
    listingId: string,
    reactionType: ReactionType,
  ) => void;
  addComment: (listId: string, listingId: string, text: string) => void;
  addMember: (listId: string, member: ListMember) => void;
  removeMember: (listId: string, memberId: string) => void;
  toggleListingOnActiveList: (listingId: string) => void;
  // Helpers
  getReactionsForListing: (listId: string, listingId: string) => Reaction[];
  getCommentsForListing: (listId: string, listingId: string) => Comment[];
  getListForListing: (listingId: string) => SharedList | undefined;
  isListingOnAnyList: (listingId: string) => boolean;
}

// ─── Context ────────────────────────────────────────────────────────

const CoShoppingContext = createContext<CoShoppingContextValue | null>(null);

// ─── Provider ───────────────────────────────────────────────────────

interface CoShoppingProviderProps {
  children: ReactNode;
}

export function CoShoppingProvider({ children }: CoShoppingProviderProps) {
  const [state, dispatch] = useReducer(
    coShoppingReducer,
    DEMO_SHARED_STATE,
  );

  // ── Action callbacks ──────────────────────────────────────────────

  const createList = useCallback(
    (name: string) => {
      dispatch({ type: 'CREATE_LIST', name });
    },
    [dispatch],
  );

  const deleteList = useCallback(
    (listId: string) => {
      dispatch({ type: 'DELETE_LIST', listId });
    },
    [dispatch],
  );

  const renameList = useCallback(
    (listId: string, name: string) => {
      dispatch({ type: 'RENAME_LIST', listId, name });
    },
    [dispatch],
  );

  const setActiveList = useCallback(
    (listId: string | null) => {
      dispatch({ type: 'SET_ACTIVE_LIST', listId });
    },
    [dispatch],
  );

  const addListing = useCallback(
    (listId: string, listingId: string, note?: string) => {
      dispatch({
        type: 'ADD_LISTING',
        listId,
        listingId,
        addedBy: state.currentUserId,
        note,
      });
    },
    [dispatch, state.currentUserId],
  );

  const removeListing = useCallback(
    (listId: string, listingId: string) => {
      dispatch({ type: 'REMOVE_LISTING', listId, listingId });
    },
    [dispatch],
  );

  const setReaction = useCallback(
    (listId: string, listingId: string, reactionType: ReactionType) => {
      dispatch({
        type: 'SET_REACTION',
        listId,
        listingId,
        memberId: state.currentUserId,
        reactionType,
      });
    },
    [dispatch, state.currentUserId],
  );

  const addComment = useCallback(
    (listId: string, listingId: string, text: string) => {
      dispatch({
        type: 'ADD_COMMENT',
        listId,
        listingId,
        authorId: state.currentUserId,
        text,
      });
    },
    [dispatch, state.currentUserId],
  );

  const addMember = useCallback(
    (listId: string, member: ListMember) => {
      dispatch({ type: 'ADD_MEMBER', listId, member });
    },
    [dispatch],
  );

  const removeMember = useCallback(
    (listId: string, memberId: string) => {
      dispatch({ type: 'REMOVE_MEMBER', listId, memberId });
    },
    [dispatch],
  );

  // ── Toggle listing on active list ────────────────────────────────

  const toggleListingOnActiveList = useCallback(
    (listingId: string) => {
      // Find if listing is already on any list
      const existingList = state.lists.find((l) =>
        l.listings.some((sl) => sl.listingId === listingId),
      );
      if (existingList) {
        dispatch({ type: 'REMOVE_LISTING', listId: existingList.id, listingId });
      } else if (state.activeListId) {
        dispatch({
          type: 'ADD_LISTING',
          listId: state.activeListId,
          listingId,
          addedBy: state.currentUserId,
        });
      }
    },
    [state.lists, state.activeListId, state.currentUserId],
  );

  // ── Helper callbacks ──────────────────────────────────────────────

  const getReactionsForListing = useCallback(
    (listId: string, listingId: string): Reaction[] => {
      const list = state.lists.find((l) => l.id === listId);
      if (!list) return [];
      return list.reactions.filter((r) => r.listingId === listingId);
    },
    [state.lists],
  );

  const getCommentsForListing = useCallback(
    (listId: string, listingId: string): Comment[] => {
      const list = state.lists.find((l) => l.id === listId);
      if (!list) return [];
      return list.comments.filter((c) => c.listingId === listingId);
    },
    [state.lists],
  );

  const getListForListing = useCallback(
    (listingId: string): SharedList | undefined => {
      return state.lists.find((l) =>
        l.listings.some((sl) => sl.listingId === listingId),
      );
    },
    [state.lists],
  );

  const isListingOnAnyList = useCallback(
    (listingId: string): boolean => {
      return state.lists.some((l) =>
        l.listings.some((sl) => sl.listingId === listingId),
      );
    },
    [state.lists],
  );

  // ── Derived state ─────────────────────────────────────────────────

  const activeList = useMemo(
    () => state.lists.find((l) => l.id === state.activeListId) ?? null,
    [state.lists, state.activeListId],
  );

  // ── Memoized value ────────────────────────────────────────────────

  const value = useMemo<CoShoppingContextValue>(
    () => ({
      state,
      lists: state.lists,
      activeList,
      currentUserId: state.currentUserId,
      createList,
      deleteList,
      renameList,
      setActiveList,
      addListing,
      removeListing,
      setReaction,
      addComment,
      addMember,
      removeMember,
      toggleListingOnActiveList,
      getReactionsForListing,
      getCommentsForListing,
      getListForListing,
      isListingOnAnyList,
    }),
    [
      state,
      activeList,
      createList,
      deleteList,
      renameList,
      setActiveList,
      addListing,
      removeListing,
      setReaction,
      addComment,
      addMember,
      removeMember,
      toggleListingOnActiveList,
      getReactionsForListing,
      getCommentsForListing,
      getListForListing,
      isListingOnAnyList,
    ],
  );

  return (
    <CoShoppingContext.Provider value={value}>
      {children}
    </CoShoppingContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────────

export function useCoShopping(): CoShoppingContextValue {
  const ctx = useContext(CoShoppingContext);
  if (!ctx) {
    throw new Error('useCoShopping must be used within a CoShoppingProvider');
  }
  return ctx;
}
