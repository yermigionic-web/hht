import { useAudio } from "../audio/AudioProvider";

export function Chrome() {
  const { muted, toggleMute } = useAudio();
  return (
    <button
      type="button"
      className="mute-btn"
      aria-label={muted ? "소리 켬" : "소리 끔"}
      onClick={toggleMute}
    >
      {muted ? "소리 켬" : "소리 끔"}
    </button>
  );
}
