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
import { resumeAudio, setSfxMuted } from "./sfx";

const BGM_VOL = 0.32;

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
  const fades = useRef<Map<HTMLAudioElement, number>>(new Map());
  const mutedRef = useRef(false);

  useEffect(() => {
    mutedRef.current = muted;
    setSfxMuted(muted);
  }, [muted]);

  const stopFade = (el: HTMLAudioElement) => {
    const id = fades.current.get(el);
    if (id) {
      window.clearInterval(id);
      fades.current.delete(el);
    }
  };

  const fade = (el: HTMLAudioElement, to: number, ms: number, then?: () => void) => {
    stopFade(el);
    const from = el.volume;
    const t0 = performance.now();
    const id = window.setInterval(() => {
      const p = Math.min(1, (performance.now() - t0) / ms);
      el.volume = from + (to - from) * p;
      if (p >= 1) {
        window.clearInterval(id);
        fades.current.delete(el);
        el.volume = to;
        then?.();
      }
    }, 32);
    fades.current.set(el, id);
  };

  const unlock = useCallback(() => {
    resumeAudio();
    setUnlocked(true);
  }, []);

  const startTrack = useCallback((el: HTMLAudioElement) => {
    stopFade(el);
    if (mutedRef.current) {
      el.volume = 0;
      el.pause();
      return;
    }
    el.volume = Math.min(el.volume, 0.001);
    const play = el.play();
    if (play) play.catch(() => {});
    fade(el, BGM_VOL, 700);
  }, []);

  const playBgm = useCallback(
    (id: CharacterId | "title" | null) => {
      if (current.current === id) {
        const same = id && id !== "title" ? nodes.current[id] : undefined;
        if (same && same.paused && !mutedRef.current) startTrack(same);
        return;
      }

      const prev = current.current;
      current.current = id;

      if (prev && nodes.current[prev]) {
        const old = nodes.current[prev];
        fade(old, 0, 600, () => {
          if (current.current !== prev) old.pause();
        });
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
      startTrack(el);
    },
    [startTrack],
  );

  useEffect(() => {
    const id = current.current;
    if (!id || id === "title") return;
    const el = nodes.current[id];
    if (!el) return;
    if (muted) {
      fade(el, 0, 280, () => {
        if (mutedRef.current) el.pause();
      });
    } else {
      startTrack(el);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
