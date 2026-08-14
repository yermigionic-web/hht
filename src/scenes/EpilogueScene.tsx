import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EPILOGUE } from "../game/realizations";
import { sfx } from "../audio/sfx";
import { useGame } from "../store/GameProvider";

export default function EpilogueScene() {
  const nav = useNavigate();
  const { reset } = useGame();
  const [step, setStep] = useState(0);
  const shown = step + 1;
  const done = shown >= EPILOGUE.length;

  const next = () => {
    if (!done) {
      sfx("page");
      setStep((s) => s + 1);
      return;
    }
    nav("/select");
  };

  return (
    <section className="scene epilogue-scene">
      <p className="kicker">SEOUL · 2026</p>
      <div className="q-beats">
        {EPILOGUE.slice(0, shown).map((t, i) => (
          <p key={i} className="beat">
            {t}
          </p>
        ))}
      </div>
      {done ? (
        <div className="epi-actions">
          <button type="button" className="select-enter" onClick={() => nav("/select")}>
            다른 집
          </button>
          <button
            type="button"
            className="ghost"
            onClick={() => {
              reset();
              nav("/");
            }}
          >
            적힌 걸 지운다
          </button>
        </div>
      ) : (
        <button type="button" className="record-btn" onClick={next}>
          다음
        </button>
      )}
    </section>
  );
}
