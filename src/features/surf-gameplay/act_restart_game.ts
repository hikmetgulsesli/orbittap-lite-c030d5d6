import { orbitTapStore, type OrbitTapStore } from '../orbittap-lite/orbittap-lite.store';

type OrbitTapRestartActions = Pick<OrbitTapStore['actions'], 'restart'>;

export function actRestartGame(actions: OrbitTapRestartActions = orbitTapStore.actions): void {
  actions.restart();
}
