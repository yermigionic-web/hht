import { useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getCharacter } from "../game/characters";
import { cluesFor, inferencesFor } from "../game/clues";
import { REALIZATIONS } from "../game/realizations";
import { sfx } from "../audio/sfx";
import { useGame } from "../store/GameProvider";

export default function QuestionScene() {
  const { id } = useParams();
  const nav = useNavigate();
  const ch = getCharacter(id);
  const { markFinished, progress, canAsk, foundSet } = useGame();
  const [step, setStep] = useState(0);

  const lines = useMemo(() => {
    if (!ch) return [];
    const seen = progress.seenLayer;
    const evidence = cluesFor(ch.id)
      .filter((c) => foundSet.has(c.id) && (seen[c.id] ?? -1) >= 0)
      .map((c) => {
        const layer = Math.min(seen[c.id] ?? 0, 2);
        return `${c.name} — ${c.layers[layer].thought}`;
      });
    const inf = inferencesFor(ch.id)
      .filter((i) => i.require.every((r) => foundSet.has(r)))
      .map((i) => i.text);
    const data = REALIZATIONS[ch.id];
    return [data.question, ...evidence, ...inf, `“${data.last}”`];
  }, [ch, foundSet, progress.seenLayer]);

  if (!ch) return null;
  if (!canAsk(ch.id) && !progress.finished.includes(ch.id)) {
    return <Navigate to={`/room/${ch.id}`} replace />;
  }

  const shown = step + 1;
  const done = shown >= lines.length;

  const next = () => {
    if (!done) {
      sfx(ch.id === "young" ? "page" : ch.id === "yousang" ? "click" : "key");
      const n = step + 1;
      setStep(n);
      if (n + 1 >= lines.length) markFinished(ch.id);
      return;
    }
    if (progress.finished.length >= 3) nav("/epilogue");
    else nav("/select");
  };

  return (
    <section className={`scene question-scene is-${ch.id}`} data-character={ch.id}>
      <p className="kicker">
        {ch.district} · {ch.place}
      </p>
      <div className="q-beats">
        {lines.slice(0, shown).map((text, i) => (
          <p
            key={i}
            className={`beat ${i === 0 ? "beat-q" : ""} ${i === lines.length - 1 && done ? "last" : ""}`}
          >
            {text}
          </p>
        ))}
        {step === 0 && (
          <p className="q-gate">열어 기록한 물건만 이 질문에 답한다. 건너뛸 수 없다.</p>
        )}
      </div>
      <button type="button" className="record-btn" onClick={next}>
        {step === 0 ? "기록을 펼친다" : done ? "현장을 나온다" : "다음 기록"}
      </button>
    </section>
  );
}
