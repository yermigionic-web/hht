import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CHARACTERS, ORDER } from "../game/characters";
import { useAudio } from "../audio/AudioProvider";
import { enterSfx, switchSfx, sfx } from "../audio/sfx";
import { useGame } from "../store/GameProvider";

export default function SelectScene() {
  const nav = useNavigate();
  const { playBgm, unlock } = useAudio();
  const { progress } = useGame();
  const [index, setIndex] = useState(0);
  const touch = useRef<{ x: number } | null>(null);
  const ch = CHARACTERS[index];

  useEffect(() => {
    unlock();
    playBgm(ch.id);
    switchSfx(ch.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ch.id]);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + ORDER.length) % ORDER.length);
    },
    [],
  );

  const enter = useCallback(() => {
    enterSfx(ch.id);
    nav(`/room/${ch.id}`);
  }, [ch.id, nav]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") go(-1);
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") go(1);
      if (e.key === "Enter") enter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, enter]);

  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touch.current = null;
  };

  return (
    <section
      className={`scene select-scene is-${ch.id}`}
      data-character={ch.id}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {CHARACTERS.map((c) => (
        <div
          key={c.id}
          className={`select-bg ${c.id === ch.id ? "on" : ""}`}
          style={{ backgroundImage: `url(${c.backdrop})` }}
        />
      ))}
      <div className="select-fx" aria-hidden />

      <header className="select-top">
        <p className="kicker">현장 선택</p>
        <p className="select-sub">공략 상대가 아니다. 들어갈 방이다.</p>
      </header>

      <div className="stage-world">
        <button type="button" className="nav-arrow left" onClick={() => go(-1)} aria-label="이전">
          ‹
        </button>

        <div className="stage-rig">
          {CHARACTERS.map((c, i) => {
            const off = i - index;
            const wrapped = off === 2 ? -1 : off === -2 ? 1 : off;
            const active = i === index;
            return (
              <div
                key={c.id}
                className={`figure-slot ${active ? "active" : "idle"} side-${wrapped}`}
              >
                <div className="figure-spin">
                  <img src={c.figure} alt={c.name} draggable={false} />
                </div>
              </div>
            );
          })}
          <div className="stage-plate">
            <div className="stage-ring" />
            <div className="stage-light" />
          </div>
        </div>

        <button type="button" className="nav-arrow right" onClick={() => go(1)} aria-label="다음">
          ›
        </button>
      </div>

      <aside className="select-meta">
        <p className="select-place">
          {ch.district} · {ch.place}
        </p>
        <h2 className="select-name">{ch.name}</h2>
        <p className="select-job">
          {ch.age} · {ch.job}
        </p>
        <blockquote className="select-quote">“{ch.quote}”</blockquote>
        <button type="button" className="select-enter" onClick={enter}>
          {ch.enterLabel}
        </button>
        <div className="select-pips">
          {CHARACTERS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={`pip ${i === index ? "on" : ""} ${progress.finished.includes(c.id) ? "done" : ""} ${progress.entered.includes(c.id) ? "seen" : ""}`}
              onClick={() => {
                sfx("click");
                setIndex(i);
              }}
              aria-label={c.name}
            />
          ))}
        </div>
      </aside>

      {progress.finished.length === 3 && (
        <button type="button" className="epilogue-link" onClick={() => nav("/epilogue")}>
          세 개의 답이 모였다
        </button>
      )}
    </section>
  );
}
