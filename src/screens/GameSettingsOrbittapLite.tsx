// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Settings - OrbitTap Lite
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { AudioWaveform, Pause, Play, RotateCcw, Save, Settings, Trophy, User, Volume2, X } from "lucide-react";


export type GameSettingsOrbittapLiteActionId = "pause-1" | "close-settings-2" | "save-and-resume-3" | "reset-high-score-4" | "upgrade-pilot-5" | "play-1" | "leaderboard-2" | "settings-3" | "profile-4";

export interface GameSettingsOrbittapLiteProps {
  actions?: Partial<Record<GameSettingsOrbittapLiteActionId, () => void>>;

}

export function GameSettingsOrbittapLite({ actions }: GameSettingsOrbittapLiteProps) {
  return (
    <>
      {/* Background Layers */}
      <div className="void-bg"></div>
      <div className="grid-bg"></div>
      {/* Simulated Gameplay Elements in Background (to show through blur) */}
      <div className="absolute w-32 h-32 rounded-full border-2 border-primary-container/30 left-1/4 top-1/4 -z-20 shadow-[0_0_20px_rgba(0,242,255,0.2)]"></div>
      <div className="absolute w-64 h-64 rounded-full border border-secondary-container/20 right-1/4 bottom-1/4 -z-20"></div>
      <div className="gameplay-blur"></div>
      {/* Navigation Shell - TopAppBar (Small, Mobile context assumed based on "Lite") */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-hud-padding pt-hud-padding max-w-full bg-transparent no-border flat no shadows transition-transform scale-95 active:scale-90 md:hidden">
      <div className="text-headline-lg-mobile font-headline-lg-mobile font-bold text-primary-fixed">ORBIT TAP LITE</div>
      <div className="flex items-center space-x-4">
      <button className="text-on-surface-variant hover:opacity-80 transition-opacity flex items-center justify-center" type="button" aria-label="Pause" data-action-id="pause-1" onClick={actions?.["pause-1"]}>
      <Pause  style={{fontVariationSettings: "'FILL' 0"}} aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* Main Content Canvas - Settings Modal */}
      <main className="relative z-10 w-full max-w-md px-container-margin md:px-0">
      <div className="glass-panel rounded-lg p-hud-padding flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
      <h1 className="font-headline-lg text-headline-lg md:font-headline-lg md:text-headline-lg text-primary-fixed">Settings</h1>
      <button aria-label="Close settings" className="text-on-surface-variant hover:text-primary-container transition-colors p-2 rounded-full hover:bg-surface-variant/30" type="button" data-action-id="close-settings-2" onClick={actions?.["close-settings-2"]}>
      <X aria-hidden={true} focusable="false" />
      </button>
      </div>
      {/* Difficulty Section */}
      <section className="flex flex-col gap-3">
      <h2 className="font-label-caps text-label-caps text-on-surface-variant">DIFFICULTY</h2>
      <div className="segment-control flex bg-surface-container-high rounded-full p-1 border border-outline-variant/50">
      <div className="flex-1 relative">
      <input defaultChecked={true} className="sr-only" id="diff-casual" name="difficulty" type="radio" />
      <label className="block w-full text-center py-2 rounded-full cursor-pointer text-sm font-semibold text-on-surface transition-colors border border-transparent" htmlFor="diff-casual">
                                  Casual
                              </label>
      </div>
      <div className="flex-1 relative">
      <input className="sr-only" id="diff-pilot" name="difficulty" type="radio" />
      <label className="block w-full text-center py-2 rounded-full cursor-pointer text-sm font-semibold text-on-surface transition-colors border border-transparent" htmlFor="diff-pilot">
                                  Pilot
                              </label>
      </div>
      <div className="flex-1 relative">
      <input className="sr-only" id="diff-ace" name="difficulty" type="radio" />
      <label className="block w-full text-center py-2 rounded-full cursor-pointer text-sm font-semibold text-on-surface transition-colors border border-transparent" htmlFor="diff-ace">
                                  Ace
                              </label>
      </div>
      </div>
      </section>
      {/* Audio Section */}
      <section className="flex flex-col gap-4">
      <h2 className="font-label-caps text-label-caps text-on-surface-variant">AUDIO</h2>
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-on-surface">
      <Volume2 className="text-on-surface-variant" aria-hidden={true} focusable="false" />
      <span>Sound Effects</span>
      </div>
      <div className="relative inline-block w-11 mr-2 align-middle select-none transition duration-200 ease-in">
      <input defaultChecked={true} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 opacity-0" id="sfx-toggle" name="toggle" type="checkbox" />
      <label className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer" htmlFor="sfx-toggle"></label>
      </div>
      </div>
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-on-surface">
      <AudioWaveform className="text-on-surface-variant" aria-hidden={true} focusable="false" />
      <span>Ambient Synth</span>
      </div>
      <div className="relative inline-block w-11 mr-2 align-middle select-none transition duration-200 ease-in">
      <input defaultChecked={true} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 opacity-0" id="music-toggle" name="toggle" type="checkbox" />
      <label className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer" htmlFor="music-toggle"></label>
      </div>
      </div>
      </section>
      {/* Input Help Section */}
      <section className="flex flex-col gap-3 pt-2 border-t border-outline-variant/30">
      <h2 className="font-label-caps text-label-caps text-on-surface-variant">INPUT COMMANDS</h2>
      <div className="grid grid-cols-2 gap-y-2 text-sm">
      <div className="text-on-surface-variant">Launch</div>
      <div className="text-right text-primary-fixed font-mono bg-surface-container-high px-2 py-0.5 rounded text-xs inline-block w-fit ml-auto">SPACE</div>
      <div className="text-on-surface-variant">Pause</div>
      <div className="text-right text-primary-fixed font-mono bg-surface-container-high px-2 py-0.5 rounded text-xs inline-block w-fit ml-auto">P</div>
      <div className="text-on-surface-variant">Restart</div>
      <div className="text-right text-primary-fixed font-mono bg-surface-container-high px-2 py-0.5 rounded text-xs inline-block w-fit ml-auto">R</div>
      </div>
      </section>
      {/* Actions */}
      <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-outline-variant/30">
      <button className="btn-neon w-full py-3 rounded-full font-bold text-center uppercase tracking-wider text-sm flex items-center justify-center gap-2" type="button" data-action-id="save-and-resume-3" onClick={actions?.["save-and-resume-3"]}>
      <Save  style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
                          Save &amp; Resume
                      </button>
      <button className="btn-ghost w-full py-3 rounded-full font-semibold text-center text-sm flex items-center justify-center gap-2" type="button" data-action-id="reset-high-score-4" onClick={actions?.["reset-high-score-4"]}>
      <RotateCcw aria-hidden={true} focusable="false" />
                          Reset High Score
                      </button>
      </div>
      </div>
      </main>
      {/* SideNavBar (Hidden on mobile, visible on desktop as context) */}
      {/* Suppressed active navigation here as this is a contextual overlay setting, not a top level destination. */}
      <nav className="hidden md:flex flex-col h-screen w-64 border-r border-outline-variant/30 bg-surface-container/30 backdrop-blur-xl shadow-[0_0_20px_rgba(0,219,231,0.2)] fixed left-0 top-0 z-40 transition-colors duration-300 ease-in-out p-hud-padding justify-between">
      <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
      <div className="font-headline-lg text-headline-lg text-primary-fixed">ORBITAL ZONE</div>
      <div className="text-on-surface-variant text-sm">Pilot ID: 8821</div>
      </div>
      <ul className="flex flex-col gap-2 font-label-caps text-label-caps">
      <li>
      <a className="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-colors" href="#" data-action-id="play-1" onClick={(event) => { event.preventDefault(); actions?.["play-1"]?.(); }}>
      <Play aria-hidden={true} focusable="false" />
                              Play
                          </a>
      </li>
      <li>
      <a className="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-colors" href="#" data-action-id="leaderboard-2" onClick={(event) => { event.preventDefault(); actions?.["leaderboard-2"]?.(); }}>
      <Trophy aria-hidden={true} focusable="false" />
                              Leaderboard
                          </a>
      </li>
      {/* Settings is the active context implicitly, but as an overlay, we might highlight it or keep it inactive depending on exact flow. Highlighted here for semantic match */}
      <li>
      <a className="flex items-center gap-3 p-3 rounded-lg bg-primary-container text-on-primary-container font-bold hover:bg-surface-variant/50 transition-colors" href="#" data-action-id="settings-3" onClick={(event) => { event.preventDefault(); actions?.["settings-3"]?.(); }}>
      <Settings  style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
                              Settings
                          </a>
      </li>
      <li>
      <a className="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-colors" href="#" data-action-id="profile-4" onClick={(event) => { event.preventDefault(); actions?.["profile-4"]?.(); }}>
      <User aria-hidden={true} focusable="false" />
                              Profile
                          </a>
      </li>
      </ul>
      </div>
      <button className="btn-ghost w-full py-3 rounded-full font-bold text-center text-xs uppercase tracking-wider" type="button" data-action-id="upgrade-pilot-5" onClick={actions?.["upgrade-pilot-5"]}>
                  UPGRADE PILOT
              </button>
      </nav>
    </>
  );
}
