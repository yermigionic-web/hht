import { useAudio } from "../audio/AudioProvider";
import { sfx } from "../audio/sfx";

export function Chrome() {
  const { muted, toggleMute } = useAudio();
  return (
    <button
      type="button"
      className="mute-btn"
      aria-label={muted ? "소리 켜기" : "소리 끄기"}
      onClick={() => {
        sfx("click");
        toggleMute();
      }}
    >
      {muted ? "소리 끔" : "소리"}
    </button>
  );
}
