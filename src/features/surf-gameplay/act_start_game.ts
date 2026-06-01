import { orbitTapStore, type OrbitTapStore } from '../orbittap-lite/orbittap-lite.store';

type OrbitTapGameplayActions = Pick<OrbitTapStore['actions'], 'restart' | 'resume' | 'tapToLaunch'>;

export function actStartGame(actions: OrbitTapGameplayActions = orbitTapStore.actions): void {
  const state = orbitTapStore.getState();

  if (state.runtime.gameOver) {
    actions.restart();
    return;
  }

  if (state.activeScreen !== 'gameplay' || state.runtime.paused) {
    actions.resume();
  }

  actions.tapToLaunch();
}
