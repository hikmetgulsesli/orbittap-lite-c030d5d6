import type { OrbitTapState, OrbitTapStore } from '../features/orbittap-lite/orbittap-lite.store';

export interface OrbitTapTestBridge {
  readonly state: OrbitTapState;
  getState(): OrbitTapState;
  actions: OrbitTapStore['actions'];
  dispatch: OrbitTapStore['dispatch'];
  subscribe: OrbitTapStore['subscribe'];
}

declare global {
  interface Window {
    app?: OrbitTapTestBridge;
  }
}

export function installOrbitTapBridge(store: OrbitTapStore): OrbitTapTestBridge | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const bridge: OrbitTapTestBridge = {
    get state() {
      return store.getState();
    },
    getState: store.getState,
    actions: store.actions,
    dispatch: store.dispatch,
    subscribe: store.subscribe,
  };

  window.app = bridge;
  return bridge;
}
