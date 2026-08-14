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

const BGM_VOL = 0.32;

interface AudioApi {
  track: CharacterId | null;
  playing: boolean;
  progress: number;
  playBgm: (id: CharacterId | "title" | null) => void;
  pause: () => void;
  resume: () => void;
  toggle: () => void;
  restart: () => void;
  seek: (ratio: number) => void;
  unlocked: boolean;
  unlock: () => void;
}

const Ctx = createContext<AudioApi | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState<CharacterId | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const current = useRef<CharacterId | "title" | null>(null);
  const nodes = useRef<Partial<Record<CharacterId, HTMLAudioElement>>>({});
  const fades = useRef<Map<HTMLAudioElement, number>>(new Map());
  const pausedRef = useRef(false);

  const getEl = useCallback(() => {
    const id = current.current;
    if (!id || id === "title") return undefined;
    return nodes.current[id];
  }, []);

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
    if (pausedRef.current) {
      el.pause();
      setPlaying(false);
      return;
    }
    el.volume = Math.min(el.volume || 0, 0.001);
    const play = el.play();
    if (play) play.catch(() => {});
    fade(el, BGM_VOL, 700);
    setPlaying(true);
  }, []);

  const playBgm = useCallback(
    (id: CharacterId | "title" | null) => {
      if (current.current === id) {
        const same = id && id !== "title" ? nodes.current[id] : undefined;
        if (same && same.paused && !pausedRef.current) startTrack(same);
        return;
      }

      const prev = current.current;
      current.current = id;
      setTrack(id && id !== "title" ? id : null);

      if (prev && prev !== "title" && nodes.current[prev]) {
        const old = nodes.current[prev];
        fade(old, 0, 600, () => {
          if (current.current !== prev) old.pause();
        });
      }

      if (!id || id === "title") {
        setPlaying(false);
        setProgress(0);
        return;
      }

      pausedRef.current = false;
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

  const pause = useCallback(() => {
    pausedRef.current = true;
    setPlaying(false);
    const el = getEl();
    if (!el) return;
    fade(el, 0, 220, () => {
      if (pausedRef.current) el.pause();
    });
  }, [getEl]);

  const resume = useCallback(() => {
    unlock();
    pausedRef.current = false;
    const el = getEl();
    if (el) startTrack(el);
    else setPlaying(false);
  }, [getEl, startTrack, unlock]);

  const toggle = useCallback(() => {
    if (pausedRef.current || !playing) resume();
    else pause();
  }, [pause, playing, resume]);

  const restart = useCallback(() => {
    unlock();
    const el = getEl();
    if (!el) return;
    el.currentTime = 0;
    setProgress(0);
    pausedRef.current = false;
    startTrack(el);
  }, [getEl, startTrack, unlock]);

  const seek = useCallback(
    (ratio: number) => {
      const el = getEl();
      if (!el || !el.duration || !Number.isFinite(el.duration)) return;
      el.currentTime = Math.min(1, Math.max(0, ratio)) * el.duration;
      setProgress(el.duration ? el.currentTime / el.duration : 0);
    },
    [getEl],
  );

  useEffect(() => {
    const tick = () => {
      const el = getEl();
      if (!el || !el.duration || !Number.isFinite(el.duration)) return;
      setProgress(el.currentTime / el.duration);
      setPlaying(!el.paused && !pausedRef.current);
    };
    const id = window.setInterval(tick, 240);
    return () => window.clearInterval(id);
  }, [getEl, track]);

  return (
    <Ctx.Provider
      value={{
        track,
        playing,
        progress,
        playBgm,
        pause,
        resume,
        toggle,
        restart,
        seek,
        unlocked,
        unlock,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio");
  return ctx;
}
