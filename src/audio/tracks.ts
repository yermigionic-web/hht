import type { CharacterId } from "../game/types";

export interface TrackInfo {
  artist: string;
  title: string;
  lines: [string, string];
}

export const TRACKS: Record<CharacterId, TrackInfo> = {
  nahyeon: {
    artist: "Ahfone",
    title: "것도",
    lines: ["몇 번이나 선 넘어야 넌 터지나", "숨긴다고 숨겨지니 더 티 나"],
  },
  yousang: {
    artist: "나타샤",
    title: "Obsession",
    lines: ["절대 흔들리지 않을 거라 말해도", "이미 넌 다른 누군가 두고 있는 걸 알아"],
  },
  young: {
    artist: "ZICO",
    title: "걘 아니야",
    lines: ["Actually", "애초에 너랑 친구 먹기 싫었어"],
  },
};
