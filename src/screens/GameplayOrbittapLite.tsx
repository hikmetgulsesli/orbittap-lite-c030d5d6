// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Gameplay - OrbitTap Lite
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Pause } from "lucide-react";


export type GameplayOrbittapLiteActionId = "pause-1" | "tap-to-launch-2";

export interface GameplayOrbittapLiteProps {
  actions?: Partial<Record<GameplayOrbittapLiteActionId, () => void>>;
  runtime?: { player?: { lane?: number; position?: number }; obstacles?: Array<{ lane?: number; position?: number }>; shards?: Array<{ lane?: number; position?: number }>; score?: number; energy?: number; lives?: number; paused?: boolean };

}

export function GameplayOrbittapLite({ actions, runtime }: GameplayOrbittapLiteProps) {
  void runtime;
  return (
    <>
      {/* Background Layers */}
      <div className="absolute inset-0 starfield z-0 pointer-events-none"></div>
      <div className="absolute inset-0 grid-bg z-0 pointer-events-none"></div>
      {/* Top App Bar (HUD) */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-hud-padding pt-hud-padding max-w-full bg-transparent">
      <div className="flex flex-col">
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary-fixed md:hidden">ORBIT TAP LITE</h1>
      <h1 className="font-headline-lg text-headline-lg font-bold text-primary-fixed hidden md:block">ORBIT TAP LITE</h1>
      <div className="hud-panel rounded-lg px-4 py-2 mt-2 flex items-center gap-4 w-fit">
      <div>
      <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase">Score</span>
      <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary-fixed">1,240</span>
      </div>
      <div className="h-8 w-px bg-outline-variant/50"></div>
      <div>
      <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase">Best</span>
      <span className="font-body-md text-body-md text-on-surface">5,800</span>
      </div>
      </div>
      </div>
      <div className="flex flex-col items-end gap-2">
      <button className="h-12 w-12 rounded-full border border-primary-container/50 bg-surface-container/30 backdrop-blur-md flex items-center justify-center text-primary-fixed hover:opacity-80 transition-opacity scale-95 active:scale-90 shadow-[0_0_15px_rgba(0,219,231,0.2)]" type="button" aria-label="Pause" data-action-id="pause-1" onClick={actions?.["pause-1"]}>
      <Pause  data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
      </button>
      <div className="hud-panel rounded-full px-3 py-1">
      <span className="font-label-caps text-label-caps text-tertiary-container uppercase tracking-widest">Level 4</span>
      </div>
      </div>
      </header>
      {/* Playfield / Canvas */}
      <main className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
      {/* Central Launch Pad */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 bg-surface-variant rounded-full border-2 border-primary-container shadow-[0_0_20px_rgba(0,242,255,0.5)] z-20 flex items-center justify-center">
      <div className="w-8 h-8 md:w-12 md:h-12 bg-primary-fixed rounded-full shadow-[0_0_15px_rgba(116,245,255,0.8)] animate-pulse"></div>
      </div>
      {/* Ring 1 (Inner, Inactive) */}
      <div className="ring-base ring-inactive w-[120px] h-[120px] md:w-[200px] md:h-[200px] z-10">
      <div className="hazard" style={{top: "50%", left: "-8.5px", transform: "translateY(-50%)"}}></div>
      </div>
      {/* Ring 2 (Active, Target) */}
      <div className="ring-base ring-active w-[200px] h-[200px] md:w-[320px] md:h-[320px] z-10" style={{animationDuration: "8s", animationDirection: "reverse"}}>
      <div className="gap" style={{top: "50%", left: "100%", transform: "translate(-50%, -50%) rotate(90deg)"}}></div>
      <div className="spark" style={{top: "20%", left: "80%"}}></div>
      </div>
      {/* Ring 3 (Outer, Inactive) */}
      <div className="ring-base ring-inactive w-[280px] h-[280px] md:w-[460px] md:h-[460px] z-10" style={{animationDuration: "20s"}}>
      <div className="hazard" style={{top: "10%", left: "20%"}}></div>
      <div className="hazard" style={{bottom: "10%", right: "20%"}}></div>
      </div>
      </div>
      </main>
      {/* Bottom Action */}
      <div className="fixed bottom-container-margin left-1/2 transform -translate-x-1/2 z-50 w-full px-hud-padding max-w-sm flex justify-center">
      <button className="w-full py-4 rounded-full bg-primary-container text-on-primary-fixed font-headline-lg-mobile text-headline-lg-mobile shadow-[0_0_20px_rgba(0,242,255,0.6)] hover:bg-primary-fixed hover:scale-105 active:scale-95 transition-colors duration-200" type="button" data-action-id="tap-to-launch-2" onClick={actions?.["tap-to-launch-2"]}>
                  TAP TO LAUNCH
              </button>
      </div>
    </>
  );
}
