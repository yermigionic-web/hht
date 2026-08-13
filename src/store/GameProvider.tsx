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

const KEY = "three-rooms-progress-v1";

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
    return { ...empty, ...JSON.parse(raw) };
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
  findClue: (id: string) => { updated: boolean; layer: number };
  markQuestion: (id: CharacterId) => void;
  markFinished: (id: CharacterId) => void;
  reset: () => void;
  canAsk: (id: CharacterId) => boolean;
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

  const findClue = useCallback((id: string) => {
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
      if (char && questionReady(char, found) && !next.unlockedQuestion.includes(char)) {
        next.unlockedQuestion = [...next.unlockedQuestion, char];
      }
      save(next);
      return next;
    });
    return result;
  }, []);

  const markQuestion = useCallback((id: CharacterId) => {
    setProgress((p) => {
      if (p.unlockedQuestion.includes(id)) return p;
      const next = { ...p, unlockedQuestion: [...p.unlockedQuestion, id] };
      save(next);
      return next;
    });
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
      progress.unlockedQuestion.includes(id) || questionReady(id, foundSet),
    [progress.unlockedQuestion, foundSet],
  );

  const value = useMemo(
    () => ({
      progress,
      foundSet,
      markEntered,
      findClue,
      markQuestion,
      markFinished,
      reset,
      canAsk,
    }),
    [progress, foundSet, markEntered, findClue, markQuestion, markFinished, reset, canAsk],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useGame() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useGame");
  return ctx;
}
