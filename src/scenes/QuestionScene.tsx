import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCharacter } from "../game/characters";
import { REALIZATIONS } from "../game/realizations";
import { sfx } from "../audio/sfx";
import { useGame } from "../store/GameProvider";

export default function QuestionScene() {
  const { id } = useParams();
  const nav = useNavigate();
  const ch = getCharacter(id);
  const { markFinished, progress } = useGame();
  const [step, setStep] = useState(0);

  if (!ch) return null;
  const data = REALIZATIONS[ch.id];
  const total = data.beats.length + 1;
  const done = step >= total;

  const advance = () => {
    if (!done) {
      sfx(ch.id === "young" ? "page" : ch.id === "yousang" ? "click" : "key");
      const next = step + 1;
      setStep(next);
      if (next >= total) markFinished(ch.id);
      return;
    }
    if (progress.finished.length + (progress.finished.includes(ch.id) ? 0 : 1) >= 3) {
      nav("/epilogue");
      return;
    }
    nav("/select");
  };

  return (
    <section className={`scene question-scene is-${ch.id}`} data-character={ch.id} onClick={advance}>
      <p className="kicker">{ch.district}</p>
      <h2 className="q-title">{data.question}</h2>

      <div className="q-beats">
        {data.beats.slice(0, Math.min(step, data.beats.length)).map((b, i) => (
          <p key={i} className="beat">
            {b.text}
          </p>
        ))}
        {step > data.beats.length && <p className="beat last">“{data.last}”</p>}
      </div>

      <p className="q-hint">{done ? "현장을 나온다" : "눌러서 읽는다"}</p>
    </section>
  );
}
