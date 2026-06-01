export type OrbitTapLane = 0 | 1 | 2;

export interface OrbitTapEntity {
  id: string;
  lane: OrbitTapLane;
  position: number;
}

export interface OrbitTapRuntime {
  tick: number;
  player: {
    lane: OrbitTapLane;
    position: number;
    upgraded: boolean;
  };
  obstacles: OrbitTapEntity[];
  shards: OrbitTapEntity[];
  score: number;
  highScore: number;
  energy: number;
  lives: number;
  level: number;
  progress: number;
  difficulty: 'easy' | 'normal' | 'hard';
  paused: boolean;
  gameOver: boolean;
}

export interface RuntimeInput {
  highScore?: number;
  difficulty?: OrbitTapRuntime['difficulty'];
}

const MAX_ENERGY = 100;
const STARTING_LIVES = 3;

export function createOrbitTapRuntime(input: RuntimeInput = {}): OrbitTapRuntime {
  return {
    tick: 0,
    player: {
      lane: 1,
      position: 0,
      upgraded: false,
    },
    obstacles: [],
    shards: [],
    score: 0,
    highScore: Math.max(0, input.highScore ?? 0),
    energy: 50,
    lives: STARTING_LIVES,
    level: 1,
    progress: 0,
    difficulty: input.difficulty ?? 'normal',
    paused: false,
    gameOver: false,
  };
}

export function tapToLaunch(runtime: OrbitTapRuntime): OrbitTapRuntime {
  if (runtime.paused || runtime.gameOver) {
    return runtime;
  }

  return advanceRuntime(runtime, 'tap');
}

export function tickRuntime(runtime: OrbitTapRuntime): OrbitTapRuntime {
  if (runtime.paused || runtime.gameOver) {
    return runtime;
  }

  return advanceRuntime(runtime, 'tick');
}

function advanceRuntime(runtime: OrbitTapRuntime, source: 'tap' | 'tick'): OrbitTapRuntime {
  const tick = runtime.tick + 1;
  const lane = nextLane(runtime.player.lane, runtime.difficulty);
  const baseScore = source === 'tap' ? (runtime.player.upgraded ? 18 : 12) : runtime.player.upgraded ? 6 : 4;
  const score = runtime.score + baseScore + runtime.level;
  const progress = Math.min(
    100,
    runtime.progress + (source === 'tap' ? (runtime.player.upgraded ? 18 : 14) : runtime.player.upgraded ? 5 : 3),
  );
  const level = 1 + Math.floor(score / 120);
  const energy = Math.min(MAX_ENERGY, runtime.energy + (source === 'tap' ? 6 : 2));
  const lives = calculateLives(runtime.lives, tick, runtime.difficulty, runtime.player.upgraded);
  const gameOver = lives <= 0;
  const highScore = Math.max(runtime.highScore, score);

  return {
    ...runtime,
    tick,
    player: {
      ...runtime.player,
      lane,
      position: Number((runtime.player.position + 0.16).toFixed(2)),
    },
    obstacles: nextEntities('obstacle', tick, runtime.difficulty),
    shards: nextEntities('shard', tick + 2, runtime.difficulty),
    score,
    highScore,
    energy,
    lives,
    level,
    progress: gameOver ? runtime.progress : progress,
    gameOver,
  };
}

export function setRuntimePaused(runtime: OrbitTapRuntime, paused: boolean): OrbitTapRuntime {
  return {
    ...runtime,
    paused,
  };
}

export function upgradePilot(runtime: OrbitTapRuntime): OrbitTapRuntime {
  if (runtime.player.upgraded || runtime.energy < 40) {
    return runtime;
  }

  return {
    ...runtime,
    player: {
      ...runtime.player,
      upgraded: true,
    },
    energy: runtime.energy - 40,
  };
}

export function restartRuntime(runtime: OrbitTapRuntime): OrbitTapRuntime {
  return createOrbitTapRuntime({
    difficulty: runtime.difficulty,
    highScore: runtime.highScore,
  });
}

export function setRuntimeDifficulty(
  runtime: OrbitTapRuntime,
  difficulty: OrbitTapRuntime['difficulty'],
): OrbitTapRuntime {
  return {
    ...runtime,
    difficulty,
  };
}

function nextLane(current: OrbitTapLane, difficulty: OrbitTapRuntime['difficulty']): OrbitTapLane {
  if (difficulty === 'easy') {
    return ((current + 1) % 3) as OrbitTapLane;
  }

  if (difficulty === 'hard') {
    return ((current + 2) % 3) as OrbitTapLane;
  }

  return current === 1 ? 2 : 1;
}

function calculateLives(
  currentLives: number,
  tick: number,
  difficulty: OrbitTapRuntime['difficulty'],
  upgraded: boolean,
): number {
  const hazardInterval = difficulty === 'hard' ? 4 : difficulty === 'normal' ? 6 : 9;

  if (upgraded || tick % hazardInterval !== 0) {
    return currentLives;
  }

  return Math.max(0, currentLives - 1);
}

function nextEntities(
  kind: 'obstacle' | 'shard',
  tick: number,
  difficulty: OrbitTapRuntime['difficulty'],
): OrbitTapEntity[] {
  const count = difficulty === 'hard' ? 3 : difficulty === 'normal' ? 2 : 1;

  return Array.from({ length: count }, (_, index) => ({
    id: `${kind}-${tick}-${index}`,
    lane: ((tick + index) % 3) as OrbitTapLane,
    position: Number(Math.max(0, 1 - index * 0.28 - (tick % 5) * 0.04).toFixed(2)),
  }));
}
