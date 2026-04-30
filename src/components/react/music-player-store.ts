import { SONGS } from "../../constant/songs";

type MusicState = {
  currentSongIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
};

type Listener = (state: MusicState) => void;

const STORAGE_KEY = "ns-music-state";

const listeners = new Set<Listener>();

let audioEl: HTMLAudioElement | null = null;
let initialized = false;
let resumeOnOverlayUncover = false;
let pendingSeekTime: number | null = null;

let state: MusicState = {
  currentSongIndex: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
};

const emit = () => {
  listeners.forEach((listener) => listener({ ...state }));
};

const saveState = () => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentSongIndex: state.currentSongIndex,
        currentTime: state.currentTime,
        isPlaying: state.isPlaying,
      }),
    );
  } catch {
    // no-op
  }
};

const loadPersisted = () => {
  if (typeof window === "undefined") return;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as {
      currentSongIndex?: number;
      currentTime?: number;
      isPlaying?: boolean;
    };
    if (
      typeof parsed.currentSongIndex === "number" &&
      parsed.currentSongIndex >= 0 &&
      parsed.currentSongIndex < SONGS.length
    ) {
      state.currentSongIndex = parsed.currentSongIndex;
    }
    if (typeof parsed.currentTime === "number" && parsed.currentTime >= 0) {
      state.currentTime = parsed.currentTime;
    }
    if (typeof parsed.isPlaying === "boolean") {
      state.isPlaying = parsed.isPlaying;
    }
  } catch {
    // no-op
  }
};

const getAudio = () => {
  if (typeof window === "undefined") return null;
  if (audioEl) return audioEl;
  audioEl = new Audio();
  audioEl.preload = "metadata";
  audioEl.src = SONGS[state.currentSongIndex].src;
  return audioEl;
};

const updateSong = (nextIndex: number) => {
  const audio = getAudio();
  if (!audio) return;
  const shouldContinue = state.isPlaying;
  state.currentSongIndex = (nextIndex + SONGS.length) % SONGS.length;
  state.currentTime = 0;
  state.duration = 0;
  audio.src = SONGS[state.currentSongIndex].src;
  audio.currentTime = 0;
  audio.load();
  emit();
  saveState();
  if (shouldContinue) {
    void play();
  }
};

export const initMusicStore = () => {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  loadPersisted();
  const audio = getAudio();
  if (!audio) return;

  audio.src = SONGS[state.currentSongIndex].src;
  pendingSeekTime = state.currentTime > 0 ? state.currentTime : null;
  audio.load();

  const onTimeUpdate = () => {
    state.currentTime = audio.currentTime || 0;
    emit();
    saveState();
  };

  const onLoadedMeta = () => {
    state.duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    if (pendingSeekTime !== null) {
      const seekToTime = Math.min(
        pendingSeekTime,
        state.duration || pendingSeekTime,
      );
      try {
        audio.currentTime = seekToTime;
        state.currentTime = seekToTime;
      } catch {
        // no-op
      }
      pendingSeekTime = null;
    }
    emit();
  };

  const onEnded = () => {
    updateSong(state.currentSongIndex + 1);
  };

  const onPause = () => {
    state.isPlaying = false;
    emit();
    saveState();
  };

  const onPlay = () => {
    state.isPlaying = true;
    emit();
    saveState();
  };

  const persistBeforeUnload = () => {
    state.currentTime = audio.currentTime || state.currentTime;
    saveState();
  };

  const persistBeforeRouteTransition = () => {
    state.currentTime = audio.currentTime || state.currentTime;
    saveState();
  };

  audio.addEventListener("timeupdate", onTimeUpdate);
  audio.addEventListener("loadedmetadata", onLoadedMeta);
  audio.addEventListener("ended", onEnded);
  audio.addEventListener("pause", onPause);
  audio.addEventListener("play", onPlay);
  window.addEventListener("pagehide", persistBeforeUnload);
  window.addEventListener("beforeunload", persistBeforeUnload);
  window.addEventListener(
    "page-transition",
    persistBeforeRouteTransition as EventListener,
  );

  if (state.isPlaying) {
    resumeOnOverlayUncover = true;
  }

  emit();
};

export const notifyOverlayUncovered = () => {
  if (!resumeOnOverlayUncover || !state.isPlaying) return;
  resumeOnOverlayUncover = false;
  void play();
};

export const subscribeMusicStore = (listener: Listener) => {
  listeners.add(listener);
  listener({ ...state });
  return () => {
    listeners.delete(listener);
  };
};

export const getMusicState = () => ({ ...state });

export const play = async () => {
  const audio = getAudio();
  if (!audio) return;
  try {
    if (pendingSeekTime !== null) {
      const seekToTime = Math.min(
        pendingSeekTime,
        state.duration || pendingSeekTime,
      );
      try {
        audio.currentTime = seekToTime;
        state.currentTime = seekToTime;
      } catch {
        // no-op
      }
      pendingSeekTime = null;
    }
    await audio.play();
    state.isPlaying = true;
    emit();
    saveState();
  } catch {
    state.isPlaying = false;
    emit();
    saveState();
  }
};

export const pause = () => {
  const audio = getAudio();
  if (!audio) return;
  audio.pause();
  state.isPlaying = false;
  emit();
  saveState();
};

export const togglePlayPause = () => {
  if (state.isPlaying) {
    pause();
  } else {
    void play();
  }
};

export const nextSong = () => updateSong(state.currentSongIndex + 1);

export const prevSong = () => updateSong(state.currentSongIndex - 1);

export const seekTo = (time: number) => {
  const audio = getAudio();
  if (!audio) return;
  const nextTime = Math.max(0, Math.min(time, state.duration || time));
  audio.currentTime = nextTime;
  state.currentTime = nextTime;
  emit();
  saveState();
};
