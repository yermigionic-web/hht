import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CharacterId } from "../game/types";
import { CHARACTERS } from "../game/characters";
import { resumeAudio } from "./sfx";

interface AudioApi {
  muted: boolean;
  toggleMute: () => void;
  playBgm: (id: CharacterId | "title" | null) => void;
  unlocked: boolean;
  unlock: () => void;
}

const Ctx = createContext<AudioApi | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const current = useRef<CharacterId | "title" | null>(null);
  const nodes = useRef<Record<string, HTMLAudioElement>>({});
  const mutedRef = useRef(false);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const unlock = useCallback(() => {
    resumeAudio();
    setUnlocked(true);
  }, []);

  const fade = (el: HTMLAudioElement, to: number, ms: number) => {
    const from = el.volume;
    const steps = 16;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      const v = from + (to - from) * (i / steps);
      el.volume = Math.min(1, Math.max(0, v));
      if (i >= steps) {
        clearInterval(id);
        if (to === 0) {
          el.pause();
        }
      }
    }, ms / steps);
  };

  const playBgm = useCallback((id: CharacterId | "title" | null) => {
    if (current.current === id) return;
    const prev = current.current;
    current.current = id;

    if (prev && nodes.current[prev]) {
      fade(nodes.current[prev], 0, 900);
    }
    if (!id || id === "title") return;

    const ch = CHARACTERS.find((c) => c.id === id);
    if (!ch) return;
    let el = nodes.current[id];
    if (!el) {
      el = new Audio(ch.bgm);
      el.loop = true;
      el.preload = "auto";
      nodes.current[id] = el;
    }
    el.volume = 0;
    const p = el.play();
    if (p) p.catch(() => {});
    fade(el, mutedRef.current ? 0 : 0.32, 1000);
  }, []);

  useEffect(() => {
    Object.values(nodes.current).forEach((el) => {
      if (!el.paused) fade(el, muted ? 0 : 0.32, 300);
    });
  }, [muted]);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  return (
    <Ctx.Provider value={{ muted, toggleMute, playBgm, unlocked, unlock }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio");
  return ctx;
}
