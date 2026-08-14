import { useState } from "react";
import type {
  CalEvent,
  CallEntry,
  DeletedMessage,
  FoodOrder,
  InspectData,
  MessageThread,
  PhoneApp,
  PhoneContent,
  TaxiRide,
} from "../game/types";

export function Inspect({
  data,
  onOpenApp,
}: {
  data: InspectData;
  onOpenApp?: (id: string) => void;
}) {
  switch (data.kind) {
    case "phone":
      return <PhoneFrame owner={data.owner} apps={data.apps} onOpenApp={onOpenApp} />;
    case "receipt":
      return (
        <article className="paper receipt">
          <p className="store">{data.receipt.store}</p>
          <p className="date">{data.receipt.date}</p>
          <ul>
            {data.receipt.items.map((it) => (
              <li key={it.name}>
                <span>{it.name}</span>
                <span>{it.price}</span>
              </li>
            ))}
          </ul>
          <p className="total">
            <span>합계</span>
            <span>{data.receipt.total}</span>
          </p>
          {data.receipt.card && <p className="foot">{data.receipt.card}</p>}
          {data.receipt.footnote && <p className="footnote">{data.receipt.footnote}</p>}
        </article>
      );
    case "note":
      return (
        <article className="paper note">
          {data.note.title && <h3>{data.note.title}</h3>}
          {data.note.dated && <p className="date">{data.note.dated}</p>}
          {data.note.pages.map((p, i) => (
            <pre key={i}>{p}</pre>
          ))}
        </article>
      );
    case "search":
      return (
        <article className="screen search">
          <p className="chrome">검색 기록</p>
          <ul>
            {data.queries.map((q) => (
              <li key={q.time + q.query}>
                <span>{q.time}</span>
                {q.query}
              </li>
            ))}
          </ul>
        </article>
      );
    case "calendar":
      return <Calendar events={data.events} />;
    case "photo":
      return (
        <article className="paper photo-card">
          <div className="photo-frame" />
          <p className="era">{data.photo.era}</p>
          <p>{data.photo.caption}</p>
        </article>
      );
    case "letter":
      return (
        <article className="paper letter">
          <p className="from">{data.letter.from}</p>
          <pre>{data.letter.body}</pre>
          <p className="foot">{data.letter.paper}</p>
        </article>
      );
    default:
      return (
        <article className="object-card">
          <p className="lead">{data.object.lead}</p>
          <ul>
            {data.object.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </article>
      );
  }
}

function Calendar({ events }: { events: CalEvent[] }) {
  return (
    <article className="screen calendar">
      <p className="chrome">캘린더</p>
      <ul>
        {events.map((e) => (
          <li key={e.date + e.title} className={e.mine ? "mine" : ""}>
            <span>{e.date}</span>
            {e.title}
          </li>
        ))}
      </ul>
    </article>
  );
}

function PhoneFrame({
  owner,
  apps,
  onOpenApp,
}: {
  owner: string;
  apps: PhoneApp[];
  onOpenApp?: (id: string) => void;
}) {
  const [app, setApp] = useState<string | null>(null);
  const current = apps.find((a) => a.id === app);

  return (
    <div className="phone">
      <div className="phone-notch" />
      {!current ? (
        <div className="phone-home">
          <p className="phone-owner">{owner}</p>
          <div className="app-grid">
            {apps.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => {
                  onOpenApp?.(a.id);
                  setApp(a.id);
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="phone-app">
          <button type="button" className="back" onClick={() => setApp(null)}>
            홈
          </button>
          <h3>{current.label}</h3>
          <PhoneBody content={current.content} />
        </div>
      )}
    </div>
  );
}

function PhoneBody({ content }: { content: PhoneContent }) {
  if (content.type === "messages") return <Threads threads={content.threads} />;
  if (content.type === "calls") return <Calls entries={content.entries} />;
  if (content.type === "taxi") return <Taxis rides={content.rides} />;
  if (content.type === "orders") return <Orders orders={content.orders} />;
  if (content.type === "notes") {
    return (
      <ul className="plain">
        {content.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    );
  }
  if (content.type === "deleted") return <Deleted items={content.items} />;
  if (content.type === "browser") {
    return (
      <ul className="plain">
        {content.queries.map((q) => (
          <li key={q.time}>
            {q.time} · {q.query}
          </li>
        ))}
      </ul>
    );
  }
  return <Calendar events={content.days} />;
}

function Threads({ threads }: { threads: MessageThread[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const t = threads.find((x) => x.name === open);
  if (!t) {
    return (
      <ul className="thread-list">
        {threads.map((th) => (
          <li key={th.name}>
            <button type="button" onClick={() => setOpen(th.name)}>
              <strong>{th.name}</strong>
              <span>{th.preview}</span>
            </button>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="thread">
      <button type="button" className="back" onClick={() => setOpen(null)}>
        목록
      </button>
      <p className="who">{t.name}</p>
      {t.messages.map((m, i) => (
        <p key={i} className={`bubble ${m.from}`}>
          <span>{m.text}</span>
          <em>{m.time}</em>
        </p>
      ))}
    </div>
  );
}

function Calls({ entries }: { entries: CallEntry[] }) {
  return (
    <ul className="plain calls">
      {entries.map((e, i) => (
        <li key={i}>
          <strong>{e.name}</strong>
          <span>
            {e.dir === "out" ? "발신" : e.dir === "in" ? "수신" : "부재"} · {e.duration}
          </span>
          <em>{e.time}</em>
        </li>
      ))}
    </ul>
  );
}

function Taxis({ rides }: { rides: TaxiRide[] }) {
  return (
    <ul className="plain">
      {rides.map((r) => (
        <li key={r.date}>
          <strong>{r.date}</strong>
          {r.from} → {r.to}
          <em>{r.price}</em>
        </li>
      ))}
    </ul>
  );
}

function Orders({ orders }: { orders: FoodOrder[] }) {
  return (
    <ul className="plain">
      {orders.map((o) => (
        <li key={o.date}>
          <strong>{o.shop}</strong>
          <span>{o.items.join(" · ")}</span>
          {o.note && <em>{o.note}</em>}
          <small>{o.date}</small>
        </li>
      ))}
    </ul>
  );
}

function Deleted({ items }: { items: DeletedMessage[] }) {
  return (
    <ul className="plain deleted">
      {items.map((it) => (
        <li key={it.time}>
          <s>{it.text}</s>
          {it.sentInstead && <span>보낸 것: {it.sentInstead}</span>}
          <em>{it.time}</em>
        </li>
      ))}
    </ul>
  );
}
