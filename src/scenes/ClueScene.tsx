import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Inspect } from "../components/Inspect";
import { getCharacter } from "../game/characters";
import { getClue, layerIndex } from "../game/clues";
import { sfx } from "../audio/sfx";
import { useGame } from "../store/GameProvider";

export default function ClueScene() {
  const { id, clueId } = useParams();
  const nav = useNavigate();
  const ch = getCharacter(id);
  const clue = getClue(clueId);
  const { foundSet, findClue } = useGame();
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!clue) return;
    const { updated } = findClue(clue.id);
    if (updated) {
      setFlash(true);
      sfx("notify");
    }
    // only on mount for this clue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clue?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Backspace") {
        e.preventDefault();
        leave();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!ch || !clue || clue.characterId !== ch.id) return null;

  const layer = layerIndex(clue, foundSet);
  const reading = clue.layers[layer];

  const leave = () => nav(`/room/${ch.id}`);

  return (
    <section className={`scene clue-scene is-${ch.id}`} data-character={ch.id}>
      <header className="clue-hud">
        <button type="button" className="ghost" onClick={leave}>
          방으로
        </button>
        <p className="clue-name">{clue.name}</p>
        <span className={`layer-pip l${layer}`}>{layer + 1}/3</span>
      </header>

      <div className="clue-split">
        <div className="clue-object">
          <Inspect data={clue.inspect} />
        </div>
        <aside className={`clue-read ${flash ? "flash" : ""}`}>
          {flash && <p className="updated">기록이 갱신되었다</p>}
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
          {layer === 0 && (
            <p className="more">다른 물건을 보면 이 단서의 의미가 달라질 수 있다.</p>
          )}
        </aside>
      </div>
    </section>
  );
}
