import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCharacter } from "../game/characters";
import { cluesFor, inferencesFor, isRevealed } from "../game/clues";
import { ThemePatch } from "../components/ThemePatch";
import { useGame } from "../store/GameProvider";

export default function RecordScene() {
  const { id } = useParams();
  const nav = useNavigate();
  const ch = getCharacter(id);
  const { foundSet, canAsk, progress } = useGame();

  const entries = useMemo(() => {
    if (!ch) return [];
    return cluesFor(ch.id)
      .filter((c) => foundSet.has(c.id) && isRevealed(c, foundSet))
      .map((c) => {
        const layer = Math.max(0, Math.min(progress.seenLayer[c.id] ?? 0, 2));
        return { clue: c, layer, reading: c.layers[layer], first: c.layers[0] };
      });
  }, [ch, foundSet, progress.seenLayer]);

  const inferences = useMemo(() => {
    if (!ch) return [];
    return inferencesFor(ch.id).filter((inf) => inf.require.every((r) => foundSet.has(r)));
  }, [ch, foundSet]);

  if (!ch) return null;

  return (
    <section className={`scene record-scene is-${ch.id}`} data-character={ch.id}>
      <ThemePatch id={ch.id} />
      <header className="clue-hud">
        <button type="button" className="ghost" onClick={() => nav(`/room/${ch.id}`)}>
          방으로
        </button>
        <p className="clue-name">기록</p>
        <span />
      </header>

      <div className="record-body">
        <section>
          <h3>적어 둔 것</h3>
          {entries.length === 0 && (
            <p className="empty">아직 아무것도 적지 않았다. 방에서 물건을 열어도 적지 않으면 기억에 남지 않는다.</p>
          )}
          <ul className="record-list">
            {entries.map(({ clue, layer, reading, first }) => (
              <li key={clue.id} onClick={() => nav(`/room/${ch.id}/clue/${clue.id}`)}>
                <strong>{clue.name}</strong>
                {layer > 0 ? (
                  <>
                    <s>{first.thought}</s>
                    <p>{reading.thought}</p>
                  </>
                ) : (
                  <p>{reading.thought}</p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>겹친 것</h3>
          {inferences.length === 0 && (
            <p className="empty">
              서로 다른 물건이 같은 손을 가리킬 때 여기에 겹친다. 기록이 쌓여야 추론이 생긴다.
            </p>
          )}
          <ul className="record-list infer">
            {inferences.map((inf) => (
              <li key={inf.id}>
                <strong>{inf.title}</strong>
                <p>{inf.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {canAsk(ch.id) ? (
        <button type="button" className="ask-btn fixed" onClick={() => nav(`/room/${ch.id}/question`)}>
          나는 이 여자의 인생에서 어떤 사람이었는가.
        </button>
      ) : (
        <p className="ask-wait">이 방의 손때가 아직 덜 묻었다.</p>
      )}
    </section>
  );
}
