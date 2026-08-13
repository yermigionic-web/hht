let ctx: AudioContext | null = null;
let sfxMuted = false;

export function setSfxMuted(on: boolean) {
  sfxMuted = on;
}

function ac() {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function env(gain: GainNode, t: number, a: number, d: number, peak = 0.12) {
  gain.gain.cancelScheduledValues(t);
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(peak, t + a);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
}

export function resumeAudio() {
  ac();
}

export function sfx(kind: "engine" | "key" | "click" | "keys" | "notify" | "page" | "cup" | "whoosh" | "glitch") {
  if (sfxMuted) return;
  const c = ac();
  const t = c.currentTime;

  if (kind === "engine") {
    const osc = c.createOscillator();
    const g = c.createGain();
    const f = c.createBiquadFilter();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(70, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.55);
    f.type = "lowpass";
    f.frequency.value = 280;
    g.gain.value = 0.0001;
    env(g, t, 0.04, 0.5, 0.09);
    osc.connect(f);
    f.connect(g);
    g.connect(c.destination);
    osc.start(t);
    osc.stop(t + 0.6);
    return;
  }

  if (kind === "key" || kind === "click") {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = "square";
    osc.frequency.value = kind === "key" ? 1400 : 880;
    env(g, t, 0.002, 0.06, 0.05);
    osc.connect(g);
    g.connect(c.destination);
    osc.start(t);
    osc.stop(t + 0.08);
    return;
  }

  if (kind === "keys") {
    for (let i = 0; i < 4; i++) {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "square";
      osc.frequency.value = 700 + Math.random() * 900;
      const ti = t + i * 0.045;
      env(g, ti, 0.001, 0.04, 0.03);
      osc.connect(g);
      g.connect(c.destination);
      osc.start(ti);
      osc.stop(ti + 0.05);
    }
    return;
  }

  if (kind === "notify") {
    [880, 1175].forEach((freq, i) => {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const ti = t + i * 0.09;
      env(g, ti, 0.01, 0.12, 0.05);
      osc.connect(g);
      g.connect(c.destination);
      osc.start(ti);
      osc.stop(ti + 0.16);
    });
    return;
  }

  if (kind === "page") {
    const buf = c.createBuffer(1, c.sampleRate * 0.25, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const src = c.createBufferSource();
    const f = c.createBiquadFilter();
    const g = c.createGain();
    src.buffer = buf;
    f.type = "bandpass";
    f.frequency.value = 1800;
    g.gain.value = 0.08;
    src.connect(f);
    f.connect(g);
    g.connect(c.destination);
    src.start(t);
    return;
  }

  if (kind === "cup") {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(920, t);
    osc.frequency.exponentialRampToValueAtTime(420, t + 0.35);
    env(g, t, 0.005, 0.35, 0.06);
    osc.connect(g);
    g.connect(c.destination);
    osc.start(t);
    osc.stop(t + 0.4);
    return;
  }

  if (kind === "whoosh") {
    const buf = c.createBuffer(1, c.sampleRate * 0.4, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.4;
    const src = c.createBufferSource();
    const f = c.createBiquadFilter();
    const g = c.createGain();
    src.buffer = buf;
    f.type = "lowpass";
    f.frequency.setValueAtTime(400, t);
    f.frequency.exponentialRampToValueAtTime(2400, t + 0.28);
    env(g, t, 0.02, 0.32, 0.07);
    src.connect(f);
    f.connect(g);
    g.connect(c.destination);
    src.start(t);
    return;
  }

  if (kind === "glitch") {
    for (let i = 0; i < 5; i++) {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "square";
      osc.frequency.value = 200 + Math.random() * 2000;
      const ti = t + i * 0.03;
      env(g, ti, 0.001, 0.025, 0.04);
      osc.connect(g);
      g.connect(c.destination);
      osc.start(ti);
      osc.stop(ti + 0.03);
    }
  }
}

export function switchSfx(id: "nahyeon" | "yousang" | "young") {
  if (id === "nahyeon") sfx("engine");
  else if (id === "yousang") sfx("keys");
  else sfx("page");
}

export function enterSfx(id: "nahyeon" | "yousang" | "young") {
  if (id === "nahyeon") {
    sfx("engine");
    setTimeout(() => sfx("whoosh"), 180);
  } else if (id === "yousang") {
    sfx("notify");
    setTimeout(() => sfx("glitch"), 120);
  } else {
    sfx("page");
    setTimeout(() => sfx("cup"), 200);
  }
}
