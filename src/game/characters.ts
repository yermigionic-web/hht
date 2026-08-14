import { asset } from "../lib/asset";
import type { CharacterId } from "./types";

export interface Character {
  id: CharacterId;
  name: string;
  age: number;
  job: string;
  place: string;
  district: string;
  quote: string;
  enterLabel: string;
  bgm: string;
  figure: string;
  video: string;
  room: string;
  backdrop: string;
  stage: string;
  premise: string;
  desire: string;
  fear: string;
  reason: string;
}

export const CHARACTERS: Character[] = [
  {
    id: "nahyeon",
    name: "안나현",
    age: 33,
    job: "수입 중고차 딜러",
    place: "신축 오피스텔",
    district: "합정",
    quote: "싫으면 다른 데 가. …진짜 가진 말고.",
    enterLabel: "문 열어",
    bgm: asset("audio/nahyeon.mp3"),
    figure: asset("standing/nahyeon.png"),
    video: asset("standing/nahyeon.mp4"),
    room: asset("images/nahyeon_room.png"),
    backdrop: asset("images/nahyeon_bg.png"),
    stage: "이미 골라 둔 여자다. 왜 다시 줄을 서.",
    premise: "서로 고른 뒤다. 고백 칸은 비어 있다.",
    desire: "생활에서 제일 필요한 손으로 남는다.",
    fear: "다른 손이 더 필요해지는 밤.",
    reason:
      "창틀 재가 아직 따뜻하다. 아래 도로는 젖어 있고 헤드라이트만 길게 남는다. 이 방은 말보다 손이 먼저 나간다.",
  },
  {
    id: "yousang",
    name: "서유상",
    age: 29,
    job: "핀테크 데이터 분석가",
    place: "오피스텔",
    district: "공덕",
    quote: "고를 거면 제대로 고르든가. …내가 이상한 말 했어?",
    enterLabel: "ENTER",
    bgm: asset("audio/yousang.mp3"),
    figure: asset("standing/yousang.png"),
    video: asset("standing/yousang.mp4"),
    room: asset("images/yousang_room.png"),
    backdrop: asset("images/yousang_bg.png"),
    stage: "맞춰 두면 그때는 고르겠지.",
    premise: "아직 줄이 안 끊겼다고 믿는다.",
    desire: "원하는 쪽으로 몸을 바꿔서 고르게 만든다.",
    fear: "지운 문장이 진짜였다는 날.",
    reason:
      "모서리가 맞는 방이다. 책상 서랍만 손가락 한 마디 떠 있다. 밤마다 검색창이 새벽 시간을 깨운다.",
  },
  {
    id: "young",
    name: "반영",
    age: 31,
    job: "문학 출판사 편집자",
    place: "오래된 아파트",
    district: "연희동",
    quote: "여기야. 원래부터.",
    enterLabel: "들어가기",
    bgm: asset("audio/young.mp3"),
    figure: asset("standing/young.png"),
    video: asset("standing/young.mp4"),
    room: asset("images/young_room.png"),
    backdrop: asset("images/young_bg.png"),
    stage: "고를 일이 없다. 처음부터 이 집 안이었다.",
    premise: "들어온 날이 없다. 처음부터 여기였다.",
    desire: "이 생활 안에 발이 남기를.",
    fear: "돌아올 필요가 없어지는 안정.",
    reason:
      "찻물 김이 창틀을 적신다. 페인트는 얇고 골목은 가깝다. 큰 컵 입구만 오래전부터 닳아 있다.",
  },
];

export function getCharacter(id: string | undefined): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}

export const ORDER: CharacterId[] = ["nahyeon", "yousang", "young"];
