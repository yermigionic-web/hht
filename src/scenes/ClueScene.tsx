import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Inspect } from "../components/Inspect";
import { ThemePatch } from "../components/ThemePatch";
import { getCharacter } from "../game/characters";
import { getClue, layerIndex } from "../game/clues";
import { sfx } from "../audio/sfx";
import { useGame } from "../store/GameProvider";

export default function ClueScene() {
  const { id, clueId } = useParams();
  const nav = useNavigate();
  const ch = getCharacter(id);
  const clue = getClue(clueId);
  const { foundSet, recordClue, confirmedLayer } = useGame();
  const [apps, setApps] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (id) nav(`/room/${id}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [id, nav]);

  if (!ch || !clue || clue.characterId !== ch.id) return null;

  const liveLayer = layerIndex(clue, foundSet);
  const stored = confirmedLayer(clue.id);
  const phone = clue.inspect.kind === "phone" ? clue.inspect.apps : [];
  const needApps = phone.length === 0 ? 0 : Math.min(2, phone.length);
  const lookedInside = needApps === 0 || apps.size >= needApps;
  const needsUpdate = stored >= 0 && liveLayer > stored;
  const inNotebook = stored === liveLayer && stored >= 0;
  const done = inNotebook || saved;
  const leave = () => nav(`/room/${ch.id}`);

  const save = () => {
    if (!lookedInside) return;
    const { updated } = recordClue(clue.id);
    sfx(updated ? "notify" : "click");
    setSaved(true);
  };

  const showLive = done || (lookedInside && (stored < 0 || needsUpdate));
  const layer = showLive ? liveLayer : Math.max(stored, 0);
  const reading = clue.layers[layer];

  return (
    <section className={`scene clue-scene is-${ch.id}`} data-character={ch.id}>
      <ThemePatch id={ch.id} />
      <header className="clue-hud">
        <button type="button" className="ghost" onClick={leave}>
          방으로
        </button>
        <p className="clue-name">{clue.name}</p>
        <span className={`layer-pip l${Math.max(stored, 0)}`}>
          {done ? `${liveLayer + 1}/3` : stored < 0 ? "안 적음" : `${stored + 1}/3`}
        </span>
      </header>

      <div className="clue-split">
        <div className="clue-object">
          <Inspect
            data={clue.inspect}
            onOpenApp={(appId) => setApps((prev) => new Set(prev).add(appId))}
          />
        </div>
        <aside className="clue-read">
          {needsUpdate && !done && (
            <p className="updated">겹친다. 다시 열어 적는다.</p>
          )}
          {stored >= 0 && needsUpdate && !showLive && (
            <>
              <p className="thought">{clue.layers[stored].thought}</p>
              <p className="detail">{clue.layers[stored].detail}</p>
            </>
          )}
          {showLive && (
            <>
              {layer > 0 && (
                <ol className="layer-trail">
                  {clue.layers.slice(0, layer).map((l, i) => (
                    <li key={i}>
                      <s>{l.thought}</s>
                    </li>
                  ))}
                </ol>
              )}
              <p className="thought">{reading.thought}</p>
              <p className="detail">{reading.detail}</p>
            </>
          )}
          {!lookedInside && (
            <p className="more">안을 안 열면 빈 껍데다.</p>
          )}
          {lookedInside && !done && stored < 0 && (
            <p className="more">적어야 남는다. 본 것만으로는 증발한다.</p>
          )}

          {done ? (
            <button type="button" className="record-btn done" onClick={leave}>
              문을 닫는다
            </button>
          ) : (
            <button type="button" className="record-btn" disabled={!lookedInside} onClick={save}>
              {needsUpdate ? "겹친 걸 다시 적는다" : "이 물건을 기록한다"}
            </button>
          )}
        </aside>
      </div>
    </section>
  );
}
