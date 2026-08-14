import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCharacter } from "../game/characters";
import { cluesFor, isRevealed, layerIndex } from "../game/clues";
import { ThemePatch } from "../components/ThemePatch";
import { useAudio } from "../audio/AudioProvider";
import { sfx } from "../audio/sfx";
import { useGame } from "../store/GameProvider";

export default function RoomScene() {
  const { id } = useParams();
  const nav = useNavigate();
  const ch = getCharacter(id);
  const { playBgm, unlock } = useAudio();
  const { foundSet, markEntered, canAsk, confirmedLayer } = useGame();
  const [cursor, setCursor] = useState<{ x: number; y: number; name: string } | null>(null);

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
      <ThemePatch id={ch.id} />
      <div className="room-plate">
        <img className="room-art" src={ch.room} alt={`${ch.name}의 방`} draggable={false} />
        <div className="room-shade" />

        {visible.map((clue) => {
          const layer = layerIndex(clue, foundSet);
          const stored = confirmedLayer(clue.id);
          const found = stored >= 0;
          const updated = found && layer > stored;
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
              onMouseLeave={() => setCursor(null)}
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
          다른 집
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
        <p className="room-hint">열어 적는다. 보기만 하면 증발한다.</p>
        {canAsk(ch.id) ? (
          <button
            type="button"
            className="ask-btn"
            onClick={() => {
              sfx("whoosh");
              nav(`/room/${ch.id}/question`);
            }}
          >
            나는 이 여자의 인생에서 어떤 사람이었는가.
          </button>
        ) : (
          <p className="ask-wait">손이 아직 덜 갔다.</p>
        )}
      </footer>
    </section>
  );
}
