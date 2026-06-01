import { useEffect, useSyncExternalStore } from 'react';
import { GameSettingsOrbittapLite, GameplayOrbittapLite } from './screens';
import { orbitTapStore } from './features/orbittap-lite/orbittap-lite.store';
import { actPauseGame } from './features/surf-gameplay/act_pause_game';
import { actRestartGame } from './features/surf-gameplay/act_restart_game';
import { actStartGame } from './features/surf-gameplay/act_start_game';
import { installOrbitTapBridge } from './test/bridge';

export default function App() {
  const state = useSyncExternalStore(
    orbitTapStore.subscribe,
    orbitTapStore.getState,
    orbitTapStore.getState,
  );
  const gameplayActive = state.activeScreen === 'gameplay' && !state.runtime.paused && !state.runtime.gameOver;

  useEffect(() => {
    installOrbitTapBridge(orbitTapStore);
  }, []);

  useEffect(() => {
    if (!gameplayActive) {
      return;
    }

    const tickId = window.setInterval(() => {
      orbitTapStore.actions.tick();
    }, 900);

    return () => window.clearInterval(tickId);
  }, [gameplayActive]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat) {
        return;
      }

      if (event.key === 'Escape' || event.key.toLowerCase() === 'p') {
        actPauseGame();
        return;
      }

      if (event.key.toLowerCase() === 'r') {
        actRestartGame();
        return;
      }

      if (event.key === ' ' || event.key === 'Enter') {
        if (state.activeScreen === 'gameplay') {
          event.preventDefault();
          actStartGame();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameplayActive, state.activeScreen]);

  const gameplayActions = {
    'pause-1': () => actPauseGame(),
    'tap-to-launch-2': state.activeScreen === 'gameplay' ? () => actStartGame() : undefined,
  };

  const settingsActions = {
    'pause-1': orbitTapStore.actions.resume,
    'close-settings-2': orbitTapStore.actions.closeSettings,
    'save-and-resume-3': orbitTapStore.actions.saveAndResume,
    'reset-high-score-4': orbitTapStore.actions.resetHighScore,
    'upgrade-pilot-5': orbitTapStore.actions.upgradePilot,
    'play-1': orbitTapStore.actions.resume,
    'leaderboard-2': () => orbitTapStore.actions.navigate('leaderboard'),
    'settings-3': orbitTapStore.actions.openSettings,
    'profile-4': () => orbitTapStore.actions.navigate('profile'),
  };

  return (
    <div data-setfarm-root="orbittap-lite" data-testid="setfarm-app-root" className="min-h-screen bg-[#090d17] text-white">
      {state.lastError ? (
        <div role="status" className="fixed left-4 right-4 top-4 z-50 rounded border border-amber-300/40 bg-amber-950/90 px-4 py-3 text-sm text-amber-50 shadow-lg">
          Recovered saved OrbitTap Lite data. {state.lastError}
        </div>
      ) : null}

      {state.activeScreen === 'settings' ? (
        <GameSettingsOrbittapLite actions={settingsActions} />
      ) : state.activeScreen === 'leaderboard' || state.activeScreen === 'profile' ? (
        <GameSettingsOrbittapLite actions={settingsActions} />
      ) : (
        <div
          data-gameplay-controls={gameplayActive ? 'active' : 'inactive'}
          aria-disabled={gameplayActive ? undefined : true}
          hidden={state.runtime.gameOver ? undefined : false}
        >
          <GameplayOrbittapLite actions={gameplayActions} runtime={state.runtime} />
        </div>
      )}
    </div>
  );
}
