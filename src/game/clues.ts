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
        thought: "금속이 손바닥부터 식는다.",
        detail: "포브가 무겁다. 딜러 책상 끝, 항상 그 자리. 합정 밤공기가 키링 구멍으로 든다.",
      },
      {
        require: ["nh-phone"],
        thought: "키링이 두 갈래다.",
        detail: "한쪽만 이빨이 닳았다. 명의란이 비어 있다. 다른 차다.",
      },
      {
        require: ["nh-invoice"],
        thought: "정비 주기가 여기 붙어 산다.",
        detail: "보험. 주유. 말은 안 남긴다. 키만 남긴다. 이미 집 차다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "검은 포브. 손안에 남는다.",
        lines: [
          "딜러 손때가 홈에 끼어 있다.",
          "키링이 두 갈래다.",
          "한쪽만 반질거리고 한쪽은 이빨이 닳았다.",
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
        thought: "스테인리스가 테이블을 친다.",
        detail: "스크래치가 영업 시간이다. 합정 네온이 뒷면에 미끄러진다.",
      },
      {
        require: ["nh-jacket"],
        thought: "케이스백에 글자가 파여 있다.",
        detail: "얕지 않다. 이니셜이 이 방 이름과 안 맞는다.",
      },
      {
        require: ["nh-phone", "nh-jacket"],
        thought: "새기지 말라고 했다.",
        detail: "설명이 따라오지 않는다. 시계만 뒤집혀 있다. 끝난 일이다.",
      },
    ],
    inspect: {
      kind: "watch",
      object: {
        lead: "스테인리스. 생채기가 몇 줄.",
        lines: [
          "브랜드가 바닥을 본다.",
          "케이스백에 글자가 있다.",
          "네온을 받으면 희미하게 읽힌다.",
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
        thought: "약국 영수증이 접혀 식는다.",
        detail: "합정 온누리. 밤 11시. 잉크가 손가락에 묻는다.",
      },
      {
        require: ["nh-phone"],
        thought: "처방 이름이 이 방과 안 맞는다.",
        detail: "상비약 칸에 없던 종류다. 봉투가 남의 손 크기다.",
      },
      {
        require: ["nh-bed"],
        thought: "떨어지는 주기까지 적어 두었다.",
        detail: "말은 없다. 영수증만 있다. 손이 먼저 나갔다.",
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
        footnote: "고객명란이 비어 있다. 옆에 볼펜 이니셜 하나.",
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
        thought: "창가 재가 아직 따뜻하다.",
        detail: "라이터가 손바닥 온도를 남긴다. 유리 너머로 도로가 젖는다.",
      },
      {
        require: ["nh-window"],
        thought: "갑이 두 종류다.",
        detail: "빨간 갑만 찌그러져 있다. 흰 갑은 비닐이 반쯤 남았다.",
      },
      {
        require: ["nh-jacket"],
        thought: "끊으라고 해서 창으로만 나간다.",
        detail: "끊지는 않았다. 타협이 재떨이 자리다.",
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
        thought: "업무 진동이 먼저 울린다.",
        detail: "잠금이 헐겁다. 딜러 손이 빠른 방이다.",
      },
      {
        require: ["nh-receipts"],
        thought: "보내지 않은 칸이 남아 있다.",
        detail: "초안이 전부 짧다. 긴 문장은 한 번도 완성되지 않았다.",
      },
      {
        require: ["nh-keys", "nh-cigs"],
        thought: "공덕 발신. 0분 18초.",
        detail: "거칠다. 다른 손이 필요해지기 시작한 시각이다.",
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
        thought: "가죽이 의자 등받이에서 식는다.",
        detail: "개지 않는다. 깨끗하다. 어깨 선이 남아 있다.",
      },
      {
        require: ["nh-cigs"],
        thought: "주머니에 손 크기가 다른 물건.",
        detail: "이어폰. 작은 라이터. 손가락 간격이 안 맞는다.",
      },
      {
        require: ["nh-bed"],
        thought: "섞이게 둔다.",
        detail: "따로 칸을 만들지 않는다. 선언 없이 섞인다.",
      },
    ],
    inspect: {
      kind: "clothes",
      object: {
        lead: "어깨에 걸친 채 식어 있다.",
        lines: [
          "안주머니에 영수증이 한 장 더 접혀 있다.",
          "이어폰은 왼쪽.",
          "안감에 다른 향이 남는다.",
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
        thought: "드라이한 향이 금속 옆에 앉는다.",
        detail: "담배와 시계 사이. 캡이 무겁다.",
      },
      {
        require: ["nh-jacket"],
        thought: "병이 두 개다.",
        detail: "작은 쪽 뚜껑이 반만 닫혀 있다. 이 방 향이 아니다.",
      },
      {
        require: ["nh-bed"],
        thought: "지우는 손이 아니다.",
        detail: "작은 병을 허용한다. 동거를 말로 하지 않는다.",
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
        thought: "합정. 갠 뒤의 도로.",
        detail: "차 불이 유리 안으로 길게 들어온다. 이 높이에서 차가 손바닥만 하다.",
      },
      {
        require: ["nh-cigs"],
        thought: "이 창으로만 나간다.",
        detail: "실내 재는 없다. 적혀 있지는 않다. 재떨이 위치만 그렇다.",
      },
      {
        require: ["nh-phone", "nh-keys"],
        thought: "기다리는 자리.",
        detail: "언제 올 거냐고 묻지 않는다. 창만 열어 둔다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "유리에 도시가 젖어 있다.",
        lines: [
          "창틀에 재가 조금.",
          "아래 도로. 헤드라이트.",
          "이 높이에서 차가 손바닥만 하다. 아래를 자주 본다.",
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
        thought: "쓰인 주름이 식지 않았다.",
        detail: "혼자 잔 선이 아니다. 개지 않는다. 아침에도 그대로다.",
      },
      {
        require: ["nh-receipts"],
        thought: "베개 밑 충전기.",
        detail: "단자가 안 맞는다. 여분이다. 이 방 폰이 아니다.",
      },
      {
        require: ["nh-invoice"],
        thought: "자리는 말로 만들지 않는다.",
        detail: "자러 오라고 하지 않는다. 비워 둔다. 이미 자리니까.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "어두운 침구. 개어져 있지 않다.",
        lines: [
          "베개 두 개. 높이가 다르다.",
          "한쪽 아래에 짧은 케이블.",
          "머리 묶은 흔적이 이 방 머리 길이와 안 맞는다.",
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
        thought: "딜러 서류가 테이블 끝에서 번진다.",
        detail: "접혀 있다. 잉크가 손가락에 묻는다.",
      },
      {
        require: ["nh-keys"],
        thought: "차대번호 옆 이름이 이 방이 아니다.",
        detail: "고객 차량. 키링 닳은 쪽과 맞는다.",
      },
      {
        require: ["nh-phone", "nh-bed"],
        thought: "할인가가 빠져 있다.",
        detail: "개인카드. 메모란: 건드리지 마. 내가 함. 생색 칸이 비어 있다.",
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
        thought: "업무 화면이 유리를 민다.",
        detail: "정렬되어 있다. 공덕 빌딩이 모니터에 겹친다.",
      },
      {
        require: ["ys-sticky"],
        thought: "다른 데스크톱이 숨어 있다.",
        detail: "검색 기록. 스쿼드 지표가 아니다. 좋아하는 것들을 과제로 모은다.",
      },
      {
        require: ["ys-note"],
        thought: "취향을 표로 쌓았다.",
        detail: "초반에는 학습으로 보인다. 과잉 노력이 더 오래 남는다.",
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
        thought: "할 일 칸으로 보인다.",
        detail: "세 장. 정렬이 살짝 뜬다. 이 방에서 드문 어긋남이다.",
      },
      {
        require: ["ys-monitors"],
        thought: "하지 말아야 할 말.",
        detail: "미안해 남발하지 말 것. 먼저 걱정하지 말 것. 존댓말 풀 것.",
      },
      {
        require: ["ys-deleted"],
        thought: "예의를 지우는 훈련.",
        detail: "나쁜 여자가 되려고 성실하다. 실패 칸이 더 길다.",
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
        thought: "책상 위 갑이 아직 새것이다.",
        detail: "재떨이도 새것이다. 이 방 공기와 안 맞는다.",
      },
      {
        require: ["ys-monitors"],
        thought: "한 개비만 펴져 있다.",
        detail: "나머지는 손도 안 댔다. 비흡연자의 소품.",
      },
      {
        require: ["ys-ref"],
        thought: "참고서에서 산 소품.",
        detail: "태도를 붙이려고 샀다. 성실하다. 서툴다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "비닐이 거의 그대로다.",
        lines: [
          "라이터에 스크래치가 없다.",
          "재떨이는 아직 가격 스티커 자국이 있다.",
          "창은 닫혀 있다. 이 방에서 피운 적은 없다.",
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
        thought: "업무 노트 표지가 반듯하다.",
        detail: "글씨가 곧다. 날짜가 정확하다.",
      },
      {
        require: ["ys-sticky"],
        thought: "한 말이 회의록으로 적혀 있다.",
        detail: "그 말투 싫대. 잘 챙겨주는 건 부담이대. 칸이 나눠져 있다.",
      },
      {
        require: ["ys-deleted"],
        thought: "관찰이 대본이 된다.",
        detail: "기억해서 지운다. 지워서 다른 사람이 되려 한다.",
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
        thought: "충전 중인 워치가 깜빡인다.",
        detail: "수면 링이 자주 끊긴다. 공덕 야근 시간이다.",
      },
      {
        require: ["ys-deleted"],
        thought: "메시지 시각과 겹친다.",
        detail: "읽히기 전에 깨어 있다. 준비 시간이다.",
      },
      {
        require: ["ys-bed"],
        thought: "맞추는 동안 잠이 얇다.",
        detail: "낮의 정렬. 밤의 데이터가 숨을 못 쉰다.",
      },
    ],
    inspect: {
      kind: "watch",
      object: {
        lead: "수면 링이 자주 끊긴다.",
        lines: [
          "심박이 올라간 시각이 메시지 초안 시각과 같다.",
          "운동 기록이 성실하다.",
          "성실함이 이 방 기본값이다.",
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
        thought: "흰 침구가 반듯하다.",
        detail: "방 전체와 같다. 주름이 없다.",
      },
      {
        require: ["ys-wardrobe"],
        thought: "서랍만 다르다.",
        detail: "여분 충전기. 머리끈. 이 방 손이 아니다.",
      },
      {
        require: ["ys-note", "ys-calendar"],
        thought: "정돈벽이 무너지는 지점.",
        detail: "남긴 무질서를 치우지 못한다. 치우면 선택받을 자리가 사라진다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "흰 침구. 주름이 없다.",
        lines: [
          "아래 서랍이 1cm 덜 닫혀 있다.",
          "그 안에만 생활이 있다.",
          "방은 맞고 이 서랍만 숙제가 아니다.",
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
        thought: "옷장이 회색으로 맞는다.",
        detail: "남색. 흰색. 낮의 정렬.",
      },
      {
        require: ["ys-monitors"],
        thought: "한쪽만 이질적이다.",
        detail: "거친 재킷. 어두운 색. 태그가 그대로다.",
      },
      {
        require: ["ys-cigs", "ys-sticky"],
        thought: "평소 옷걸이가 아니다.",
        detail: "선택받으려고 샀다. 몸이 이 옷을 아직 기억하지 못한다.",
      },
    ],
    inspect: {
      kind: "clothes",
      object: {
        lead: "태그. 아직 잘리지 않았다.",
        lines: [
          "사이즈는 맞다. 분위기가 아직 안 붙는다.",
          "옆에 평소 셔츠가 걸려 있다. 그게 더 이 방이다.",
          "옷 고르는 일조차 과제로 수행한다.",
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
        thought: "업무 캘린더가 색으로 나뉜다.",
        detail: "분류를 좋아한다. 칸이 정확하다.",
      },
      {
        require: ["ys-note"],
        thought: "다른 색이 하루다.",
        detail: "퇴근. 식사. 수면. 정확해지려 한다.",
      },
      {
        require: ["ys-watch"],
        thought: "리듬에 시간을 맞춘다.",
        detail: "선택받으려고 시간부터 수정한다.",
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
        thought: "메신저. 보낸 칸이 짧다.",
        detail: "보낸 말이 전부 잘려 있다.",
      },
      {
        require: ["ys-sticky"],
        thought: "휴지통이 더 길다.",
        detail: "밥 먹었어? 오늘 피곤해 보여서. 지워짐. 보낸 것: 알아서 해.",
      },
      {
        require: ["ys-note", "ys-cigs"],
        thought: "진심을 지우고 과제를 보냈다.",
        detail: "좋아할 문장만 남겼다. 지운 쪽이 더 길다.",
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
        detail: "메모 앱 한 줄. 잠금이 없다. 숨길 생각을 늦게 했다.",
      },
      {
        require: ["ys-cigs"],
        thought: "말은 짧게. 행동은 먼저.",
        detail: "합정 패턴이다. 참고서 목차로 적혀 있다.",
      },
      {
        require: ["ys-deleted", "ys-wardrobe"],
        thought: "그 태도를 붙이려고 성실하다.",
        detail: "질투와 학습이 한 파일에 있다. 아직 선택받지 못했다고 믿는다.",
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
        thought: "컵이 두 개다.",
        detail: "찻물이 아직 따뜻하다. 김이 나무 테이블에 앉는다.",
      },
      {
        require: ["yg-bedding"],
        thought: "한쪽 컵만 오래됐다.",
        detail: "금이 가고 손때 색이 다르다. 손님 티가 아니다.",
      },
      {
        require: ["yg-drawer"],
        thought: "자리는 원래부터 있었다.",
        detail: "싱크대에 큰 컵은 새로 생긴 물건이 아니다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "흰 주전자. 컵 두 개. 무늬가 다르다.",
        lines: [
          "작은 쪽은 새것에 가깝다. 이 집 잔.",
          "큰 쪽은 입술이 닿는 곳이 닳아 있다.",
          "차 상자가 여러 겹이다. 십 년째 같은 브랜드.",
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
        thought: "이불이 잘 개어 있다.",
        detail: "오래된 아파트 친절. 꽃무늬 베개. 접힌 선이 무겁다.",
      },
      {
        require: ["yg-tea"],
        thought: "새것이 아니다.",
        detail: "반복해서 쓰였다. 접힌 선이 생활의 선이다.",
      },
      {
        require: ["yg-notes"],
        thought: "오늘 여기서 자.",
        detail: "약해질 때마다 꺼내는 침구. 귀환이 이불 층으로 쌓인다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "개어져 있지만 가볍지 않다.",
        lines: [
          "아래층 이불일수록 더 낡았다.",
          "맨 위만 손님 얼굴이다.",
          "새 이불을 사지 않는다. 예전 것을 유지한다.",
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
        thought: "오래된 사진이 칸에 기대 있다.",
        detail: "흑백에 가까운 색. 교복 깃만 선명하다.",
      },
      {
        require: ["yg-book"],
        thought: "두 사람. 프레임이 먼저 보인다.",
        detail: "십대. 한 쪽이 다른 쪽을 칸 안에 넣고 있다.",
      },
      {
        require: ["yg-drawer", "yg-notes"],
        thought: "처음 들어온 시점을 찾기 어렵다.",
        detail: "다른 두 집에는 들어온 선이 있다. 여기에는 없었던 층이 없다.",
      },
    ],
    inspect: {
      kind: "photo",
      photo: {
        era: "2012 전후 · 교복",
        caption:
          "두 사람. 교복. 배경은 학교 뒤 담. 사진 아래 연필: '너'. 글씨가 이 집 글씨다. 이름 칸이 비어 있다. 처음부터 너였다는 투다.",
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
        thought: "메모가 꽂힌 소설이 바깥에 나와 있다.",
        detail: "편집자 방답게 책이 많다. 이 한 권만 유난히 앞줄이다.",
      },
      {
        require: ["yg-photo"],
        thought: "고등학생 때 찾던 책.",
        detail: "절판. 구해 두었다. 페이지 모서리가 같은 버릇으로 접혀 있다.",
      },
      {
        require: ["yg-notes"],
        thought: "이 책을 기억하지 못할 수도 있다.",
        detail: "이쪽은 기억한다. 취향을 보관하는 일이 일상이 된 지 오래다.",
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
        thought: "책갈피로 꽂힌 종이.",
        detail: "연희동 습기가 종이를 노랗게 먹는다.",
      },
      {
        require: ["yg-photo"],
        thought: "날짜가 여러 해에 걸쳐 있다.",
        detail: "2012, 2015, 2019, 2023. 이별. 실패. 취향. 교정 버릇이 남는다.",
      },
      {
        require: ["yg-letter", "yg-phone"],
        thought: "돌봄으로 보이는 기록.",
        detail: "돌아올 패턴을 안다. 후자를 인정하는 문장은 중간에 멈춘다.",
      },
    ],
    inspect: {
      kind: "note",
      note: {
        title: "책 사이에 끼워 둔 것들",
        pages: [
          "2012.11\n울 때 왼손을 먼저 숨김.\n전화 오면 거절하고 나중에 후회.",
          "2015.03\n끊고 여기로 옴.\n술버릇 같음. 물 먼저.",
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
        thought: "잡동사니가 부드럽게 열린다.",
        detail: "오래된 집 서랍. 정돈되어 있다. 물건이 남는다.",
      },
      {
        require: ["yg-bedding"],
        thought: "시기가 다른 물건들.",
        detail: "충전기. 낡은 후드. 이어폰. 고등학교 뱃지. 한 사람의 여러 해.",
      },
      {
        require: ["yg-photo", "yg-book"],
        thought: "없었던 층이 없다.",
        detail: "다른 두 집에는 들어온 선이 있다. 여기 서랍에는 인생의 층이 쌓여 있다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "나무 서랍. 부드럽게 열린다.",
        lines: [
          "위칸: 최근 충전기, 머리끈.",
          "가운데: 후드. 사이즈가 이 집 손이 아니다.",
          "아래: 뱃지, 낡은 이어폰, 메모. 먼지가 없다. 자주 연다.",
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
        detail: "전선과 이웃집 불. 세 집 중 창이 가장 가깝다.",
      },
      {
        require: ["yg-notes"],
        thought: "도망칠 때 오는 장소.",
        detail: "창가에 짧은 메모. 이 집 글씨. 날짜가 없다. 반복이라서.",
      },
      {
        require: ["yg-phone"],
        thought: "도주 경로의 도착지.",
        detail: "목적지가 되고 싶다. 다른 곳에서 안정되기를 두려워한다. 둘 다 남는다.",
      },
    ],
    inspect: {
      kind: "object",
      object: {
        lead: "나무 창틀. 페인트가 얇다.",
        lines: [
          "유리에 손때.",
          "아래 골목. 올라오는 길이 한눈에 들어온다.",
          "이 창은 풍경이 오래간다. 습관이 더 오래간다.",
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
        thought: "출판사 일정이 낮을 채운다.",
        detail: "마포. 교정. 회의. 저자 통화.",
      },
      {
        require: ["yg-window"],
        thought: "대신 취소한 약속.",
        detail: "오늘 컨디션이 아니라서요. 이 집 목소리로 보내진 문장들.",
      },
      {
        require: ["yg-letter"],
        thought: "보호로 보이는 개입.",
        detail: "세계를 이 생활권 안으로 끌어당긴다. 전화하지 마. 내가 대신 말할게.",
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
        thought: "이 집 글씨가 아닌 봉투.",
        detail: "서랍과 책 사이에서 미끄러져 나온 종이.",
      },
      {
        require: ["yg-phone"],
        thought: "예전 연애의 잔여.",
        detail: "앞으로 온 것. 왜 여기 있지. 이 방 글이 아니다.",
      },
      {
        require: ["yg-photo", "yg-phone"],
        thought: "거둬들인 세계.",
        detail: "맡겼거나 거둬들였다. 친절한 손이 거둬들인다. 악역 도장은 없다.",
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
    title: "약은 이 방 몸이 아니었다",
    text: "아팠던 날의 영수증이다. 말은 안 남겼다. 손이 먼저 나갔다.",
  },
  {
    id: "nh-i2",
    characterId: "nahyeon",
    require: ["nh-keys", "nh-invoice"],
    title: "생활이 먼저 나갔다",
    text: "차. 정비. 택시. 죽. 고백 칸이 비어 있다. 이미 집 차니까.",
  },
  {
    id: "nh-i3",
    characterId: "nahyeon",
    require: ["nh-phone", "nh-cigs", "nh-jacket"],
    title: "질투의 방향",
    text: "거친 통화가 남는 밤. 다른 손이 필요해지기 시작한 시각이다.",
  },
  {
    id: "nh-i4",
    characterId: "nahyeon",
    require: ["nh-bed", "nh-perfume"],
    title: "이미 공동의 방",
    text: "초대하지 않는다. 없는 상태를 임시로만 둔다.",
  },
  {
    id: "ys-i1",
    characterId: "yousang",
    require: ["ys-monitors", "ys-sticky"],
    title: "성실한 과제",
    text: "검색창이 새벽에 열린다. 선택받으려고 스스로를 수정하는 중이다.",
  },
  {
    id: "ys-i2",
    characterId: "yousang",
    require: ["ys-cigs", "ys-ref"],
    title: "참고서 A.",
    text: "담배와 거친 말은 본성이 붙기 전이다. 합정 태도를 성실히 따라 쓴 과제다.",
  },
  {
    id: "ys-i3",
    characterId: "yousang",
    require: ["ys-deleted", "ys-note"],
    title: "지워진 쪽이 길다",
    text: "보낸 칸은 연기다. 휴지통이 예의와 걱정이다. 그 틈을 들키는 게 두렵다.",
  },
  {
    id: "ys-i4",
    characterId: "yousang",
    require: ["ys-bed", "ys-wardrobe", "ys-calendar"],
    title: "정렬이 무너지는 곳",
    text: "방은 맞는다. 관련 서랍만 떠 있다. 지우면 선택받을 자리가 없어진다.",
  },
  {
    id: "yg-i1",
    characterId: "young",
    require: ["yg-tea", "yg-bedding"],
    title: "손님용이 아니다",
    text: "큰 컵 입구가 닳아 있다. 아래층 이불이 더 낡았다. 원래 여기 있던 자리다.",
  },
  {
    id: "yg-i2",
    characterId: "young",
    require: ["yg-photo", "yg-drawer"],
    title: "들어온 시점이 없다",
    text: "다른 두 집에는 등장한 선이 보인다. 여기에는 없던 층을 찾기 어렵다.",
  },
  {
    id: "yg-i3",
    characterId: "young",
    require: ["yg-notes", "yg-letter"],
    title: "수습의 역사",
    text: "오래전부터 실패의 뒷처리를 해왔다. 그 친절은 남는다. 그 친절이 발을 여기로 되돌린다.",
  },
  {
    id: "yg-i4",
    characterId: "young",
    require: ["yg-window", "yg-phone"],
    title: "귀환 경로",
    text: "다른 집과 줄을 선다고 생각하지 않는다. 결국 다시 올 테니까. 안 돌아와도 되는 안정이 더 차갑다.",
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
