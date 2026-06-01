import { createOrbitTapRuntime } from '../game/game-runtime';
import type { OrbitTapState } from '../features/orbittap-lite/orbittap-lite.store';

export function createOrbitTapFixture(overrides: Partial<OrbitTapState> = {}): OrbitTapState {
  const runtime = createOrbitTapRuntime({ highScore: overrides.highScore ?? 240 });

  return {
    activeScreen: 'gameplay',
    runtime,
    highScore: runtime.highScore,
    preferences: {
      difficulty: 'normal',
      sound: true,
      haptics: true,
    },
    storageStatus: 'loaded',
    lastError: null,
    ...overrides,
  };
}
