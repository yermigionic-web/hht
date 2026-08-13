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
  room: string;
  backdrop: string;
  stage: string;
  premise: string;
  desire: string;
  fear: string;
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
    bgm: "./audio/nahyeon.mp3",
    figure: "./images/nahyeon_figure.png",
    room: "./images/nahyeon_room.png",
    backdrop: "./images/nahyeon_bg.png",
    stage: "이미 서로 선택한 사이인데, 왜 내가 다시 경쟁해야 하지?",
    premise: "우리는 이미 서로 선택했다.",
    desire: "네 생활에서 가장 필요한 사람이 되고 싶다.",
    fear: "다른 사람이 너에게 더 필요한 사람이 되는 것.",
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
    bgm: "./audio/yousang.mp3",
    figure: "./images/yousang_figure.png",
    room: "./images/yousang_room.png",
    backdrop: "./images/yousang_bg.png",
    stage: "네가 좋아할 사람이 되면, 그때는 나를 선택해줄까?",
    premise: "아직 선택받아야 한다.",
    desire: "네가 나를 고르기를.",
    fear: "진짜 나는 네 취향이 아닐 가능성.",
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
    bgm: "./audio/young.mp3",
    figure: "./images/young_figure.png",
    room: "./images/young_room.png",
    backdrop: "./images/young_bg.png",
    stage: "선택받을 필요가 없어. 너는 원래 내 인생 안에 있었으니까.",
    premise: "선택이라는 과정 자체가 필요 없다.",
    desire: "네가 계속 이 삶 안에 있기를.",
    fear: "나 없이도 네가 안정적으로 행복해지는 것.",
  },
];

export function getCharacter(id: string | undefined): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}

export const ORDER: CharacterId[] = ["nahyeon", "yousang", "young"];
