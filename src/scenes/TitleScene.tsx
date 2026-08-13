import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../audio/AudioProvider";
import { sfx } from "../audio/sfx";
import { asset } from "../lib/asset";

export default function TitleScene() {
  const nav = useNavigate();
  const { unlock, playBgm } = useAudio();

  const enter = () => {
    unlock();
    playBgm(null);
    sfx("whoosh");
    nav("/select");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        enter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="scene title-scene">
      <div className="title-bg" style={{ backgroundImage: `url(${asset("images/title_bg.png")})` }} />
      <div className="title-veil" />
      <div className="title-stack">
        <p className="kicker">SEOUL · 2026</p>
        <img className="logo" src={asset("images/logo.png")} alt="숨긴다고 숨겨지니 더 티 나" />
        <h1 className="title-name">세 개의 방</h1>
        <p className="title-q">나는 이 여자의 인생에서 어떤 사람이었는가.</p>
        <p className="title-why">사랑한 정도가 아니라, 그 인생 안의 자리.</p>
        <button type="button" className="title-enter" onClick={enter}>
          현장에 들어간다
        </button>
        <p className="title-hint">Enter</p>
      </div>
    </section>
  );
}
