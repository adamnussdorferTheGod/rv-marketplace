import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { VideoWalkthroughData, VideoAct } from '../../../app/src/data/videoWalkthroughTypes';

// 1. VideoPlaybackStatus type
export type VideoPlaybackStatus =
  | 'idle'
  | 'loading'
  | 'playing'
  | 'paused'
  | 'seeking'
  | 'ended'
  | 'error';

// 2. VideoState interface
export interface VideoState {
  status: VideoPlaybackStatus;
  currentSegmentIndex: number;
  currentActIndex: number;
  elapsedMs: number;
  isMuted: boolean;
  volume: number;
  error: string | null;
  isLightboxOpen: boolean;
}

// 3. VideoAction discriminated union
export type VideoAction =
  | { type: 'OPEN_LIGHTBOX' }
  | { type: 'CLOSE_LIGHTBOX' }
  | { type: 'START_LOADING' }
  | { type: 'LOADED' }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'SEEK'; segmentIndex: number; elapsedMs: number }
  | { type: 'SEEK_COMPLETE' }
  | { type: 'SEGMENT_ADVANCE'; segmentIndex: number; actIndex: number }
  | { type: 'END' }
  | { type: 'ERROR'; message: string }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'SET_VOLUME'; volume: number }
  | { type: 'TICK'; elapsedMs: number };

// 4. Initial state
const initialState: VideoState = {
  status: 'idle',
  currentSegmentIndex: 0,
  currentActIndex: 0,
  elapsedMs: 0,
  isMuted: true,
  volume: 1,
  error: null,
  isLightboxOpen: false,
};

// 5. Reducer with guarded transitions
function videoReducer(state: VideoState, action: VideoAction): VideoState {
  switch (action.type) {
    case 'OPEN_LIGHTBOX':
      return { ...state, isLightboxOpen: true, status: 'loading' };

    case 'CLOSE_LIGHTBOX':
      return { ...initialState };

    case 'START_LOADING':
      return { ...state, status: 'loading' };

    case 'LOADED':
      if (state.status !== 'loading') return state;
      return { ...state, status: 'playing' };

    case 'PLAY':
      if (state.status === 'ended') {
        return { ...state, status: 'playing', currentSegmentIndex: 0, currentActIndex: 0, elapsedMs: 0 };
      }
      if (state.status !== 'paused' && state.status !== 'idle') return state;
      return { ...state, status: 'playing' };

    case 'PAUSE':
      if (state.status !== 'playing') return state;
      return { ...state, status: 'paused' };

    case 'SEEK':
      return {
        ...state,
        status: 'seeking',
        currentSegmentIndex: action.segmentIndex,
        elapsedMs: action.elapsedMs,
      };

    case 'SEEK_COMPLETE':
      if (state.status !== 'seeking') return state;
      return { ...state, status: 'playing' };

    case 'SEGMENT_ADVANCE':
      return {
        ...state,
        currentSegmentIndex: action.segmentIndex,
        currentActIndex: action.actIndex,
      };

    case 'END':
      return { ...state, status: 'ended' };

    case 'ERROR':
      return { ...state, status: 'error', error: action.message };

    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted };

    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.volume,
        isMuted: action.volume === 0,
      };

    case 'TICK':
      return { ...state, elapsedMs: action.elapsedMs };

    default:
      return state;
  }
}

// 6. Context value interface
interface VideoWalkthroughContextValue {
  state: VideoState;
  data: VideoWalkthroughData | null;
  openLightbox: () => void;
  closeLightbox: () => void;
  play: () => void;
  pause: () => void;
  seekToSegment: (segmentIndex: number) => void;
  seekToMs: (globalMs: number) => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  seekComplete: () => void;
  startLoading: () => void;
  loaded: () => void;
  tick: (elapsedMs: number) => void;
  advanceSegment: (segmentIndex: number, actIndex: number) => void;
  end: () => void;
}

// 7. Context and provider
const VideoWalkthroughContext =
  createContext<VideoWalkthroughContextValue | null>(null);

interface VideoWalkthroughProviderProps {
  data: VideoWalkthroughData;
  children: ReactNode;
}

export function VideoWalkthroughProvider({
  data,
  children,
}: VideoWalkthroughProviderProps) {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  const openLightbox = useCallback(() => {
    dispatch({ type: 'OPEN_LIGHTBOX' });
  }, []);

  const closeLightbox = useCallback(() => {
    dispatch({ type: 'CLOSE_LIGHTBOX' });
  }, []);

  const play = useCallback(() => {
    dispatch({ type: 'PLAY' });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, []);

  const seekToSegment = useCallback((segmentIndex: number) => {
    dispatch({ type: 'SEEK', segmentIndex, elapsedMs: 0 });
  }, []);

  const seekToMs = useCallback(
    (globalMs: number) => {
      if (!data) return;
      // Walk flattened segments to find target segment + local offset
      let cumulative = 0;
      const flat: { durationMs: number; actIndex: number }[] = [];
      data.acts.forEach((act: VideoAct, actIdx: number) => {
        act.segments.forEach((seg) => {
          flat.push({ durationMs: seg.durationMs, actIndex: actIdx });
        });
      });
      for (let i = 0; i < flat.length; i++) {
        if (cumulative + flat[i].durationMs > globalMs) {
          dispatch({
            type: 'SEEK',
            segmentIndex: i,
            elapsedMs: globalMs - cumulative,
          });
          return;
        }
        cumulative += flat[i].durationMs;
      }
      // Past end — seek to last segment end
      if (flat.length > 0) {
        const lastIdx = flat.length - 1;
        dispatch({
          type: 'SEEK',
          segmentIndex: lastIdx,
          elapsedMs: flat[lastIdx].durationMs,
        });
      }
    },
    [data],
  );

  const seekComplete = useCallback(() => {
    dispatch({ type: 'SEEK_COMPLETE' });
  }, []);

  const startLoading = useCallback(() => {
    dispatch({ type: 'START_LOADING' });
  }, []);

  const toggleMute = useCallback(() => {
    dispatch({ type: 'TOGGLE_MUTE' });
  }, []);

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: 'SET_VOLUME', volume });
  }, []);

  const loaded = useCallback(() => {
    dispatch({ type: 'LOADED' });
  }, []);

  const tick = useCallback((elapsedMs: number) => {
    dispatch({ type: 'TICK', elapsedMs });
  }, []);

  const advanceSegment = useCallback(
    (segmentIndex: number, actIndex: number) => {
      dispatch({ type: 'SEGMENT_ADVANCE', segmentIndex, actIndex });
    },
    [],
  );

  const end = useCallback(() => {
    dispatch({ type: 'END' });
  }, []);

  const value = useMemo<VideoWalkthroughContextValue>(
    () => ({
      state,
      data,
      openLightbox,
      closeLightbox,
      play,
      pause,
      seekToSegment,
      seekToMs,
      seekComplete,
      startLoading,
      toggleMute,
      setVolume,
      loaded,
      tick,
      advanceSegment,
      end,
    }),
    [
      state,
      data,
      openLightbox,
      closeLightbox,
      play,
      pause,
      seekToSegment,
      seekToMs,
      seekComplete,
      startLoading,
      toggleMute,
      setVolume,
      loaded,
      tick,
      advanceSegment,
      end,
    ],
  );

  return (
    <VideoWalkthroughContext.Provider value={value}>
      {children}
    </VideoWalkthroughContext.Provider>
  );
}

// 8. Consumer hook
export function useVideoWalkthrough(): VideoWalkthroughContextValue {
  const ctx = useContext(VideoWalkthroughContext);
  if (!ctx) {
    throw new Error(
      'useVideoWalkthrough must be used within a VideoWalkthroughProvider',
    );
  }
  return ctx;
}
