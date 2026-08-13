import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CharacterId, GameProgress } from "../game/types";
import { layerIndex, questionReady, getClue } from "../game/clues";

const KEY = "three-rooms-progress-v2";

const empty: GameProgress = {
  found: [],
  seenLayer: {},
  unlockedQuestion: [],
  finished: [],
  entered: [],
};

function load(): GameProgress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = { ...empty, ...JSON.parse(raw) } as GameProgress;
    parsed.seenLayer = parsed.seenLayer ?? {};
    return parsed;
  } catch {
    return empty;
  }
}

function save(p: GameProgress) {
  localStorage.setItem(KEY, JSON.stringify(p));
}

interface GameApi {
  progress: GameProgress;
  foundSet: Set<string>;
  markEntered: (id: CharacterId) => void;
  recordClue: (id: string) => { updated: boolean; layer: number };
  markFinished: (id: CharacterId) => void;
  reset: () => void;
  canAsk: (id: CharacterId) => boolean;
  confirmedLayer: (id: string) => number;
}

const Ctx = createContext<GameApi | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<GameProgress>(load);

  const foundSet = useMemo(() => new Set(progress.found), [progress.found]);

  const markEntered = useCallback((id: CharacterId) => {
    setProgress((p) => {
      if (p.entered.includes(id)) return p;
      const next = { ...p, entered: [...p.entered, id] };
      save(next);
      return next;
    });
  }, []);

  const recordClue = useCallback((id: string) => {
    let result = { updated: false, layer: 0 };
    setProgress((p) => {
      const clue = getClue(id);
      const found = new Set(p.found);
      found.add(id);
      const layer = clue ? layerIndex(clue, found) : 0;
      const prev = p.seenLayer[id];
      result = { updated: prev !== undefined && layer > prev, layer };
      const next: GameProgress = {
        ...p,
        found: [...found],
        seenLayer: { ...p.seenLayer, [id]: layer },
      };
      const char = clue?.characterId;
      if (char && questionReady(char, found, next.seenLayer) && !next.unlockedQuestion.includes(char)) {
        next.unlockedQuestion = [...next.unlockedQuestion, char];
      }
      save(next);
      return next;
    });
    return result;
  }, []);

  const markFinished = useCallback((id: CharacterId) => {
    setProgress((p) => {
      if (p.finished.includes(id)) return p;
      const next = { ...p, finished: [...p.finished, id] };
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    save(empty);
    setProgress(empty);
  }, []);

  const canAsk = useCallback(
    (id: CharacterId) =>
      progress.unlockedQuestion.includes(id) ||
      questionReady(id, foundSet, progress.seenLayer),
    [progress.unlockedQuestion, progress.seenLayer, foundSet],
  );

  const confirmedLayer = useCallback(
    (id: string) => (id in progress.seenLayer ? progress.seenLayer[id] : -1),
    [progress.seenLayer],
  );

  const value = useMemo(
    () => ({
      progress,
      foundSet,
      markEntered,
      recordClue,
      markFinished,
      reset,
      canAsk,
      confirmedLayer,
    }),
    [progress, foundSet, markEntered, recordClue, markFinished, reset, canAsk, confirmedLayer],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useGame() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useGame");
  return ctx;
}
