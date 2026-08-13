import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCharacter } from "../game/characters";
import { cluesFor, isRevealed, layerIndex } from "../game/clues";
import { useAudio } from "../audio/AudioProvider";
import { sfx } from "../audio/sfx";
import { useGame } from "../store/GameProvider";

export default function RoomScene() {
  const { id } = useParams();
  const nav = useNavigate();
  const ch = getCharacter(id);
  const { playBgm, unlock } = useAudio();
  const { foundSet, markEntered, canAsk, progress } = useGame();
  const [cursor, setCursor] = useState<{ x: number; y: number; name: string } | null>(null);
  const [par, setPar] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ch) return;
    unlock();
    playBgm(ch.id);
    markEntered(ch.id);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") nav("/select");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ch, unlock, playBgm, markEntered, nav]);

  const clues = useMemo(() => (ch ? cluesFor(ch.id) : []), [ch]);
  const visible = clues.filter((c) => isRevealed(c, foundSet));
  const foundCount = visible.filter((c) => foundSet.has(c.id)).length;

  if (!ch) return null;

  return (
    <section className={`scene room-scene is-${ch.id}`} data-character={ch.id}>
      <div
        className="room-plate"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPar({
            x: ((e.clientX - r.left) / r.width - 0.5) * 12,
            y: ((e.clientY - r.top) / r.height - 0.5) * 8,
          });
        }}
        onMouseLeave={() => {
          setCursor(null);
          setPar({ x: 0, y: 0 });
        }}
      >
        <img
          className="room-art"
          src={ch.room}
          alt={`${ch.name}의 방`}
          style={{ transform: `scale(1.06) translate(${par.x}px, ${par.y}px)` }}
          draggable={false}
        />
        <div className="room-shade" />

        {visible.map((clue) => {
          const found = foundSet.has(clue.id);
          const layer = layerIndex(clue, foundSet);
          const updated = found && layer > (progress.seenLayer[clue.id] ?? 0);
          return (
            <button
              key={clue.id}
              type="button"
              className={`hotspot ${found ? "found" : ""} ${updated ? "updated" : ""}`}
              style={{
                left: `${clue.x}%`,
                top: `${clue.y}%`,
                width: `${clue.w}%`,
                height: `${clue.h}%`,
              }}
              onMouseEnter={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                const parent = e.currentTarget.parentElement!.getBoundingClientRect();
                setCursor({
                  x: r.left - parent.left + r.width / 2,
                  y: r.top - parent.top,
                  name: clue.name,
                });
              }}
              onClick={() => {
                sfx(ch.id === "nahyeon" ? "key" : ch.id === "yousang" ? "click" : "page");
                nav(`/room/${ch.id}/clue/${clue.id}`);
              }}
              aria-label={clue.name}
            />
          );
        })}

        {cursor && (
          <div className="hot-label" style={{ left: cursor.x, top: cursor.y }}>
            {cursor.name}
          </div>
        )}
      </div>

      <header className="room-hud top">
        <button type="button" className="ghost" onClick={() => nav("/select")}>
          현장 목록
        </button>
        <div className="room-id">
          <p className="kicker">
            {ch.district} · {ch.place}
          </p>
          <h2>{ch.name}</h2>
        </div>
        <button type="button" className="ghost" onClick={() => nav(`/room/${ch.id}/record`)}>
          기록 {foundCount}/{visible.length}
        </button>
      </header>

      <footer className="room-hud bottom">
        <p className="room-hint">물건을 조사한다. 단서는 다시 보면 달라질 수 있다.</p>
        {canAsk(ch.id) && (
          <button
            type="button"
            className="ask-btn"
            onClick={() => {
              sfx("whoosh");
              nav(`/room/${ch.id}/question`);
            }}
          >
            나는 이 여자의 인생에서 대체 어떤 사람이었는가?
          </button>
        )}
      </footer>
    </section>
  );
}
