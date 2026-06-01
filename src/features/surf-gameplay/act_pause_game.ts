import { orbitTapStore, type OrbitTapStore } from '../orbittap-lite/orbittap-lite.store';

type OrbitTapPauseActions = Pick<OrbitTapStore['actions'], 'pause' | 'resume'>;

export function actPauseGame(actions: OrbitTapPauseActions = orbitTapStore.actions): void {
  const state = orbitTapStore.getState();

  if (state.activeScreen !== 'gameplay' || state.runtime.paused) {
    actions.resume();
    return;
  }

  actions.pause();
}
