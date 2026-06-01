import {
  createOrbitTapRuntime,
  restartRuntime,
  setRuntimeDifficulty,
  setRuntimePaused,
  tapToLaunch,
  tickRuntime,
  upgradePilot,
  type OrbitTapRuntime,
} from '../../game/game-runtime';
import {
  createOrbitTapRepo,
  defaultPersistedState,
  type OrbitTapPersistedState,
  type OrbitTapRepo,
  type StorageStatus,
} from './orbittap-lite.repo';

export type OrbitTapScreen = 'gameplay' | 'settings' | 'leaderboard' | 'profile';

export interface OrbitTapState {
  activeScreen: OrbitTapScreen;
  runtime: OrbitTapRuntime;
  highScore: number;
  preferences: OrbitTapPersistedState['preferences'];
  storageStatus: StorageStatus;
  lastError: string | null;
}

export type OrbitTapAction =
  | { type: 'tap' }
  | { type: 'tick' }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'navigate'; screen: OrbitTapScreen }
  | { type: 'saveSettings'; preferences?: Partial<OrbitTapState['preferences']> }
  | { type: 'resetHighScore' }
  | { type: 'upgradePilot' }
  | { type: 'restart' };

export interface OrbitTapStore {
  getState(): OrbitTapState;
  subscribe(listener: () => void): () => void;
  dispatch(action: OrbitTapAction): void;
  actions: {
    tapToLaunch(): void;
    tick(): void;
    pause(): void;
    resume(): void;
    openSettings(): void;
    closeSettings(): void;
    saveAndResume(): void;
    resetHighScore(): void;
    upgradePilot(): void;
    navigate(screen: OrbitTapScreen): void;
    restart(): void;
  };
}

export function createOrbitTapStore(repo: OrbitTapRepo = createOrbitTapRepo()): OrbitTapStore {
  let persisted = defaultPersistedState();
  let storageStatus: StorageStatus = 'idle';
  let lastError: string | null = null;

  try {
    persisted = repo.load() ?? persisted;
    storageStatus = 'loaded';
  } catch (error) {
    repo.reset();
    storageStatus = 'recovered';
    lastError = error instanceof Error ? error.message : 'Saved OrbitTap Lite data could not be loaded.';
  }

  let state: OrbitTapState = {
    activeScreen: 'gameplay',
    runtime: createOrbitTapRuntime({
      difficulty: persisted.preferences.difficulty,
      highScore: persisted.highScore,
    }),
    highScore: persisted.highScore,
    preferences: persisted.preferences,
    storageStatus,
    lastError,
  };

  const listeners = new Set<() => void>();

  function setState(nextState: OrbitTapState) {
    state = nextState;
    listeners.forEach((listener) => listener());
  }

  function persist(nextState: OrbitTapState) {
    try {
      repo.save({
        highScore: nextState.highScore,
        preferences: nextState.preferences,
      });
      state = {
        ...nextState,
        storageStatus: 'saved',
        lastError: nextState.lastError,
      };
    } catch (error) {
      state = {
        ...nextState,
        storageStatus: 'unavailable',
        lastError: error instanceof Error ? error.message : 'OrbitTap Lite progress could not be saved.',
      };
    }
  }

  function dispatch(action: OrbitTapAction) {
    const current = state;
    let nextRuntime = current.runtime;
    let nextState = current;
    let shouldPersist = false;

    switch (action.type) {
      case 'tap':
        nextRuntime = tapToLaunch(current.runtime);
        nextState = {
          ...current,
          runtime: nextRuntime,
          highScore: Math.max(current.highScore, nextRuntime.highScore),
        };
        shouldPersist = nextState.highScore !== current.highScore;
        break;
      case 'tick':
        nextRuntime = tickRuntime(current.runtime);
        nextState = {
          ...current,
          runtime: nextRuntime,
          highScore: Math.max(current.highScore, nextRuntime.highScore),
        };
        shouldPersist = nextState.highScore !== current.highScore;
        break;
      case 'pause':
        nextState = {
          ...current,
          activeScreen: 'settings',
          runtime: setRuntimePaused(current.runtime, true),
        };
        break;
      case 'resume':
        nextState = {
          ...current,
          activeScreen: 'gameplay',
          runtime: setRuntimePaused(current.runtime, false),
        };
        break;
      case 'navigate':
        nextState = {
          ...current,
          activeScreen: action.screen,
        };
        break;
      case 'saveSettings': {
        const preferences = {
          ...current.preferences,
          ...action.preferences,
        };
        nextState = {
          ...current,
          activeScreen: 'gameplay',
          preferences,
          runtime: setRuntimePaused(setRuntimeDifficulty(current.runtime, preferences.difficulty), false),
        };
        shouldPersist = true;
        break;
      }
      case 'resetHighScore':
        nextState = {
          ...current,
          highScore: 0,
          runtime: {
            ...current.runtime,
            highScore: 0,
          },
        };
        shouldPersist = true;
        break;
      case 'upgradePilot':
        nextState = {
          ...current,
          runtime: upgradePilot(current.runtime),
        };
        break;
      case 'restart':
        nextState = {
          ...current,
          activeScreen: 'gameplay',
          runtime: restartRuntime(current.runtime),
        };
        break;
    }

    if (shouldPersist) {
      persist(nextState);
      listeners.forEach((listener) => listener());
      return;
    }

    setState(nextState);
  }

  return {
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    dispatch,
    actions: {
      tapToLaunch: () => dispatch({ type: 'tap' }),
      tick: () => dispatch({ type: 'tick' }),
      pause: () => dispatch({ type: 'pause' }),
      resume: () => dispatch({ type: 'resume' }),
      openSettings: () => dispatch({ type: 'pause' }),
      closeSettings: () => dispatch({ type: 'resume' }),
      saveAndResume: () => dispatch({ type: 'saveSettings' }),
      resetHighScore: () => dispatch({ type: 'resetHighScore' }),
      upgradePilot: () => dispatch({ type: 'upgradePilot' }),
      navigate: (screen) => dispatch({ type: 'navigate', screen }),
      restart: () => dispatch({ type: 'restart' }),
    },
  };
}

export const orbitTapStore = createOrbitTapStore();
