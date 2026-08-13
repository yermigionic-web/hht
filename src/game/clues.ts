import type { Clue, Inference } from "./types";

export const CLUES: Clue[] = [
  // ─── 안나현 ─────────────────────────────────────────
  {
    id: "nh-keys",
    characterId: "nahyeon",
    name: "차 키",
    x: 39,
    y: 68,
    w: 9,
    h: 12,
    layers: [
      {
        require: [],
        thought: "나현의 키.",
        detail: "딜러답게 항상 손이 닿는 곳에 둔다. 금속이 빛보다 먼저 보인다.",
      },
      {
        require: ["nh-phone"],
        thought: "키가 두 개다.",
        detail: "키링에 다른 차 키가 하나 더 있다. 나현 명의가 아니다.",
      },
      {
        require: ["nh-invoice"],
        thought: "네 차를 자기 차처럼 관리하고 있다.",
        detail: "정비 주기, 보험, 주유. 말은 안 한다. 키만 여기 있다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "검은 키 포브. 무겁다.",
        lines: [
          "수입차 딜러의 손때.",
          "키링이 두 갈래다.",
          "한쪽은 반질거리고, 한쪽은 더 닳아 있다.",
        ],
      },
    },
  },
  {
    id: "nh-watch",
    characterId: "nahyeon",
    name: "시계",
    x: 47,
    y: 64,
    w: 8,
    h: 10,
    layers: [
      {
        require: [],
        thought: "비싸지만 과시하지 않는 시계.",
        detail: "영업용 얼굴. 합정의 밤에 잘 어울린다.",
      },
      {
        require: ["nh-jacket"],
        thought: "뒷면에 이니셜이 있다.",
        detail: "나현의 이름이 아니다. 작게, 깊게 새겨져 있다.",
      },
      {
        require: ["nh-phone", "nh-jacket"],
        thought: "새기지 말라고 했을 텐데.",
        detail: "나현은 이미 끝난 문제에 설명을 붙이지 않는다. 시계만 여기 있다.",
      },
    ],
    inspect: {
      kind: "watch",
      object: {
        lead: "스테인리스. 스크래치가 몇 개.",
        lines: [
          "브랜드를 숨기듯 뒤집어 놓았다.",
          "케이스백에 글자가 있다.",
          "빛에 대면 희미하게 읽힌다.",
        ],
      },
    },
  },
  {
    id: "nh-receipts",
    characterId: "nahyeon",
    name: "영수증",
    x: 58,
    y: 70,
    w: 9,
    h: 13,
    layers: [
      {
        require: [],
        thought: "약국 영수증.",
        detail: "나현이 아팠나 보다. 합정 온누리약국. 밤 11시.",
      },
      {
        require: ["nh-phone"],
        thought: "이 약은 나현 것이 아니다.",
        detail: "처방 이름이 낯설다. 나현이 상비약으로 두는 종류가 아니다.",
      },
      {
        require: ["nh-bed"],
        thought: "나현은 네가 먹는 약을 기억하고 있었다.",
        detail: "떨어지는 주기까지. 사랑 표현이 영수증 형태로 남아 있다.",
      },
    ],
    inspect: {
      kind: "receipt",
      receipt: {
        store: "합정 온누리약국",
        date: "2026.07.19  23:14",
        items: [
          { name: "처방조제", price: "8,400" },
          { name: "일반의약품", price: "12,000" },
          { name: "파스 대형", price: "4,500" },
        ],
        total: "24,900",
        card: "**** 4412",
        footnote: "고객명란이 비어 있다. 대신 옆에 볼펜으로 이니셜 하나.",
      },
    },
  },
  {
    id: "nh-cigs",
    characterId: "nahyeon",
    name: "담배",
    x: 68,
    y: 68,
    w: 11,
    h: 14,
    layers: [
      {
        require: [],
        thought: "흡연자.",
        detail: "창가 재떨이가 가득하다. 라이터는 아직 따뜻하다.",
      },
      {
        require: ["nh-window"],
        thought: "브랜드가 두 개다.",
        detail: "한쪽 갑만 거의 그대로다. 나현 것은 빨간 갑이다.",
      },
      {
        require: ["nh-jacket"],
        thought: "끊으라고 해서 창가에서만 피운다.",
        detail: "그래도 끊지는 않았다. 타협의 형태가 재떨이의 자리다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "재떨이, 라이터, 갑 두 개.",
        lines: [
          "빨간 갑은 찌그러져 있다.",
          "흰 갑은 비닐이 반쯤 남아 있다.",
          "창쪽으로만 재가 쌓여 있다.",
        ],
      },
    },
  },
  {
    id: "nh-phone",
    characterId: "nahyeon",
    name: "스마트폰",
    x: 51,
    y: 76,
    w: 9,
    h: 11,
    layers: [
      {
        require: [],
        thought: "업무 전화가 많다.",
        detail: "화면 잠금은 허술하다. 나현답다.",
      },
      {
        require: ["nh-receipts"],
        thought: "보내지 않은 말이 남아 있다.",
        detail: "초안은 전부 짧다. 감정적인 문장은 한 번도 완성되지 않았다.",
      },
      {
        require: ["nh-keys", "nh-cigs"],
        thought: "다른 사람이 너를 챙기기 시작했을 때의 통화.",
        detail: "짧고 거칠다. 나현의 질투는 네가 다른 사람을 보는 게 아니다. 다른 사람이 너에게 필요한 사람이 되는 것이다.",
      },
    ],
    inspect: {
      kind: "phone",
      owner: "안나현",
      apps: [
        {
          id: "msg",
          label: "메시지",
          content: {
            type: "messages",
            threads: [
              {
                name: "너",
                preview: "야.",
                messages: [
                  { from: "me", text: "야.", time: "어제 01:12" },
                  { from: "me", text: "밥.", time: "어제 01:13" },
                  { from: "them", text: "먹고 있었어.", time: "어제 01:40" },
                  { from: "me", text: "알아서 와.", time: "어제 01:41" },
                ],
              },
              {
                name: "임시저장",
                preview: "보내지 않음 3",
                messages: [
                  { from: "draft", text: "약 사놨으니까 와.", time: "07.19 23:22" },
                  { from: "draft", text: "차 가져가. 키 여기 있음.", time: "07.21 02:03" },
                  { from: "draft", text: "그 새끼 말고.", time: "07.28 00:17" },
                ],
              },
            ],
          },
        },
        {
          id: "call",
          label: "통화",
          content: {
            type: "calls",
            entries: [
              { name: "아우디 서비스", time: "오늘 16:02", duration: "4:11", dir: "out" },
              { name: "고객 · 김", time: "오늘 14:40", duration: "12:03", dir: "out" },
              { name: "공덕", time: "07.28 00:19", duration: "0:18", dir: "out" },
              { name: "연희동", time: "07.11 22:08", duration: "1:02", dir: "out" },
              { name: "너", time: "07.19 23:30", duration: "0:06", dir: "out" },
            ],
          },
        },
        {
          id: "taxi",
          label: "택시",
          content: {
            type: "taxi",
            rides: [
              { date: "07.29 02:14", from: "합정 오피스텔", to: "상수 골목", price: "6,400" },
              { date: "07.24 23:51", from: "강남 전시장", to: "합정", price: "28,900" },
              { date: "07.19 21:40", from: "합정", to: "연남 약국 앞", price: "5,200" },
              { date: "07.12 03:02", from: "연희동", to: "합정", price: "9,800" },
            ],
          },
        },
        {
          id: "food",
          label: "배달",
          content: {
            type: "orders",
            orders: [
              {
                date: "07.29 01:08",
                shop: "연남 칼국수",
                items: ["칼국수 1", "만두 1"],
                note: "덜 맵게. 별도 포장.",
              },
              {
                date: "07.21 00:44",
                shop: "합정 포차",
                items: ["오뎅탕", "소주 2"],
              },
              {
                date: "07.19 22:03",
                shop: "죽",
                items: ["전복죽 1", "흰죽 1"],
                note: "문 앞에. 벨 누르지 마.",
              },
            ],
          },
        },
      ],
    },
  },
  {
    id: "nh-jacket",
    characterId: "nahyeon",
    name: "재킷",
    x: 56,
    y: 38,
    w: 13,
    h: 24,
    layers: [
      {
        require: [],
        thought: "아무렇게나 걸쳐진 가죽 재킷.",
        detail: "성격이 보인다. 깨끗하지만 개지 않는다.",
      },
      {
        require: ["nh-cigs"],
        thought: "주머니에 나현 것이 아닌 물건.",
        detail: "이어폰. 작은 라이터. 사이즈가 나현 손이 아니다.",
      },
      {
        require: ["nh-bed"],
        thought: "이미 공동의 공간.",
        detail: "나현은 네 물건을 따로 두지 않는다. 섞이게 둔다. 그게 선언이다.",
      },
    ],
    inspect: {
      kind: "clothes",
      object: {
        lead: "어깨에 걸친 채 식어 있다.",
        lines: [
          "안주머니에 영수증이 한 장 더 있다. 접혀 있다.",
          "이어폰은 왼쪽.",
          "나현 향과 다른 향이 안감에 남아 있다.",
        ],
      },
    },
  },
  {
    id: "nh-perfume",
    characterId: "nahyeon",
    name: "향수",
    x: 28,
    y: 64,
    w: 8,
    h: 14,
    layers: [
      {
        require: [],
        thought: "짙고 드라이한 향.",
        detail: "나현의 것. 금속과 담배 사이에 놓여 있다.",
      },
      {
        require: ["nh-jacket"],
        thought: "병이 두 개다.",
        detail: "작은 쪽 뚜껑이 열려 있다. 나현 향이 아니다.",
      },
      {
        require: ["nh-bed"],
        thought: "지우는 쪽이 아니라 남겨두는 쪽.",
        detail: "나현은 네 향을 이 방에 허용한다. 그게 나현식 동거다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "사각형 유리병. 무거운 캡.",
        lines: [
          "옆에 작은 병이 하나 더 있다.",
          "작은 병은 뚜껑이 반만 닫혀 있다.",
          "테이블에 두 향이 겹쳐 있다.",
        ],
      },
    },
  },
  {
    id: "nh-window",
    characterId: "nahyeon",
    name: "창",
    x: 70,
    y: 12,
    w: 24,
    h: 34,
    layers: [
      {
        require: [],
        thought: "합정. 비가 갠 뒤의 도로.",
        detail: "차 불이 길게 늘어진다. 나현의 배경이다.",
      },
      {
        require: ["nh-cigs"],
        thought: "이 창가에서 담배를 피운다.",
        detail: "실내에서는 안 피운다. 네가 싫어해서, 라고 적혀 있지는 않다. 재떨이의 위치만 그렇다.",
      },
      {
        require: ["nh-phone", "nh-keys"],
        thought: "기다리는 자리.",
        detail: "나현은 '언제 올 거냐'고 묻지 않는다. 창만 열어둔다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "유리에 도시가 젖어 있다.",
        lines: [
          "창틀에 재가 조금.",
          "아래 도로. 헤드라이트.",
          "이 높이에서 차는 장난감처럼 작다. 나현은 저 아래를 자주 본다.",
        ],
      },
    },
  },
  {
    id: "nh-bed",
    characterId: "nahyeon",
    name: "침구",
    x: 8,
    y: 44,
    w: 18,
    h: 28,
    revealAfter: ["nh-phone", "nh-jacket"],
    layers: [
      {
        require: [],
        thought: "쓰인 자국.",
        detail: "혼자 잔 것 같지는 않다. 그래도 나현은 침대를 정리하지 않는다.",
      },
      {
        require: ["nh-receipts"],
        thought: "베개 밑 충전기.",
        detail: "나현 폰과 단자가 다르다. 여분이다. 네 것이다.",
      },
      {
        require: ["nh-invoice"],
        thought: "자리는 말로 만들지 않는다.",
        detail: "나현은 '자러 와'라고 하지 않는다. 그냥 비워둔다. 이미 네 자리니까.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "어두운 침구. 개어져 있지 않다.",
        lines: [
          "베개 두 개. 높이가 다르다.",
          "한쪽 아래에 짧은 케이블.",
          "머리 묶은 흔적이 아니다. 나현 머리 길이도 아니다.",
        ],
      },
    },
  },
  {
    id: "nh-invoice",
    characterId: "nahyeon",
    name: "정비 명세서",
    x: 84,
    y: 74,
    w: 12,
    h: 16,
    revealAfter: ["nh-keys", "nh-receipts"],
    layers: [
      {
        require: [],
        thought: "딜러 업무 서류.",
        detail: "테이블 끝에 접혀 있다. 잉크가 번져 있다.",
      },
      {
        require: ["nh-keys"],
        thought: "차량 명의가 나현이 아니다.",
        detail: "차대번호 옆에 다른 이름이 있다. 네 것이다.",
      },
      {
        require: ["nh-phone", "nh-bed"],
        thought: "회사 할인도 안 받았다.",
        detail: "자기 돈으로 처리한 흔적. 나현은 이걸 생색내지 않는다. 이미 네 여자 차니까.",
      },
    ],
    inspect: {
      kind: "receipt",
      receipt: {
        store: "MAPO IMPORT SERVICE",
        date: "2026.06.03",
        items: [
          { name: "정기점검", price: "180,000" },
          { name: "타이어 위치교환", price: "40,000" },
          { name: "브레이크 패드", price: "220,000" },
        ],
        total: "440,000",
        card: "개인카드 · 안나현",
        footnote: "고객 차량. 딜러 할인가 미적용. 메모란: 건드리지 마. 내가 함.",
      },
    },
  },

  // ─── 서유상 ─────────────────────────────────────────
  {
    id: "ys-monitors",
    characterId: "yousang",
    name: "모니터",
    x: 18,
    y: 22,
    w: 24,
    h: 26,
    layers: [
      {
        require: [],
        thought: "업무 화면.",
        detail: "정렬되어 있다. 유상답다. 공덕의 빌딩이 유리에 겹친다.",
      },
      {
        require: ["ys-sticky"],
        thought: "다른 데스크톱이 있다.",
        detail: "검색 기록. 업무가 아니다. 네가 좋아하는 것들에 대한 학습.",
      },
      {
        require: ["ys-note"],
        thought: "취향을 데이터처럼 모았다.",
        detail: "초반에는 스토커처럼 보이지 않는다. 서툰 연애의 과잉 노력으로 보인다. 그게 더 오래 남는다.",
      },
    ],
    inspect: {
      kind: "search",
      queries: [
        { time: "07.02 01:14", query: "무심한 연애 말투" },
        { time: "07.02 01:16", query: "양아치 여자 특징" },
        { time: "07.08 23:40", query: "관심 없는 척 하는 법" },
        { time: "07.15 02:03", query: "담배 처음 피면" },
        { time: "07.20 00:11", query: "명령조 대화 예시" },
        { time: "07.27 01:55", query: "너무 잘 챙겨주면 부담?" },
      ],
    },
  },
  {
    id: "ys-sticky",
    characterId: "yousang",
    name: "스티키 노트",
    x: 30,
    y: 14,
    w: 10,
    h: 12,
    layers: [
      {
        require: [],
        thought: "할 일처럼 보인다.",
        detail: "세 장. 정렬이 살짝 어긋나 있다. 이 방에서 유일한 어긋남 중 하나.",
      },
      {
        require: ["ys-monitors"],
        thought: "하지 말아야 할 말.",
        detail: "미안해 남발하지 말 것. 먼저 걱정하지 말 것. 존댓말 풀 것.",
      },
      {
        require: ["ys-deleted"],
        thought: "예의 바른 사람이 예의를 지우는 훈련.",
        detail: "유상은 나쁜 여자가 되려고 매우 성실하다.",
      },
    ],
    inspect: {
      kind: "note",
      note: {
        dated: "책상 위 · 노란 메모",
        pages: [
          "1. 미안해 남발하지 말 것\n2. 먼저 걱정하지 말 것\n3. 존댓말 풀 것",
          "4. 밥 먹었냐고 묻지 말 것 → 이미 시켜둘 것\n5. 표정을 너무 보지 말 것\n   (봐도 티 내지 말 것)",
          "오늘 실패\n- 또 '괜찮아?' 함\n- 다시 지움",
        ],
      },
    },
  },
  {
    id: "ys-cigs",
    characterId: "yousang",
    name: "담배",
    x: 34,
    y: 46,
    w: 8,
    h: 11,
    layers: [
      {
        require: [],
        thought: "책상 위 담배.",
        detail: "이 방에선 이질적이다. 재떨이도 새것이다.",
      },
      {
        require: ["ys-monitors"],
        thought: "한 개비만 펴져 있다.",
        detail: "나머지는 손도 안 댔다. 비흡연자의 소품.",
      },
      {
        require: ["ys-ref"],
        thought: "참고서의 소품.",
        detail: "나현을 흉내 내기 위해 샀다. 연기는 성실하고, 연기는 서툴다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "비닐이 거의 그대로다.",
        lines: [
          "라이터에 스크래치가 없다.",
          "재떨이는 아직 가격 스티커 자국이 있다.",
          "창은 닫혀 있다. 이 방에서 피운 적은 없어 보인다.",
        ],
      },
    },
  },
  {
    id: "ys-note",
    characterId: "yousang",
    name: "노트",
    x: 16,
    y: 50,
    w: 11,
    h: 12,
    layers: [
      {
        require: [],
        thought: "업무 노트처럼 보인다.",
        detail: "글씨가 반듯하다. 날짜가 정확하다.",
      },
      {
        require: ["ys-sticky"],
        thought: "네가 한 말이 적혀 있다.",
        detail: "그 말투 싫대. 잘 챙겨주는 건 부담이대. 회의록처럼 적혀 있다.",
      },
      {
        require: ["ys-deleted"],
        thought: "관찰이 아니라 대본.",
        detail: "유상은 너를 기억한다. 기억해서 지운다. 지워서 다른 사람이 되려 한다.",
      },
    ],
    inspect: {
      kind: "note",
      note: {
        title: "노트 3",
        dated: "2026.05 — 07",
        pages: [
          "05.12\n'그런 말투 싫다'\n→ 상냥한 문장 금지. 짧게.",
          "06.03\n식사 시간 대략 13:10 / 21:40\n수면 불규칙. 2시 이후 메시지 금지?\n아니, 그 시간에 오는 사람을 좋아하는 듯.",
          "07.18\n명령 후 걱정함. 실패.\n욕 후 표정 확인함. 실패.\n무심한 척, 이미 충전기 사둠. …이건 티 안 남.",
        ],
      },
    },
  },
  {
    id: "ys-watch",
    characterId: "yousang",
    name: "스마트워치",
    x: 40,
    y: 48,
    w: 7,
    h: 9,
    layers: [
      {
        require: [],
        thought: "충전 중인 워치.",
        detail: "수면 데이터가 불규칙하다. 공덕의 야근처럼 보인다.",
      },
      {
        require: ["ys-deleted"],
        thought: "메시지 시간과 겹친다.",
        detail: "네가 읽기 전에 유상은 깨어 있다. 연기의 준비 시간.",
      },
      {
        require: ["ys-bed"],
        thought: "연기하는 동안 제대로 자지 못했다.",
        detail: "완벽한 낮의 유상과, 데이터를 숨기지 못한 밤.",
      },
    ],
    inspect: {
      kind: "watch",
      object: {
        lead: "수면 링이 자주 끊긴다.",
        lines: [
          "심박이 올라간 시각이 메시지 초안 시각과 같다.",
          "운동 기록은 성실하다.",
          "성실함이 이 방의 기본값이다.",
        ],
      },
    },
  },
  {
    id: "ys-bed",
    characterId: "yousang",
    name: "침대",
    x: 46,
    y: 46,
    w: 18,
    h: 24,
    layers: [
      {
        require: [],
        thought: "정렬된 침대.",
        detail: "방 전체와 같다. 주름이 없다.",
      },
      {
        require: ["ys-wardrobe"],
        thought: "서랍만 다르다.",
        detail: "여분 충전기. 머리끈. 유상 것이 아니다.",
      },
      {
        require: ["ys-note", "ys-calendar"],
        thought: "정돈벽이 무너지는 유일한 지점.",
        detail: "네가 남긴 무질서를 치우지 못한다. 치우면 네가 안 온 방이 되니까.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "흰 침구. 너무 반듯하다.",
        lines: [
          "아래 서랍이 1cm 덜 닫혀 있다.",
          "그 안에만 생활이 있다.",
          "유상의 방은 무대고, 이 서랍만 리허설이 아니다.",
        ],
      },
    },
  },
  {
    id: "ys-wardrobe",
    characterId: "yousang",
    name: "옷",
    x: 76,
    y: 32,
    w: 16,
    h: 38,
    layers: [
      {
        require: [],
        thought: "정돈된 옷장.",
        detail: "회색, 남색, 흰색. 유상의 낮.",
      },
      {
        require: ["ys-monitors"],
        thought: "한쪽만 이질적이다.",
        detail: "거친 재킷. 어두운 색. 태그가 그대로다.",
      },
      {
        require: ["ys-cigs", "ys-sticky"],
        thought: "평소 취향이 아닌 옷.",
        detail: "너를 위해 샀다. 아직 유상의 몸이 이 옷을 기억하지 못한다.",
      },
    ],
    inspect: {
      kind: "clothes",
      object: {
        lead: "태그. 아직 잘리지 않았다.",
        lines: [
          "사이즈는 맞다. 분위기는 아직 아니다.",
          "옆에 평소 셔츠가 걸려 있다. 그게 더 유상이다.",
          "유상은 옷을 고르는 일조차 과제처럼 수행한다.",
        ],
      },
    },
  },
  {
    id: "ys-calendar",
    characterId: "yousang",
    name: "일정",
    x: 8,
    y: 38,
    w: 12,
    h: 16,
    revealAfter: ["ys-note"],
    layers: [
      {
        require: [],
        thought: "업무 캘린더.",
        detail: "색이 나뉘어 있다. 유상은 분류를 좋아한다.",
      },
      {
        require: ["ys-note"],
        thought: "다른 색이 너의 하루다.",
        detail: "퇴근. 식사. 수면. 정확할 필요는 없다. 유상은 정확해지려 한다.",
      },
      {
        require: ["ys-watch"],
        thought: "네 리듬에 자신을 맞춘다.",
        detail: "선택받기 위해 유상은 시간부터 수정한다.",
      },
    ],
    inspect: {
      kind: "calendar",
      events: [
        { date: "월 09:30", title: "스쿼드 싱크" },
        { date: "화 14:00", title: "지표 리뷰" },
        { date: "매일 13:10", title: "□ 점심", mine: true },
        { date: "매일 21:40", title: "□ 저녁?", mine: true },
        { date: "수 02:00", title: "메시지 창 열지 말 것", mine: true },
        { date: "금 19:20", title: "□ 퇴근 추정", mine: true },
      ],
    },
  },
  {
    id: "ys-deleted",
    characterId: "yousang",
    name: "삭제된 메시지",
    x: 10,
    y: 58,
    w: 9,
    h: 12,
    revealAfter: ["ys-sticky", "ys-monitors"],
    layers: [
      {
        require: [],
        thought: "메신저. 최근 대화가 짧다.",
        detail: "유상의 보낸 말은 전부 잘라져 있다.",
      },
      {
        require: ["ys-sticky"],
        thought: "휴지통이 더 길다.",
        detail: "밥 먹었어? 오늘 피곤해 보여서. 지워짐. 보낸 것: 알아서 해.",
      },
      {
        require: ["ys-note", "ys-cigs"],
        thought: "진심을 지우고 연기를 보냈다.",
        detail: "유상은 네가 좋아하는 사람이 되려다, 네가 좋아할 문장만 남겼다.",
      },
    ],
    inspect: {
      kind: "phone",
      owner: "서유상",
      apps: [
        {
          id: "chat",
          label: "대화",
          content: {
            type: "messages",
            threads: [
              {
                name: "너",
                preview: "알아서 해.",
                messages: [
                  { from: "me", text: "알아서 해.", time: "어제 21:44" },
                  { from: "them", text: "뭐가.", time: "어제 21:50" },
                  { from: "me", text: "그냥.", time: "어제 21:51" },
                ],
              },
            ],
          },
        },
        {
          id: "trash",
          label: "지움",
          content: {
            type: "deleted",
            items: [
              { time: "어제 21:43", text: "밥 먹었어?", sentInstead: "알아서 해." },
              { time: "07.26 00:12", text: "오늘 피곤해 보여서. 들어가서 자.", sentInstead: "꺼져. 자." },
              { time: "07.20 13:08", text: "회의 길면 내가 커피 사둘게", sentInstead: "알아서 사 먹어." },
              { time: "07.18 02:01", text: "나 이런 말 잘 못하는데, 네가", sentInstead: "(삭제됨)" },
            ],
          },
        },
      ],
    },
  },
  {
    id: "ys-ref",
    characterId: "yousang",
    name: "A.",
    x: 88,
    y: 70,
    w: 8,
    h: 12,
    revealAfter: ["ys-cigs", "ys-sticky"],
    layers: [
      {
        require: [],
        thought: "이니셜 A.",
        detail: "메모 앱 한 줄. 잠금은 없다. 유상은 이걸 숨길 생각을 늦게 했다.",
      },
      {
        require: ["ys-cigs"],
        thought: "말은 짧게. 행동은 먼저.",
        detail: "안나현의 패턴이다. 라이벌의 이름이 아니라 참고서의 목차.",
      },
      {
        require: ["ys-deleted", "ys-wardrobe"],
        thought: "유상은 나현처럼 보이려고 성실하다.",
        detail: "질투와 학습이 한 파일에 있다. 유상은 아직 선택받지 못했다고 믿는다.",
      },
    ],
    inspect: {
      kind: "note",
      note: {
        title: "A.",
        pages: [
          "말은 짧게.\n행동은 먼저.\n사과하지 않음.\n필요한 걸 미리 처리.",
          "담배. 재킷. 차.\n내가 가진 것: 일정, 기억, 돈.\n없는 것: 저 태도.",
          "저 사람이 너를 챙기기 시작하면\n나는 필요 없어지나.\n\n연습 더 할 것.",
        ],
      },
    },
  },

  // ─── 반영 ───────────────────────────────────────────
  {
    id: "yg-tea",
    characterId: "young",
    name: "차",
    x: 40,
    y: 54,
    w: 18,
    h: 20,
    layers: [
      {
        require: [],
        thought: "컵이 두 개.",
        detail: "손님이 있었나. 찻물은 아직 따뜻하다.",
      },
      {
        require: ["yg-bedding"],
        thought: "한쪽 컵만 유난히 오래됐다.",
        detail: "금이 가고, 손때 색이 다르다. 손님용 티가 아니다.",
      },
      {
        require: ["yg-drawer"],
        thought: "네 자리는 원래부터 있었다.",
        detail: "반영의 싱크대에 네 컵은 새로 생긴 물건이 아니다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "흰 주전자. 컵 두 개. 무늬가 다르다.",
        lines: [
          "작은 쪽은 새것에 가깝다. 반영의 것.",
          "큰 쪽은 입술이 닿는 곳이 닳아 있다.",
          "차 브랜드는 십 년째 같은 것처럼 상자가 여러 겹이다.",
        ],
      },
    },
  },
  {
    id: "yg-bedding",
    characterId: "young",
    name: "여분 침구",
    x: 12,
    y: 38,
    w: 18,
    h: 30,
    layers: [
      {
        require: [],
        thought: "잘 개어진 손님용 이불.",
        detail: "오래된 아파트에 흔한 친절. 꽃무늬 베개.",
      },
      {
        require: ["yg-tea"],
        thought: "새것이 아니다.",
        detail: "반복해서 쓰였다. 접힌 선이 생활의 선이다.",
      },
      {
        require: ["yg-notes"],
        thought: "오늘 여기서 자.",
        detail: "네가 약해질 때마다 꺼내는 침구. 귀환의 물증이 이불 형태로 쌓여 있다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "개어져 있지만 가볍지 않다.",
        lines: [
          "아래층 이불일수록 더 낡았다.",
          "맨 위만 손님처럼 보인다.",
          "반영은 너를 위해 새 이불을 사지 않는다. 예전 것을 유지한다.",
        ],
      },
    },
  },
  {
    id: "yg-photo",
    characterId: "young",
    name: "사진",
    x: 70,
    y: 28,
    w: 8,
    h: 12,
    layers: [
      {
        require: [],
        thought: "오래된 사진.",
        detail: "책장 칸. 흑백에 가까운 색. 교복 깃만 선명하다.",
      },
      {
        require: ["yg-book"],
        thought: "너와 반영.",
        detail: "십대. 얼굴보다 구도가 먼저 보인다. 반영이 너를 프레임 안에 넣고 있다.",
      },
      {
        require: ["yg-drawer", "yg-notes"],
        thought: "이 방에 네가 처음 들어온 시점을 찾기 어렵다.",
        detail: "나현과 유상의 방에는 네가 들어온 시점이 보인다. 여기에는 없었던 시점이 없다.",
      },
    ],
    inspect: {
      kind: "photo",
      photo: {
        era: "2012 전후 · 교복",
        caption:
          "두 사람. 교복. 배경은 학교 뒤 담. 사진 아래 연필: '너'. 반영의 글씨다. 이름은 없다. 처음부터 너였다는 투다.",
      },
    },
  },
  {
    id: "yg-book",
    characterId: "young",
    name: "절판된 책",
    x: 82,
    y: 44,
    w: 10,
    h: 18,
    layers: [
      {
        require: [],
        thought: "메모가 꽂힌 소설.",
        detail: "편집자 방답게 책이 많다. 이 한 권만 유난히 바깥에 있다.",
      },
      {
        require: ["yg-photo"],
        thought: "네가 고등학생 때 좋아했던 책.",
        detail: "절판. 반영이 구해놓았다. 페이지 모서리가 너처럼 접혀 있다.",
      },
      {
        require: ["yg-notes"],
        thought: "너는 이 책을 기억하지 못할 수도 있다.",
        detail: "반영은 기억한다. 너의 취향을 보관하는 일이 반영의 일상이 된 지 오래다.",
      },
    ],
    inspect: {
      kind: "note",
      note: {
        title: "절판 · 안쪽 메모",
        dated: "구매일 불명. 메모는 2013.",
        pages: [
          "이거 네가 찾던 거.\n중고로 왔어.\n나중에 줘도 되고, 여기 둬도 되고.",
          "네가 두고 감.\n내가 다시 꽂아둠.\n몇 번인지 세지 않기로 함.",
        ],
      },
    },
  },
  {
    id: "yg-notes",
    characterId: "young",
    name: "오래된 메모",
    x: 74,
    y: 38,
    w: 8,
    h: 14,
    layers: [
      {
        require: [],
        thought: "책갈피처럼 꽂힌 종이.",
        detail: "연희동의 습기가 종이를 물들여 있다.",
      },
      {
        require: ["yg-photo"],
        thought: "날짜가 여러 해에 걸쳐 있다.",
        detail: "2012, 2015, 2019, 2023. 이별, 실패, 취향. 편집자처럼 정확하다.",
      },
      {
        require: ["yg-letter", "yg-phone"],
        thought: "돌봄처럼 보이는 기록.",
        detail: "네가 돌아올 패턴을 알고 있다는 뜻이기도 하다. 반영 본인은 후자를 완전히 인정하지 않는다.",
      },
    ],
    inspect: {
      kind: "note",
      note: {
        title: "책 사이에 끼워 둔 것들",
        pages: [
          "2012.11\n울 때 왼손을 먼저 숨김.\n전화 오면 거절하고 나중에 후회.",
          "2015.03\n그 사람 끝나고 여기로 옴.\n술버릇 같음. 물 먼저.",
          "2019.08\n또 그 버릇. 도망칠 때 오는 장소가 여긴가.\n내가 목적지인 건 아닌데.",
          "2023.02\n행복해 보이면 좋겠다.\n행복해 보여서 안 오면…\n(문장이 멈춤)",
        ],
      },
    },
  },
  {
    id: "yg-drawer",
    characterId: "young",
    name: "서랍",
    x: 58,
    y: 48,
    w: 14,
    h: 18,
    layers: [
      {
        require: [],
        thought: "잡동사니.",
        detail: "오래된 집의 서랍. 정돈되어 있지만 비어 있지는 않다.",
      },
      {
        require: ["yg-bedding"],
        thought: "시기가 다른 네 물건들.",
        detail: "충전기, 낡은 후드, 이어폰, 고등학교 때 뱃지. 한 사람의 여러 해.",
      },
      {
        require: ["yg-photo", "yg-book"],
        thought: "없었던 시점이 없다.",
        detail: "나현의 방, 유상의 방에는 네가 들어온 시점이 있다. 반영의 서랍에는 네 인생의 층이 쌓여 있다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "나무 서랍. 부드럽게 열린다.",
        lines: [
          "위칸: 최근 충전기, 머리끈.",
          "가운데: 후드. 사이즈가 반영이 아니다.",
          "아래: 뱃지, 낡은 이어폰, 메모. 먼지가 없다. 자주 열어본다.",
        ],
      },
    },
  },
  {
    id: "yg-window",
    characterId: "young",
    name: "창",
    x: 42,
    y: 10,
    w: 22,
    h: 28,
    layers: [
      {
        require: [],
        thought: "연희동. 오래된 창틀.",
        detail: "전선과 이웃집 불. 세 방 중 가장 편안해 보인다.",
      },
      {
        require: ["yg-notes"],
        thought: "네가 도망칠 때 오는 장소.",
        detail: "창가에 짧은 메모. 반영의 글씨. 날짜는 없다. 반복이라서.",
      },
      {
        require: ["yg-phone"],
        thought: "도주 경로의 도착지.",
        detail: "반영은 목적지이기를 원한다. 동시에 네가 다른 곳에서 안정되기를 두려워한다. 둘 다 진짜다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "나무 창틀. 페인트가 얇다.",
        lines: [
          "유리에 손때.",
          "아래 골목. 네가 올라오는 길이 한눈에 보인다.",
          "이 창은 풍경이 아니라 감시가 아니다. 습관이다. 습관이 더 오래간다.",
        ],
      },
    },
  },
  {
    id: "yg-phone",
    characterId: "young",
    name: "휴대폰",
    x: 66,
    y: 46,
    w: 7,
    h: 10,
    revealAfter: ["yg-notes", "yg-tea"],
    layers: [
      {
        require: [],
        thought: "출판사 업무 일정.",
        detail: "마포. 교정, 회의, 저자 통화. 반영의 낮.",
      },
      {
        require: ["yg-window"],
        thought: "너 대신 취소한 약속.",
        detail: "오늘 컨디션이 아니라서요. 반영의 목소리로 보내진 문장들.",
      },
      {
        require: ["yg-letter"],
        thought: "보호처럼 보이는 개입.",
        detail: "네 세계를 이 생활권 안으로 끌어당긴다. 전화하지 마. 내가 대신 말할게.",
      },
    ],
    inspect: {
      kind: "phone",
      owner: "반영",
      apps: [
        {
          id: "cal",
          label: "일정",
          content: {
            type: "calendar",
            days: [
              { date: "월 10:00", title: "교정 미팅" },
              { date: "수 15:30", title: "저자 통화" },
              { date: "07.19", title: "□ 약속 취소함 (대신)", mine: true },
              { date: "07.03", title: "□ 대신 거절", mine: true },
            ],
          },
        },
        {
          id: "msg",
          label: "메시지",
          content: {
            type: "messages",
            threads: [
              {
                name: "너",
                preview: "오늘 여기서 자.",
                messages: [
                  { from: "them", text: "가기 싫어.", time: "07.19 21:02" },
                  { from: "me", text: "그럼 오지 마. 여기 있어.", time: "07.19 21:03" },
                  { from: "me", text: "전화하지 마. 내가 대신 말할게.", time: "07.19 21:11" },
                  { from: "me", text: "오늘 여기서 자.", time: "07.19 21:12" },
                ],
              },
              {
                name: "대신 보낸 것",
                preview: "컨디션",
                messages: [
                  {
                    from: "draft",
                    text: "안녕하세요, 오늘 컨디션이 아니라서 취소합니다. — 대신 전합니다.",
                    time: "07.19 21:20",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  },
  {
    id: "yg-letter",
    characterId: "young",
    name: "편지",
    x: 52,
    y: 68,
    w: 10,
    h: 12,
    revealAfter: ["yg-drawer", "yg-notes"],
    layers: [
      {
        require: [],
        thought: "반영이 쓰지 않은 글씨.",
        detail: "서랍과 책 사이에서 미끄러져 나온 봉투.",
      },
      {
        require: ["yg-phone"],
        thought: "예전 연애의 잔여.",
        detail: "너에게 온 것. 왜 여기 있지. 반영의 방이 아닌 글이다.",
      },
      {
        require: ["yg-photo", "yg-phone"],
        thought: "거둬들인 세계.",
        detail: "네가 맡겼거나, 반영이 거둬들였다. 친절한 행동이 반드시 순수한 행동은 아니다. 그래도 악역의 편지는 아니다.",
      },
    ],
    inspect: {
      kind: "letter",
      letter: {
        from: "보낸 사람 불명 · 네 이름 앞으로",
        paper: "한번 펼쳐진 자국이 여러 겹.",
        body: "왜 전화를 안 받아.\n친구가 대신 끊더라.\n그 사람, 너 보호하는 거야? 가두는 거야?\n나는 모르겠고. 너는 거기 있으면 편하겠지.",
      },
    },
  },
];

export const INFERENCES: Inference[] = [
  {
    id: "nh-i1",
    characterId: "nahyeon",
    require: ["nh-receipts", "nh-phone"],
    title: "약은 나현의 것이 아니었다",
    text: "나현은 아팠던 게 아니다. 네가 아팠던 날의 영수증이다. 나현은 그걸 말로 남기지 않았다.",
  },
  {
    id: "nh-i2",
    characterId: "nahyeon",
    require: ["nh-keys", "nh-invoice"],
    title: "생활이 먼저 나갔다",
    text: "차, 정비, 택시, 죽. 나현의 애정은 고백이 아니라 개입이다. 이미 네 여자라고 믿기 때문에.",
  },
  {
    id: "nh-i3",
    characterId: "nahyeon",
    require: ["nh-phone", "nh-cigs", "nh-jacket"],
    title: "질투의 방향",
    text: "나현이 거친 건 네가 다른 사람을 봐서가 아니다. 다른 사람이 너에게 필요한 사람이 되기 시작해서다.",
  },
  {
    id: "nh-i4",
    characterId: "nahyeon",
    require: ["nh-bed", "nh-perfume"],
    title: "이미 공동의 방",
    text: "나현의 방은 너를 초대하지 않는다. 네가 없는 상태를 임시로 둘 뿐이다.",
  },
  {
    id: "ys-i1",
    characterId: "yousang",
    require: ["ys-monitors", "ys-sticky"],
    title: "성실한 연기",
    text: "유상은 너를 감시하려고 방을 만든 게 아니다. 선택받으려고 자신을 수정하는 중이다.",
  },
  {
    id: "ys-i2",
    characterId: "yousang",
    require: ["ys-cigs", "ys-ref"],
    title: "참고서 A.",
    text: "담배와 거친 말은 유상의 본성이 아니다. 안나현이라는 참고서를 성실히 따라 쓴 과제다.",
  },
  {
    id: "ys-i3",
    characterId: "yousang",
    require: ["ys-deleted", "ys-note"],
    title: "지워진 쪽이 유상이다",
    text: "보낸 문장은 연기다. 휴지통의 문장이 본래의 예의와 걱정이다. 유상은 그 틈을 들키는 게 두렵다.",
  },
  {
    id: "ys-i4",
    characterId: "yousang",
    require: ["ys-bed", "ys-wardrobe", "ys-calendar"],
    title: "정렬이 무너지는 곳",
    text: "방은 완벽하다. 너와 관련된 부분만 아니다. 유상은 무질서를 사랑해서가 아니라, 너를 지우면 선택받을 자리가 없어져서 못 치운다.",
  },
  {
    id: "yg-i1",
    characterId: "young",
    require: ["yg-tea", "yg-bedding"],
    title: "손님용이 아니다",
    text: "컵과 이불은 방문객을 위한 세트가 아니다. 원래 여기 있던 사람의 자리다.",
  },
  {
    id: "yg-i2",
    characterId: "young",
    require: ["yg-photo", "yg-drawer"],
    title: "들어온 시점이 없다",
    text: "나현과 유상의 방에는 네가 등장한 시점이 보인다. 반영의 방에는 네가 없던 층을 찾기 어렵다.",
  },
  {
    id: "yg-i3",
    characterId: "young",
    require: ["yg-notes", "yg-letter"],
    title: "수습의 역사",
    text: "반영은 오래전부터 네 실패의 뒷처리를 해왔다. 그 친절은 진짜다. 그 친절이 너를 여기로 되돌리는 힘이기도 하다.",
  },
  {
    id: "yg-i4",
    characterId: "young",
    require: ["yg-window", "yg-phone"],
    title: "귀환 경로",
    text: "반영은 다른 사람과 경쟁한다고 생각하지 않는다. 결국 다시 올 테니까. 가장 위협적인 것은 네가 더 이상 돌아올 필요가 없어지는 것이다.",
  },
];

export function cluesFor(id: string): Clue[] {
  return CLUES.filter((c) => c.characterId === id);
}

export function getClue(id: string | undefined): Clue | undefined {
  return CLUES.find((c) => c.id === id);
}

export function inferencesFor(id: string): Inference[] {
  return INFERENCES.filter((i) => i.characterId === id);
}

export function layerIndex(clue: Clue, found: Set<string>): number {
  let best = 0;
  clue.layers.forEach((layer, i) => {
    if (layer.require.every((req) => found.has(req))) best = i;
  });
  return best;
}

export function isRevealed(clue: Clue, found: Set<string>): boolean {
  if (!clue.revealAfter || clue.revealAfter.length === 0) return true;
  return clue.revealAfter.every((id) => found.has(id));
}

export function questionReady(
  characterId: string,
  found: Set<string>,
  seenLayer: Record<string, number>,
): boolean {
  const mine = cluesFor(characterId);
  const recorded = mine.filter((c) => found.has(c.id) && seenLayer[c.id] !== undefined);
  const reread = recorded.filter((c) => (seenLayer[c.id] ?? 0) >= 1);
  const inf = inferencesFor(characterId).filter((i) => i.require.every((id) => found.has(id)));
  return recorded.length >= 7 && reread.length >= 3 && inf.length >= 2;
}
