import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EPILOGUE } from "../game/realizations";
import { sfx } from "../audio/sfx";
import { useGame } from "../store/GameProvider";

export default function EpilogueScene() {
  const nav = useNavigate();
  const { reset } = useGame();
  const [step, setStep] = useState(0);
  const done = step >= EPILOGUE.length;

  const advance = () => {
    if (!done) {
      sfx("page");
      setStep((s) => s + 1);
      return;
    }
    nav("/select");
  };

  return (
    <section className="scene epilogue-scene" onClick={advance}>
      <p className="kicker">SEOUL · 2026</p>
      <div className="q-beats">
        {EPILOGUE.slice(0, step).map((t, i) => (
          <p key={i} className="beat">
            {t}
          </p>
        ))}
      </div>
      {done && (
        <div className="epi-actions" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="select-enter" onClick={() => nav("/select")}>
            현장으로
          </button>
          <button
            type="button"
            className="ghost"
            onClick={() => {
              reset();
              nav("/");
            }}
          >
            기록을 지운다
          </button>
        </div>
      )}
      {!done && <p className="q-hint">눌러서 읽는다</p>}
    </section>
  );
}
