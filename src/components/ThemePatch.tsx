import type { CharacterId } from "../game/types";

/** Diegetic chrome only. Does not sit on top of standing art. */
export function ThemePatch({ id }: { id: CharacterId }) {
  return (
    <div className={`theme-patch theme-${id}`} aria-hidden>
      <i className="tp-corner tl" />
      <i className="tp-corner tr" />
      <i className="tp-corner bl" />
      <i className="tp-corner br" />
      <i className="tp-wash" />
      <i className="tp-scan" />
      <i className="tp-grain" />
      <i className="tp-dash" />
    </div>
  );
}
