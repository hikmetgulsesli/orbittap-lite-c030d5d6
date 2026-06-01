import type { OrbitTapRuntime } from '../../game/game-runtime';

export interface OrbitTapPersistedState {
  highScore: number;
  preferences: {
    difficulty: OrbitTapRuntime['difficulty'];
    sound: boolean;
    haptics: boolean;
  };
}

export interface OrbitTapRepo {
  load(): OrbitTapPersistedState | null;
  save(state: OrbitTapPersistedState): void;
  reset(): void;
}

export type StorageStatus = 'idle' | 'loaded' | 'saved' | 'recovered' | 'unavailable';

const STORAGE_KEY = 'orbittap-lite-state';

export function createOrbitTapRepo(storage: Storage | undefined = getLocalStorage()): OrbitTapRepo {
  return {
    load() {
      if (!storage) {
        return null;
      }

      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }

      return parsePersistedState(raw);
    },
    save(state) {
      if (!storage) {
        return;
      }

      storage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    reset() {
      storage?.removeItem(STORAGE_KEY);
    },
  };
}

export function parsePersistedState(raw: string): OrbitTapPersistedState {
  const value: unknown = JSON.parse(raw);

  if (!isPersistedState(value)) {
    throw new Error('Saved OrbitTap Lite data is not valid.');
  }

  return value;
}

export function defaultPersistedState(): OrbitTapPersistedState {
  return {
    highScore: 0,
    preferences: {
      difficulty: 'normal',
      sound: true,
      haptics: true,
    },
  };
}

function getLocalStorage(): Storage | undefined {
  try {
    return globalThis.window?.localStorage;
  } catch {
    return undefined;
  }
}

function isPersistedState(value: unknown): value is OrbitTapPersistedState {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as OrbitTapPersistedState;
  const difficulty = candidate.preferences?.difficulty;

  return (
    Number.isFinite(candidate.highScore) &&
    candidate.highScore >= 0 &&
    (difficulty === 'easy' || difficulty === 'normal' || difficulty === 'hard') &&
    typeof candidate.preferences.sound === 'boolean' &&
    typeof candidate.preferences.haptics === 'boolean'
  );
}
