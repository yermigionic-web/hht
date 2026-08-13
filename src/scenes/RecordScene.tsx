import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCharacter } from "../game/characters";
import { cluesFor, inferencesFor, isRevealed } from "../game/clues";
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
      <header className="clue-hud">
        <button type="button" className="ghost" onClick={() => nav(`/room/${ch.id}`)}>
          방으로
        </button>
        <p className="clue-name">기록</p>
        <span />
      </header>

      <div className="record-body">
        <section>
          <h3>기록한 것</h3>
          {entries.length === 0 && <p className="empty">아직 기록한 물건이 없다. 열기만 해서는 남지 않는다.</p>}
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
          <h3>겹쳐 읽은 것</h3>
          {inferences.length === 0 && (
            <p className="empty">같은 사람을 가리키는 물건이 두 개 이상 기록되면 여기 생긴다.</p>
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
          나는 이 여자의 인생에서 대체 어떤 사람이었는가?
        </button>
      ) : (
        <p className="ask-wait">질문은 기록을 충분히 다시 읽은 뒤에만 열 수 있다.</p>
      )}
    </section>
  );
}
