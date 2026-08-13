export type CharacterId = "nahyeon" | "yousang" | "young";

export type InspectKind =
  | "phone"
  | "receipt"
  | "note"
  | "search"
  | "calendar"
  | "photo"
  | "object"
  | "letter"
  | "watch"
  | "clothes";

export interface ClueLayer {
  require: string[];
  thought: string;
  detail: string;
}

export interface PhoneApp {
  id: string;
  label: string;
  unlockRequire?: string[];
  content: PhoneContent;
}

export type PhoneContent =
  | { type: "messages"; threads: MessageThread[] }
  | { type: "calls"; entries: CallEntry[] }
  | { type: "taxi"; rides: TaxiRide[] }
  | { type: "orders"; orders: FoodOrder[] }
  | { type: "notes"; notes: string[] }
  | { type: "deleted"; items: DeletedMessage[] }
  | { type: "browser"; queries: SearchQuery[] }
  | { type: "calendar"; days: CalEvent[] };

export interface MessageThread {
  name: string;
  preview: string;
  messages: { from: "them" | "me" | "draft"; text: string; time: string }[];
}

export interface CallEntry {
  name: string;
  time: string;
  duration: string;
  dir: "in" | "out" | "missed";
}

export interface TaxiRide {
  date: string;
  from: string;
  to: string;
  price: string;
}

export interface FoodOrder {
  date: string;
  shop: string;
  items: string[];
  note?: string;
}

export interface DeletedMessage {
  time: string;
  text: string;
  sentInstead?: string;
}

export interface SearchQuery {
  time: string;
  query: string;
}

export interface CalEvent {
  date: string;
  title: string;
  mine?: boolean;
}

export interface ReceiptData {
  store: string;
  date: string;
  items: { name: string; price: string }[];
  total: string;
  card?: string;
  footnote?: string;
}

export interface NoteData {
  title?: string;
  pages: string[];
  dated?: string;
}

export interface PhotoData {
  caption: string;
  era: string;
}

export interface LetterData {
  from: string;
  body: string;
  paper: string;
}

export interface ObjectData {
  lead: string;
  lines: string[];
}

export type InspectData =
  | { kind: "phone"; owner: string; apps: PhoneApp[] }
  | { kind: "receipt"; receipt: ReceiptData }
  | { kind: "note"; note: NoteData }
  | { kind: "search"; queries: SearchQuery[] }
  | { kind: "calendar"; events: CalEvent[] }
  | { kind: "photo"; photo: PhotoData }
  | { kind: "object"; object: ObjectData }
  | { kind: "letter"; letter: LetterData }
  | { kind: "watch"; object: ObjectData }
  | { kind: "clothes"; object: ObjectData };

export interface Clue {
  id: string;
  characterId: CharacterId;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  revealAfter?: string[];
  layers: [ClueLayer, ClueLayer, ClueLayer];
  inspect: InspectData;
}

export interface Inference {
  id: string;
  characterId: CharacterId;
  require: string[];
  title: string;
  text: string;
}

export interface RealizationBeat {
  text: string;
  afterClues?: string[];
}

export interface GameProgress {
  found: string[];
  seenLayer: Record<string, number>;
  unlockedQuestion: CharacterId[];
  finished: CharacterId[];
  entered: CharacterId[];
}
