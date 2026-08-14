import { useState, type MouseEvent } from "react";
import { useAudio } from "../audio/AudioProvider";
import { TRACKS } from "../audio/tracks";
import type { CharacterId } from "../game/types";

export function Chrome() {
  const { track, playing, progress, toggle, restart, seek, unlock } = useAudio();
  const [open, setOpen] = useState(false);

  if (!track) return null;
  const info = TRACKS[track];

  const onBar = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    seek((e.clientX - r.left) / Math.max(1, r.width));
  };

  return (
    <aside className={`floater is-${track} ${open ? "open" : ""} ${playing ? "on" : ""}`}>
      <button
        type="button"
        className="floater-face"
        aria-expanded={open}
        aria-label={open ? "플레이어 접기" : `${info.title} 가사 열기`}
        onClick={() => {
          unlock();
          setOpen((v) => !v);
        }}
      >
        <Disc id={track} spinning={playing} />
      </button>

      {open && (
        <div className="floater-panel">
          <p className="floater-meta">
            {info.artist} · {info.title}
          </p>
          <p className="floater-lyric">{info.lines[0]}</p>
          <p className="floater-lyric">{info.lines[1]}</p>
          <button
            type="button"
            className="floater-bar"
            aria-label="재생 위치"
            onClick={onBar}
          >
            <span style={{ width: `${Math.round(progress * 100)}%` }} />
          </button>
          <div className="floater-controls">
            <button type="button" className="floater-ctrl" aria-label="처음부터" onClick={restart}>
              <IconRestart />
            </button>
            <button
              type="button"
              className="floater-ctrl play"
              aria-label={playing ? "정지" : "재생"}
              onClick={toggle}
            >
              {playing ? <IconPause /> : <IconPlay />}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

function Disc({ id, spinning }: { id: CharacterId; spinning: boolean }) {
  if (id === "yousang") {
    return (
      <svg className="floater-disc" viewBox="0 0 48 48" aria-hidden>
        <rect x="4" y="4" width="40" height="40" fill="#061210" stroke="#5ec4b8" strokeWidth="2" />
        <path d="M8 14h32M8 24h32M8 34h32" stroke="#5ec4b8" strokeWidth="0.6" opacity="0.45" />
        <rect className="eq-bar" x="18" y="16" width="4" height="16" fill="#5ec4b8" />
        <rect className="eq-bar" x="24" y="12" width="4" height="20" fill="#7ed4c8" />
        <rect className="eq-bar" x="30" y="18" width="4" height="12" fill="#5ec4b8" />
      </svg>
    );
  }

  if (id === "young") {
    return (
      <svg className="floater-disc" viewBox="0 0 48 48" aria-hidden>
        <circle cx="24" cy="24" r="20" fill="#1a1418" stroke="#b88898" strokeWidth="2" />
        <circle cx="24" cy="24" r="13" fill="#f2e4ea" />
        <circle cx="24" cy="24" r="3" fill="#5a3848" />
        <path d="M10 10h8M10 10v8M38 10h-8M38 10v8M10 38h8M10 38v-8M38 38h-8M38 38v-8" stroke="#b88898" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  return (
    <svg className={`floater-disc ${spinning ? "spin" : ""}`} viewBox="0 0 48 48" aria-hidden>
      <defs>
        <linearGradient id="nh-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d8d4ec" />
          <stop offset="1" stopColor="#5a4a88" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" fill="#0c0814" stroke="url(#nh-rim)" strokeWidth="3" />
      <circle cx="24" cy="24" r="7" fill="#b9a8e6" />
      <circle cx="24" cy="24" r="2.2" fill="#0c0814" />
      <path d="M24 6v4M24 38v4M6 24h4M38 24h4" stroke="#c8c2e0" strokeWidth="1.4" />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M6 5h4v14H6zm8 0h4v14h-4z" />
    </svg>
  );
}

function IconRestart() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M7 6h2.2v12H7zm3.2 6 9.3-5.6v11.2z" />
    </svg>
  );
}
