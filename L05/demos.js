// Interactive demos. Every code panel is copied from notes/L05-collections.md (checked by
// tools/check.py); the JS twins below replay what Python does, step by step.

const CODE = {
  friendsLoop: `friends = ["Tom", "Jerry", "Bat"]
for friend in friends:
    print("Happy new year,", friend)
print("Done")`,
  twoLoops: `friends = ["Tom", "Jerry", "Bat"]

for friend in friends:
    print("Happy new year,", friend)

for i in range(len(friends)):
    friend = friends[i]
    print("Happy new year,", friend)`,
  build: `>>> stuff = list()
>>> stuff.append("book")
>>> stuff.append(99)
>>> print(stuff)
['book', 99]
>>> stuff.append("cookie")
>>> print(stuff)
['book', 99, 'cookie']`,
  moreMethods: `>>> stuff = ["book", 99, "cookie"]
>>> stuff.insert(0, "pen")      # put "pen" at index 0
>>> stuff
['pen', 'book', 99, 'cookie']
>>> stuff.pop()                 # remove the last element and return it
'cookie'
>>> stuff.remove(99)            # remove the first element equal to 99
>>> stuff
['pen', 'book']
>>> stuff.extend(["ink", "pad"])    # append every element of another list
>>> stuff
['pen', 'book', 'ink', 'pad']
>>> stuff.index("ink")          # where is "ink"? (does not change the list)
2`,
  sortFriends: `>>> friends = ["Tom", "Jerry", "Bat"]
>>> friends.sort()
>>> print(friends)
['Bat', 'Jerry', 'Tom']
>>> print(friends[1])
Jerry`,
  sortNone: `>>> x = [3, 1, 2]
>>> x = x.sort()
>>> print(x)
None`,
  alias: `>>> a = [1, 2, 3]
>>> b = a
>>> a.append(4)
>>> a
[1, 2, 3, 4]
>>> b
[1, 2, 3, 4]
>>> b[0] = 99
>>> a
[99, 2, 3, 4]`,
  copy: `>>> a = [1, 2, 3]
>>> b = a[:]
>>> a.append(4)
>>> a
[1, 2, 3, 4]
>>> b
[1, 2, 3]
>>> a is b
False`,
  rebind: `>>> a = [1, 2, 3]
>>> b = a
>>> a = a + [4]
>>> a
[1, 2, 3, 4]
>>> b
[1, 2, 3]`,
  addBonus: `def add_bonus(scores):
    for i in range(len(scores)):
        scores[i] = scores[i] + 5


marks = [60, 72, 85]
add_bonus(marks)
print(marks)`,
  doubleSplit: `header = "From professor.xman@uct.edu Sat Jan 5 09:14:16 2008"
words = header.split()
address = words[1].split("@")
print(words)
print(address)
print("domain:", address[1])
print("month:", words[3])`,
  countIf: `names = ["csev", "cwen", "csev", "zqian", "cwen"]
counts = dict()
for name in names:
    if name not in counts:
        counts[name] = 1
    else:
        counts[name] = counts[name] + 1
print(counts)`,
  countIf13: `>>> names = ("csev zhen zhen marquard cwen csev zhen marquard "
...          "marquard csev cwen zhen zhen").split()
>>> counts = dict()
>>> for name in names:
...     if name not in counts:
...         counts[name] = 1
...     else:
...         counts[name] = counts[name] + 1
>>> counts
{'csev': 3, 'zhen': 5, 'marquard': 3, 'cwen': 2}`,
  countGet: `names = ["csev", "cwen", "csev", "zqian", "cwen"]
counts = dict()
for name in names:
    counts[name] = counts.get(name, 0) + 1
print(counts)`,
  tupleCmp: `>>> (0, 1, 2) < (5, 1, 2)
True
>>> (0, 1, 2000000) < (0, 3, 4)
True
>>> ("Jones", "Sally") < ("Jones", "Fred")
False
>>> ("Jones", "Sally") > ("Adams", "Sam")
True`,
  tupleCmpPredict: `>>> ("Jones", "Sally") < ("Jones", "Sam")
True`,
  topWords: `def top_words(lines, n=10):
    """Return the n most common words in lines as (count, word) tuples."""
    counts = dict()
    for line in lines:
        for word in line.split():
            counts[word] = counts.get(word, 0) + 1

    pairs = list()
    for word, count in counts.items():
        pairs.append((count, word))

    pairs.sort(reverse=True)
    return pairs[:n]


text = [
    "the clown ran after the car",
    "and the car ran into the tent",
    "and the tent fell down on the clown and the car",
]
for count, word in top_words(text, 3):
    print(word, count)`,
};

// ---------- Python values in JS ----------
// Primitives are JS numbers, strings, booleans and null (None). A tuple inside a list is
// {tuple: [...]}. Lists and dicts live on a heap and are referred to as {ref: id}.

function pyRepr(v, heap = {}) {
  if (v === null) return "None";
  if (v === true) return "True";
  if (v === false) return "False";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v.includes("'") && !v.includes('"') ? `"${v}"` : `'${v}'`;
  if (v.fn) return "function";
  if (v.tuple) return v.tuple.length === 1 ? `(${pyRepr(v.tuple[0], heap)},)` : `(${v.tuple.map((x) => pyRepr(x, heap)).join(", ")})`;
  if (v.ref !== undefined) {
    const o = heap[v.ref];
    if (o.kind === "dict") return `{${o.entries.map(([k, x]) => `${pyRepr(k, heap)}: ${pyRepr(x, heap)}`).join(", ")}}`;
    return `[${o.items.map((x) => pyRepr(x, heap)).join(", ")}]`;
  }
  return String(v);
}

// Python's str.split: no argument splits on runs of whitespace; an argument splits exactly.
function pySplit(s, sep) {
  if (sep === undefined || sep === null) return s.split(/\s+/).filter((w) => w !== "");
  return s.split(sep);
}

// Python's comparison of two primitives (numbers with numbers, strings with strings).
const pyLess = (x, y) => x < y;

// ---------- memory: frames on the left, objects on the right ----------

class Mem {
  constructor() {
    this.frames = [{ name: "Global frame", vars: [] }];
    this.heap = {};
    this.next = 1;
    this.out = [];
    this.snaps = [];
  }
  list(items) { const id = this.next++; this.heap[id] = { kind: "list", items: items.slice() }; return { ref: id }; }
  obj(v) { return this.heap[v.ref]; }
  get(name) { const f = this.frames[this.frames.length - 1]; const e = f.vars.find((x) => x[0] === name) || this.frames[0].vars.find((x) => x[0] === name); return e && e[1]; }
  set(name, v) {
    const f = this.frames[this.frames.length - 1];
    const e = f.vars.find((x) => x[0] === name);
    if (e) e[1] = v; else f.vars.push([name, v]);
  }
  call(name) { this.frames.push({ name, vars: [] }); }
  ret() { this.frames.pop(); }
  snap(lines, msg, cls = "", hl = {}) {
    this.snaps.push({
      lines: [].concat(lines), msg, msgCls: cls, hl,
      frames: structuredClone(this.frames), heap: structuredClone(this.heap), out: this.out.slice(),
    });
  }
}

const CHW = 7.9; // width of one character at 13px Source Code Pro
const textW = (s) => s.length * CHW;
const isInline = (v) => v === null || typeof v !== "object" || !!v.fn || !!v.tuple;

// Draw a names-and-objects diagram, the way Python Tutor draws it.
function memSVG(s) {
  const heap = s.heap;
  const hl = s.hl || {};
  const hlNames = new Set(hl.names || []);
  const hlObjs = new Set(hl.objs || []);
  const hlCells = hl.cells || {};
  const ROW = 34, HEAD = 22;
  // Left column: frames.
  // Name column (right-aligned names), then a value column (inline values, or a dot).
  let nameW = 40, valW = 16;
  s.frames.forEach((f) => f.vars.forEach(([n, v]) => {
    nameW = Math.max(nameW, textW(n) + 18);
    if (isInline(v)) valW = Math.max(valW, textW(pyRepr(v, heap)) + 12);
  }));
  const fw = Math.max(110, nameW + valW + 14);
  let y = 8;
  const rows = []; // {frame, name, v, y}
  const frameBoxes = [];
  s.frames.forEach((f, k) => {
    const top = y;
    y += HEAD;
    f.vars.forEach(([n, v]) => { rows.push({ k, n, v, y: y + ROW / 2 }); y += ROW; });
    if (!f.vars.length) y += 10;
    y += 6;
    frameBoxes.push({ f, top, h: y - top, k });
    y += 10;
  });
  const leftBottom = y;
  // Right column: every list/dict object, in order of creation.
  const ox = 4 + fw + 8 + 44;
  const ids = Object.keys(heap).map(Number).sort((a, b) => a - b);
  const reach = new Set();
  rows.forEach((r) => { if (r.v && r.v.ref !== undefined) reach.add(r.v.ref); });
  const objPos = {};
  let oy = 8, maxRight = ox + 120;
  ids.forEach((id) => {
    const o = heap[id];
    const first = rows.find((r) => r.v && r.v.ref === id);
    const want = first ? first.y - 30 : oy;
    const top = Math.max(oy, want);
    const reprs = o.kind === "dict" ? null : o.items.map((x) => pyRepr(x, heap));
    const widths = reprs ? reprs.map((t) => Math.max(34, textW(t) + 14)) : null;
    const h = o.kind === "dict" ? 16 + Math.max(1, o.entries.length) * 26 : 16 + 30 + 16;
    let w;
    if (o.kind === "dict") {
      const kw = Math.max(40, ...o.entries.map(([k2]) => textW(pyRepr(k2, heap)) + 16));
      const vw = Math.max(40, ...o.entries.map(([, v2]) => textW(pyRepr(v2, heap)) + 16));
      w = kw + vw;
      objPos[id] = { top, h, w, kw, vw };
    } else {
      w = Math.max(44, widths.reduce((a, b) => a + b, 0));
      objPos[id] = { top, h, w, widths, reprs };
    }
    maxRight = Math.max(maxRight, ox + w);
    oy = top + h + 14;
  });
  const W = Math.max(260, maxRight + 8);
  const H = Math.max(leftBottom, oy) + 4;
  let g = `<svg viewBox="0 0 ${W} ${H}" width="${W}" role="img" aria-label="names and objects" class="memsvg">
    <defs><marker id="l5ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--teal)"/></marker>
    <marker id="l5ahh" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--amber)"/></marker></defs>`;
  frameBoxes.forEach(({ f, top, h, k }) => {
    const topFrame = k === s.frames.length - 1 && s.frames.length > 1;
    g += `<rect x="4" y="${top}" width="${fw + 8}" height="${h}" rx="8" fill="var(--card)" stroke="var(--${topFrame ? "teal" : "line"})" stroke-width="${topFrame ? 1.6 : 1}"/>`;
    g += `<text x="12" y="${top + 15}" font-size="11" fill="var(--stone)">${esc(f.name)}</text>`;
  });
  rows.forEach((r) => {
    const hot = hlNames.has(r.n) && r.k === s.frames.length - 1;
    g += `<text x="${nameW + 2}" y="${r.y + 4}" font-size="13" text-anchor="end" fill="var(--ink)" font-weight="${hot ? 700 : 500}">${esc(r.n)}</text>`;
    const bx = nameW + 8;
    if (isInline(r.v)) {
      const t = pyRepr(r.v, heap);
      g += `<rect x="${bx}" y="${r.y - 12}" width="${textW(t) + 12}" height="24" rx="5" fill="${hot ? "var(--mark)" : "var(--paper)"}" stroke="var(--${hot ? "amber" : "line"})"/>`;
      g += `<text x="${bx + 6}" y="${r.y + 4}" font-size="13" fill="var(--ink)">${esc(t)}</text>`;
    } else {
      g += `<rect x="${bx}" y="${r.y - 12}" width="16" height="24" rx="5" fill="${hot ? "var(--mark)" : "var(--paper)"}" stroke="var(--${hot ? "amber" : "line"})"/>`;
      g += `<circle cx="${bx + 8}" cy="${r.y}" r="3.5" fill="var(--${hot ? "amber" : "teal"})"/>`;
      const p = objPos[r.v.ref];
      const x1 = bx + 8, y1 = r.y, x2 = ox - 2, y2 = p.top + 16 + 15;
      g += `<path d="M ${x1} ${y1} C ${x1 + 34} ${y1}, ${x2 - 34} ${y2}, ${x2} ${y2}" fill="none" stroke="var(--${hot ? "amber" : "teal"})" stroke-width="${hot ? 2 : 1.5}" marker-end="url(#${hot ? "l5ahh" : "l5ah"})"/>`;
    }
  });
  ids.forEach((id) => {
    const o = heap[id], p = objPos[id];
    const orphan = !reach.has(id);
    const isNew = hlObjs.has(id);
    g += `<g opacity="${orphan ? 0.4 : 1}">`;
    g += `<text x="${ox}" y="${p.top + 11}" font-size="11" fill="var(--stone)">${o.kind}${orphan ? " · no name refers to it" : ""}</text>`;
    if (o.kind === "dict") {
      if (!o.entries.length) g += `<rect x="${ox}" y="${p.top + 16}" width="${p.w}" height="26" rx="5" fill="var(--card)" stroke="var(--line)" stroke-dasharray="3 3"/>`;
      o.entries.forEach(([k2, v2], j) => {
        const yy = p.top + 16 + j * 26;
        const hot = (hlCells[id] || []).includes(j);
        g += `<rect x="${ox}" y="${yy}" width="${p.kw}" height="26" fill="var(--paper-2)" stroke="var(--line)"/>`;
        g += `<rect x="${ox + p.kw}" y="${yy}" width="${p.vw}" height="26" fill="${hot ? "var(--mark)" : "var(--card)"}" stroke="var(--${hot ? "amber" : "line"})"/>`;
        g += `<text x="${ox + 8}" y="${yy + 17}" font-size="13" fill="var(--ink)">${esc(pyRepr(k2, heap))}</text>`;
        g += `<text x="${ox + p.kw + 8}" y="${yy + 17}" font-size="13" fill="var(--ink)">${esc(pyRepr(v2, heap))}</text>`;
      });
    } else {
      let x = ox;
      if (!o.items.length) g += `<rect x="${ox}" y="${p.top + 16}" width="44" height="30" rx="5" fill="var(--card)" stroke="var(--${isNew ? "teal" : "line"})" stroke-dasharray="3 3"/><text x="${ox + 22}" y="${p.top + 36}" font-size="11" text-anchor="middle" fill="var(--stone)">empty</text>`;
      o.items.forEach((_, j) => {
        const w = p.widths[j];
        const hot = (hlCells[id] || []).includes(j);
        g += `<rect x="${x}" y="${p.top + 16}" width="${w}" height="30" fill="${hot ? "var(--mark)" : "var(--card)"}" stroke="var(--${hot ? "amber" : isNew ? "teal" : "ink-2"})" stroke-width="${hot || isNew ? 1.6 : 0.8}"/>`;
        g += `<text x="${x + w / 2}" y="${p.top + 36}" font-size="13" text-anchor="middle" fill="var(--ink)">${esc(p.reprs[j])}</text>`;
        g += `<text x="${x + w / 2}" y="${p.top + 58}" font-size="10" text-anchor="middle" fill="var(--stone)">${j}</text>`;
        x += w;
      });
    }
    g += `</g>`;
  });
  return g + `</svg>`;
}

// ---------- a step player with a code panel and a custom view ----------
// opts: code (string or fn), build() -> snaps [{lines, msg, msgCls, ...}], view(snap) -> html,
//       viewLabel, extraControls, onMount(root, rebuild), mini, showConsole, kind ("py"|"repl").
function makePlayer(el, opts) {
  const mini = !!opts.mini;
  el.innerHTML = `
    <div class="stepper l5-player${mini ? " mini" : ""}">
      <div><div class="px-code"></div>${opts.showConsole && !mini ? `<div class="console px-out"></div>` : ""}</div>
      <div class="l5-view"><small>${opts.viewLabel || "names → objects"}</small><div class="px-view"></div></div>
    </div>
    ${mini ? "" : `<div class="msg px-msg"></div>
    <div class="controls">
      <button class="cbtn px-reset" title="Back to the start">⟲ Reset</button>
      <button class="cbtn px-back" title="Step back (←)">◀ Back</button>
      <button class="cbtn px-step on" title="Step (→)">Step ▶</button>
      <button class="cbtn px-play">Play</button>
      ${opts.extraControls || ""}
      <span class="spacer"></span><span class="counter px-count"></span>
    </div>`}`;
  const $ = (q) => el.querySelector(q);
  let snaps = [], i = 0, timer = null, codeLines = [];
  function code() { return typeof opts.code === "function" ? opts.code() : opts.code; }
  function kind() { return typeof opts.kind === "function" ? opts.kind() : (opts.kind || "py"); }
  function render() {
    const s = snaps[i];
    const lines = [].concat(s.lines || []);
    codeLines.forEach((ln, k) => ln.classList.toggle("hl", lines.includes(k + 1)));
    $(".px-view").innerHTML = opts.view(s);
    if (mini) return;
    const m = $(".px-msg");
    m.innerHTML = s.msg || "";
    m.className = "msg px-msg " + (s.msgCls || "");
    if (opts.showConsole) { const o = $(".px-out"); o.textContent = (s.out || []).join("\n"); o.scrollTop = o.scrollHeight; }
    $(".px-count").textContent = `step ${i + 1} / ${snaps.length}`;
    $(".px-back").disabled = $(".px-reset").disabled = i === 0;
    $(".px-step").disabled = i === snaps.length - 1;
  }
  function stop() { clearInterval(timer); timer = null; if (!mini) $(".px-play").textContent = "Play"; }
  function play() {
    if (timer) return stop();
    if (i === snaps.length - 1) i = 0;
    if (!mini) $(".px-play").textContent = "Pause";
    timer = setInterval(() => {
      if (i < snaps.length - 1) i++; else if (mini) i = 0; else return stop();
      render();
    }, mini ? 1300 : 900);
  }
  function rebuild() {
    stop();
    const c = code();
    $(".px-code").innerHTML = codeBlock(mini ? c.replace(/\s+#.*$/gm, "") : c, kind());
    codeLines = [...el.querySelectorAll(".px-code .ln")];
    snaps = opts.build();
    i = 0;
    render();
  }
  if (!mini) {
    $(".px-reset").onclick = () => { stop(); i = 0; render(); };
    $(".px-back").onclick = () => { stop(); if (i) i--; render(); };
    $(".px-step").onclick = () => { stop(); if (i < snaps.length - 1) i++; render(); };
    $(".px-play").onclick = play;
    el.tabIndex = 0;
    el.addEventListener("keydown", (e) => {
      if (["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); $(".px-step").click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); $(".px-back").click(); }
    });
  }
  if (opts.onMount) opts.onMount(el, rebuild);
  rebuild();
  if (mini) play();
}

// A row of cells for an HTML view. items: array of display strings.
function rowHTML(items, opt = {}) {
  if (!items.length) return `<div class="cells l5-cells"><div class="cellcol"><div class="cell l5-cell out">empty</div></div></div>`;
  return `<div class="cells l5-cells">` + items.map((t, k) => {
    let cls = "cell l5-cell";
    if (opt.out && opt.out(k)) cls += " out";
    if (opt.mark && opt.mark(k)) cls += " mid";
    if (opt.good && opt.good(k)) cls += " found";
    const neg = opt.neg ? `<div class="cellidx">${k - items.length}</div>` : "";
    return `<div class="cellcol">${opt.ptr ? `<div class="ptr">${opt.ptr(k) || ""}</div>` : ""}<div class="${cls}">${esc(t)}</div>${opt.noIdx ? "" : `<div class="cellidx">${k}</div>`}${neg}</div>`;
  }).join("") + `</div>`;
}

// ---------- chapter 1: indexing ----------

function demoIndex(el) {
  const friends = ["Joseph", "Glenn", "Sally"];
  el.innerHTML = `${codeBlock('>>> friends = ["Joseph", "Glenn", "Sally"]', "repl")}
    <div class="ix-cells"></div>
    <div class="controls"><label>index <input type="range" class="ix-i" min="-4" max="3" value="1"> <b class="ix-v mono"></b></label>
    <button class="cbtn" data-i="0">first</button><button class="cbtn" data-i="-1">last</button><button class="cbtn" data-i="3">friends[3]</button></div>
    <div class="msg ix-msg"></div>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    const i = +$(".ix-i").value;
    $(".ix-v").textContent = i;
    const ok = i >= -friends.length && i < friends.length;
    const k = i < 0 ? i + friends.length : i;
    $(".ix-cells").innerHTML = rowHTML(friends.map((f) => pyRepr(f)), { mark: (j) => ok && j === k, neg: true });
    const m = $(".ix-msg");
    if (ok) {
      m.className = "msg ix-msg good";
      m.innerHTML = `<code>friends[${i}]</code> → <b>${esc(pyRepr(friends[k]))}</b>${i < 0 ? ` &nbsp;(negative: counts from the end, same as <code>friends[${k}]</code>)` : ""}`;
    } else {
      m.className = "msg ix-msg bad";
      m.innerHTML = `<code>friends[${i}]</code> → <b>IndexError: list index out of range</b>. Valid indices are 0 to ${friends.length - 1} (or −${friends.length} to −1).`;
    }
  }
  $(".ix-i").oninput = render;
  el.querySelectorAll("[data-i]").forEach((b) => { b.onclick = () => { $(".ix-i").value = b.dataset.i; render(); }; });
  render();
}

// ---------- chapter 2: range and the two loops ----------

function pyRange(a, b, s) { const r = []; if (s > 0) for (let x = a; x < b; x += s) r.push(x); else for (let x = a; x > b; x += s) r.push(x); return r; }

function demoRange(el) {
  el.innerHTML = `<div class="controls" style="margin-top:0">
      <label>start <input type="range" class="rg-a" min="-3" max="10" value="2"> <b class="rg-av mono"></b></label>
      <label>stop <input type="range" class="rg-b" min="-3" max="12" value="10"> <b class="rg-bv mono"></b></label>
      <label>step <input type="range" class="rg-s" min="-3" max="3" value="2"> <b class="rg-sv mono"></b></label></div>
    <div class="controls"><button class="cbtn" data-r="0,4,1">range(4)</button><button class="cbtn" data-r="2,10,2">range(2, 10, 2)</button>
      <button class="cbtn" data-r="5,0,-1">range(5, 0, -1)</button><button class="cbtn" data-r="3,3,1">range(3, 3)</button></div>
    <pre class="code nonum rg-out"></pre><div class="rg-cells"></div><p class="hint rg-hint"></p>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    const a = +$(".rg-a").value, b = +$(".rg-b").value;
    let s = +$(".rg-s").value;
    if (s === 0) { s = 1; $(".rg-s").value = 1; }
    $(".rg-av").textContent = a; $(".rg-bv").textContent = b; $(".rg-sv").textContent = s;
    const xs = pyRange(a, b, s);
    const call = s === 1 ? `range(${a}, ${b})` : `range(${a}, ${b}, ${s})`;
    $(".rg-out").innerHTML = [`>>> ${call}`, call, `>>> list(${call})`, `[${xs.join(", ")}]`]
      .map((l) => `<span class="ln">${hlLine(l, {})}</span>`).join("");
    $(".rg-cells").innerHTML = rowHTML(xs.map(String), { noIdx: true });
    $(".rg-hint").innerHTML = `${xs.length} number${xs.length === 1 ? "" : "s"}. The shell shows the <b>range object</b> as <code>${call}</code>, not as a list. ` +
      (xs.length ? `It counts ${s > 0 ? "up" : "down"} from ${a} and stops <em>before</em> ${b}.` : `When ${s > 0 ? "start ≥ stop" : "start ≤ stop"} there are no numbers at all.`);
  }
  el.querySelectorAll("input").forEach((x) => { x.oninput = render; });
  el.querySelectorAll("[data-r]").forEach((btn) => {
    btn.onclick = () => { const [a, b, s] = btn.dataset.r.split(",").map(Number); $(".rg-a").value = a; $(".rg-b").value = b; $(".rg-s").value = s; render(); };
  });
  render();
}

function traceTwoLoops() {
  const m = new Mem();
  const names = ["Tom", "Jerry", "Bat"];
  const fr = m.list(names);
  m.set("friends", fr);
  m.snap(1, "A list of three strings; the name <code>friends</code> refers to it.", "", { names: ["friends"], objs: [fr.ref] });
  names.forEach((f, k) => {
    m.set("friend", f);
    m.snap(3, `Loop 1, pass ${k + 1}: the loop variable <code>friend</code> is bound to element ${k}, <code>${esc(pyRepr(f))}</code>.`, "", { names: ["friend"], cells: { [fr.ref]: [k] } });
    m.out.push(`Happy new year, ${f}`);
    m.snap(4, "Print it. No index needed.", "", { cells: { [fr.ref]: [k] } });
  });
  names.forEach((f, k) => {
    m.set("i", k);
    m.snap(6, `Loop 2, pass ${k + 1}: <code>range(len(friends))</code> is <code>range(0, 3)</code>, so <code>i</code> = ${k}.`, "", { names: ["i"] });
    m.set("friend", f);
    m.snap(7, `Look the element up by its index: <code>friends[${k}]</code> is <code>${esc(pyRepr(f))}</code>.`, "", { names: ["friend"], cells: { [fr.ref]: [k] } });
    m.out.push(`Happy new year, ${f}`);
    m.snap(8, "Same line printed as in loop 1.", "", { cells: { [fr.ref]: [k] } });
  });
  m.snap(0, "Both loops printed the same three lines. The first is shorter and has no index to get wrong.", "good");
  return m.snaps;
}

function demoTwoLoops(el) {
  makePlayer(el, { code: CODE.twoLoops, build: traceTwoLoops, view: memSVG, showConsole: true });
}

// ---------- chapter 3: slicing and list methods ----------

function demoSlice(el) {
  const t = [9, 41, 12, 3, 74, 15];
  el.innerHTML = `${codeBlock(">>> t = [9, 41, 12, 3, 74, 15]", "repl")}
    <div class="sl-cells"></div>
    <div class="controls">
      <label><input type="checkbox" class="sl-na"> start <input type="range" class="sl-a" min="0" max="7" value="1"> <b class="sl-av mono"></b></label>
      <label><input type="checkbox" class="sl-nb"> stop <input type="range" class="sl-b" min="0" max="8" value="3"> <b class="sl-bv mono"></b></label></div>
    <div class="controls"><button class="cbtn" data-s="1,3">t[1:3]</button><button class="cbtn" data-s=",4">t[:4]</button><button class="cbtn" data-s="3,">t[3:]</button>
      <button class="cbtn" data-s=",">t[:]</button><button class="cbtn" data-s="2,2">t[2:2]</button><button class="cbtn" data-s="4,100">t[4:100]</button></div>
    <div class="msg sl-msg"></div>`;
  const $ = (q) => el.querySelector(q);
  let bigStop = null;
  function render() {
    const omitA = $(".sl-na").checked, omitB = $(".sl-nb").checked;
    const a = omitA ? 0 : +$(".sl-a").value;
    const bRaw = bigStop !== null ? bigStop : +$(".sl-b").value;
    const b = omitB ? t.length : bRaw;
    $(".sl-av").textContent = omitA ? "–" : a;
    $(".sl-bv").textContent = omitB ? "–" : bRaw;
    const lo = Math.min(a, t.length), hi = Math.min(b, t.length);
    const res = t.slice(lo, Math.max(lo, hi));
    $(".sl-cells").innerHTML = rowHTML(t.map(String), { mark: (k) => k >= lo && k < hi, out: (k) => !(k >= lo && k < hi), ptr: (k) => (k === lo && k < hi ? "start" : "") });
    const expr = `t[${omitA ? "" : a}:${omitB ? "" : bRaw}]`;
    $(".sl-msg").className = "msg sl-msg good";
    $(".sl-msg").innerHTML = `<code>${expr}</code> → <b class="mono">[${res.join(", ")}]</b> &nbsp;·&nbsp; ${res.length} element${res.length === 1 ? "" : "s"}` +
      (!omitA && !omitB && b <= t.length && b >= a ? ` (= ${b} − ${a})` : "") +
      (b > t.length && !omitB ? `. Past the end is simply cut off: no <code>IndexError</code>.` : ". A new list: <code>t</code> is unchanged.");
  }
  ["sl-a", "sl-b"].forEach((c) => { $("." + c).oninput = () => { bigStop = null; if (c === "sl-a") $(".sl-na").checked = false; else $(".sl-nb").checked = false; render(); }; });
  ["sl-na", "sl-nb"].forEach((c) => { $("." + c).onchange = render; });
  el.querySelectorAll("[data-s]").forEach((btn) => {
    btn.onclick = () => {
      const [a, b] = btn.dataset.s.split(",");
      $(".sl-na").checked = a === ""; $(".sl-nb").checked = b === "";
      if (a !== "") $(".sl-a").value = a;
      bigStop = b !== "" && +b > 8 ? +b : null;
      if (b !== "" && bigStop === null) $(".sl-b").value = b;
      render();
    };
  });
  render();
}

function traceMethods(kind) {
  const m = new Mem();
  if (kind === "build") {
    const s = m.list([]);
    m.set("stuff", s);
    m.snap(1, "<code>list()</code> makes a new, empty list.", "", { names: ["stuff"], objs: [s.ref] });
    m.obj(s).items.push("book");
    m.snap(2, "<code>append</code> adds <code>'book'</code> on the end. It returns <code>None</code>, so the shell prints nothing.", "", { cells: { [s.ref]: [0] } });
    m.obj(s).items.push(99);
    m.snap(3, "Another one on the end. Elements of a list can be of different types.", "", { cells: { [s.ref]: [1] } });
    m.snap([4, 5], "<code>print(stuff)</code> shows the list in order.");
    m.obj(s).items.push("cookie");
    m.snap(6, "<code>'cookie'</code> goes on the end. The same list grew; no new list was made.", "", { cells: { [s.ref]: [2] } });
    m.snap([7, 8], "Three elements, in the order they were appended.", "good");
  } else if (kind === "more") {
    const s = m.list(["book", 99, "cookie"]);
    m.set("stuff", s);
    m.snap(1, "Start from the list built above.", "", { names: ["stuff"], objs: [s.ref] });
    m.obj(s).items.unshift("pen");
    m.snap(2, "<code>insert(0, 'pen')</code> puts <code>'pen'</code> at index 0. Every other element moves one place right.", "", { cells: { [s.ref]: [0] } });
    m.snap([3, 4], "Four elements now.");
    m.obj(s).items.pop();
    m.snap([5, 6], "<code>pop()</code> removes the last element <em>and returns it</em>, so the shell shows <code>'cookie'</code>.");
    m.obj(s).items.splice(2, 1);
    m.snap(7, "<code>remove(99)</code> removes the first element equal to 99. It returns <code>None</code>.");
    m.snap([8, 9], "Two left.");
    m.obj(s).items.push("ink", "pad");
    m.snap(10, "<code>extend</code> appends <em>every</em> element of the other list, one by one.", "", { cells: { [s.ref]: [2, 3] } });
    m.snap([11, 12], "Four elements again.");
    m.snap([13, 14], "<code>index('ink')</code> answers a question: <code>'ink'</code> is at index 2. The list is not changed.", "good", { cells: { [s.ref]: [2] } });
  } else if (kind === "sort") {
    const s = m.list(["Tom", "Jerry", "Bat"]);
    m.set("friends", s);
    m.snap(1, "Three names, in the order we wrote them.", "", { names: ["friends"], objs: [s.ref] });
    m.obj(s).items.sort();
    m.snap(2, "<code>sort()</code> rearranges <em>this</em> list: “sort yourself”. No new list is made.", "", { cells: { [s.ref]: [0, 1, 2] } });
    m.snap([3, 4], "The same list, now in alphabetical order.");
    m.snap([5, 6], "Index 1 is now <code>'Jerry'</code>.", "good", { cells: { [s.ref]: [1] } });
  } else {
    const s = m.list([3, 1, 2]);
    m.set("x", s);
    m.snap(1, "<code>x</code> refers to a list.", "", { names: ["x"], objs: [s.ref] });
    m.obj(s).items.sort();
    m.snap(2, "First the right-hand side runs: <code>x.sort()</code> sorts the list in place… and returns <code>None</code>.", "", { cells: { [s.ref]: [0, 1, 2] } });
    m.set("x", null);
    m.snap(2, "Then <code>x = None</code>: the name is re-bound to the return value. The sorted list is lost.", "bad", { names: ["x"] });
    m.snap([3, 4], "Don't assign the result of <code>sort()</code>. Write <code>x.sort()</code> on its own line, or use <code>sorted(x)</code>.", "bad");
  }
  return m.snaps;
}

function demoMethods(el, { mini = false } = {}) {
  let kind = "build";
  const codes = { build: CODE.build, more: CODE.moreMethods, sort: CODE.sortFriends, none: CODE.sortNone };
  makePlayer(el, {
    mini, kind: "repl",
    code: () => codes[kind],
    build: () => traceMethods(kind),
    view: memSVG,
    extraControls: `<select class="me-k"><option value="build">Build a list with append</option><option value="more">insert, pop, remove, extend, index</option>
      <option value="sort">sort() in place</option><option value="none">Pitfall: x = x.sort()</option></select>`,
    onMount(root, rebuild) { if (!mini) root.querySelector(".me-k").onchange = (e) => { kind = e.target.value; rebuild(); }; },
  });
}

// ---------- chapter 4: two names, one list ----------

function traceAlias(kind) {
  const m = new Mem();
  if (kind === "alias") {
    const a = m.list([1, 2, 3]);
    m.set("a", a);
    m.snap(1, "Python makes a new list object, then ties the name <code>a</code> to it.", "", { names: ["a"], objs: [a.ref] });
    m.set("b", a);
    m.snap(2, "<code>b = a</code> ties <code>b</code> to the <b>same</b> object. Nothing is copied: two names, one list.", "", { names: ["b"] });
    m.obj(a).items.push(4);
    m.snap(3, "<code>a.append(4)</code> changes the list itself.", "", { cells: { [a.ref]: [3] } });
    m.snap([4, 5], "Through <code>a</code>: four elements.");
    m.snap([6, 7], "Through <code>b</code>: the same four. There is only one list to look at.", "bad", { names: ["b"] });
    m.obj(a).items[0] = 99;
    m.snap(8, "It works the other way too: change the list through <code>b</code>…", "", { names: ["b"], cells: { [a.ref]: [0] } });
    m.snap([9, 10], "…and <code>a</code> sees it. <code>a</code> and <code>b</code> are <b>aliases</b>.", "bad", { names: ["a"] });
  } else if (kind === "copy") {
    const a = m.list([1, 2, 3]);
    m.set("a", a);
    m.snap(1, "One list, one name.", "", { names: ["a"], objs: [a.ref] });
    const b = m.list([1, 2, 3]);
    m.set("b", b);
    m.snap(2, "<code>a[:]</code> is a slice of the whole list: a <b>new</b> list with the same elements. <code>b</code> refers to the copy.", "", { names: ["b"], objs: [b.ref] });
    m.obj(a).items.push(4);
    m.snap(3, "<code>a.append(4)</code> changes only the list <code>a</code> refers to.", "", { cells: { [a.ref]: [3] } });
    m.snap([4, 5], "<code>a</code> has four elements…");
    m.snap([6, 7], "…and the copy still has three.", "good", { names: ["b"] });
    m.snap([8, 9], "<code>is</code> asks “same object?”: no. Two arrows, two boxes.", "good");
  } else if (kind === "rebind") {
    const a = m.list([1, 2, 3]);
    m.set("a", a);
    m.snap(1, "One list, one name.", "", { names: ["a"], objs: [a.ref] });
    m.set("b", a);
    m.snap(2, "Two names, one list: aliases.", "", { names: ["b"] });
    const c = m.list([1, 2, 3, 4]);
    m.snap(3, "First <code>a + [4]</code> runs. <code>+</code> builds a <b>new</b> list. (The little list <code>[4]</code> is used and thrown away.)", "", { objs: [c.ref] });
    m.set("a", c);
    m.snap(3, "Then <code>a = …</code> re-binds the name <code>a</code> to the new list. The old list is untouched.", "", { names: ["a"] });
    m.snap([4, 5], "<code>a</code> refers to the new list.");
    m.snap([6, 7], "<code>b</code> still refers to the original list. Changing a list (<code>append</code>) and re-binding a name (<code>a = …</code>) are different things.", "good", { names: ["b"] });
  } else {
    m.set("add_bonus", { fn: "add_bonus" });
    m.snap(1, "<code>def</code> makes a function object and names it <code>add_bonus</code>. The body does not run yet.", "", { names: ["add_bonus"] });
    const mk = m.list([60, 72, 85]);
    m.set("marks", mk);
    m.snap(6, "The caller's list.", "", { names: ["marks"], objs: [mk.ref] });
    m.call("add_bonus");
    m.set("scores", mk);
    m.snap(7, "The call makes a frame for <code>add_bonus</code>. Its parameter <code>scores</code> is bound to the <b>same</b> list the caller passed.", "", { names: ["scores"] });
    for (let k = 0; k < 3; k++) {
      m.set("i", k);
      m.snap(2, `<code>i</code> = ${k}.`, "", { names: ["i"] });
      m.obj(mk).items[k] += 5;
      m.snap(3, `<code>scores[${k}] = scores[${k}] + 5</code> changes the list itself.`, "", { cells: { [mk.ref]: [k] } });
    }
    m.ret();
    m.snap(7, "<code>add_bonus</code> returns <code>None</code> and its frame is gone. The change to the list stays.", "bad");
    m.out.push("[65, 77, 90]");
    m.snap(8, "<code>marks</code> has changed, although the function returned nothing.", "bad", { names: ["marks"] });
  }
  return m.snaps;
}

function demoAlias(el, { mini = false } = {}) {
  let kind = "alias";
  const codes = { alias: CODE.alias, copy: CODE.copy, rebind: CODE.rebind, func: CODE.addBonus };
  makePlayer(el, {
    mini,
    kind: () => (kind === "func" ? "py" : "repl"),
    code: () => codes[kind],
    build: () => traceAlias(kind),
    view: memSVG,
    showConsole: true,
    extraControls: `<select class="al-k"><option value="alias">b = a, then a.append(4)</option><option value="copy">b = a[:] (a real copy)</option>
      <option value="rebind">a = a + [4] (re-binding)</option><option value="func">Passing a list to a function</option></select>`,
    onMount(root, rebuild) {
      if (mini) return;
      const con = root.querySelector(".px-out");
      root.querySelector(".al-k").onchange = (e) => { kind = e.target.value; con.style.display = kind === "func" ? "" : "none"; rebuild(); };
      con.style.display = "none";
    },
  });
}

// ---------- chapter 5: split ----------

const SPLIT_PRESETS = [
  ["Catch me if you can", ""],
  ["A lot               of spaces", ""],
  ["first;second;third", ""],
  ["first;second;third", ";"],
  ["professor.xman@uct.edu", "@"],
  ["09:14:16", ":"],
  ["a,b,,c", ","],
];

function demoSplit(el) {
  el.innerHTML = `<div class="controls" style="margin-top:0">
      <label>string <input type="text" class="sp-s" style="width:260px"></label>
      <label>split( <select class="sp-d"><option value="">no argument</option><option value=";">";"</option><option value="@">"@"</option><option value=":">":"</option><option value=",">","</option><option value=" ">" "</option></select> )</label></div>
    <div class="controls">${SPLIT_PRESETS.map(([s, d], k) => `<button class="cbtn" data-k="${k}">${esc(d ? `"${s}".split("${d}")` : `"${s.replace(/ {2,}/, " … ")}".split()`)}</button>`).join("")}</div>
    <pre class="code nonum sp-out"></pre><div class="sp-cells"></div><p class="hint sp-hint"></p>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    const s = $(".sp-s").value, d = $(".sp-d").value;
    const words = pySplit(s, d === "" ? undefined : d);
    const expr = `${pyRepr(s)}.split(${d === "" ? "" : pyRepr(d).replace(/'/g, '"')})`;
    const out = `[${words.map((w) => pyRepr(w)).join(", ")}]`;
    $(".sp-out").innerHTML = [`>>> ${expr}`, out].map((l) => `<span class="ln">${hlLine(l, {})}</span>`).join("");
    $(".sp-cells").innerHTML = rowHTML(words.map((w) => pyRepr(w)), { mark: (k) => words[k] === "" });
    $(".sp-hint").innerHTML = `${words.length} element${words.length === 1 ? "" : "s"}. ` + (d === ""
      ? "With no argument, any run of spaces counts as <b>one</b> separator, and spaces at the ends are ignored."
      : `Splits at every <code>${esc(d)}</code>, exactly. Two in a row leave an empty string <code>''</code> between them.`);
  }
  $(".sp-s").oninput = render;
  $(".sp-d").onchange = render;
  el.querySelectorAll("[data-k]").forEach((b) => {
    b.onclick = () => { const [s, d] = SPLIT_PRESETS[+b.dataset.k]; $(".sp-s").value = s; $(".sp-d").value = d; render(); };
  });
  $(".sp-s").value = SPLIT_PRESETS[0][0];
  render();
}

function traceDoubleSplit() {
  const header = "From professor.xman@uct.edu Sat Jan 5 09:14:16 2008";
  const words = pySplit(header);
  const address = pySplit(words[1], "@");
  const snaps = [];
  const out = [];
  const s = (lines, msg, st, cls = "") => snaps.push({ lines, msg, msgCls: cls, out: out.slice(), ...st });
  s(1, "One string: the whole header line.", { stage: 1 });
  s(2, "First split, on spaces: seven words. The address is word 1, the month word 3.", { stage: 2, mark: [1, 3] });
  s(3, "Second split: take word 1 and split <em>it</em> again, at the <code>@</code>.", { stage: 3, mark: [1] });
  out.push(`[${words.map((w) => pyRepr(w)).join(", ")}]`);
  s(4, "Print the words.", { stage: 3 });
  out.push(`[${address.map((w) => pyRepr(w)).join(", ")}]`);
  s(5, "Print the two parts of the address.", { stage: 3 });
  out.push(`domain: ${address[1]}`);
  s(6, "The domain is the part after the <code>@</code>: <code>address[1]</code>.", { stage: 3, amark: [1] });
  out.push(`month: ${words[3]}`);
  s(7, "The month comes straight from the first split: <code>words[3]</code>.", { stage: 3, mark: [3] }, "good");
  return { snaps, header, words, address };
}

function demoDoubleSplit(el) {
  let data;
  makePlayer(el, {
    code: CODE.doubleSplit, showConsole: true, viewLabel: "the strings and lists",
    build: () => { data = traceDoubleSplit(); return data.snaps; },
    view: (s) => {
      let h = `<div class="l5-lab">header</div><div class="l5-str">${esc(pyRepr(data.header))}</div>`;
      if (s.stage >= 2) h += `<div class="l5-lab">words = header.split()</div>` + rowHTML(data.words.map((w) => pyRepr(w)), { mark: (k) => (s.mark || []).includes(k) });
      if (s.stage >= 3) h += `<div class="l5-lab">address = words[1].split("@")</div>` + rowHTML(data.address.map((w) => pyRepr(w)), { mark: (k) => (s.amark || []).includes(k) });
      return h;
    },
  });
}

// ---------- chapter 6: dictionaries ----------

function dictTableHTML(entries, opt = {}) {
  if (!entries.length) return `<div class="l5-dict"><div class="l5-empty">{} &nbsp;empty</div></div>`;
  const max = Math.max(1, ...entries.map(([, v]) => (typeof v === "number" ? v : 0)));
  return `<div class="l5-dict">` + entries.map(([k, v]) => {
    const cls = k === opt.hot ? " hot" : k === opt.miss ? " miss" : "";
    const bar = opt.bars && typeof v === "number" ? `<span class="l5-bar" style="width:${(100 * v) / max}%"></span>` : "";
    return `<div class="l5-row${cls}"><span class="k">${esc(pyRepr(k))}</span><span class="v">${bar}<b>${esc(pyRepr(v))}</b></span></div>`;
  }).join("") + `</div>`;
}

function demoDictViewer(el) {
  const START = [["money", 12], ["candy", 3], ["tissues", 75]];
  let entries, log, hot, miss;
  el.innerHTML = `${codeBlock(`>>> purse = dict()
>>> purse["money"] = 12
>>> purse["candy"] = 3
>>> purse["tissues"] = 75`, "repl")}
    <div class="stepper l5-dv"><div class="dv-table"></div><div><div class="counter" style="margin-bottom:4px">Python shell</div><div class="console dv-out" style="margin-top:0"></div></div></div>
    <div class="controls"><label>key <input type="text" class="dv-k" value="candy" style="width:110px"></label>
      <label>value <input type="number" class="dv-v" value="5"></label></div>
    <div class="controls"><button class="cbtn" data-op="get">purse[key]</button><button class="cbtn" data-op="in">key in purse</button>
      <button class="cbtn" data-op="getd">purse.get(key, 0)</button><button class="cbtn on" data-op="set">purse[key] = value</button>
      <button class="cbtn" data-op="print">print(purse)</button><button class="cbtn" data-op="reset">⟲ Reset</button></div>
    <div class="controls"><span class="counter">try:</span><button class="cbtn" data-try="candy,5,set">candy ← 5</button><button class="cbtn" data-try="3,77,set">3 ← 77</button>
      <button class="cbtn" data-try="csev,0,get">purse["csev"]</button><button class="cbtn" data-try="eee,0,getd">get("eee", 0)</button></div>
    <div class="msg dv-msg"></div>`;
  const $ = (q) => el.querySelector(q);
  function reset() { entries = START.map((e) => e.slice()); log = []; hot = miss = null; $(".dv-msg").className = "msg dv-msg"; $(".dv-msg").innerHTML = "Pick a key and an operation. Keys are looked up by <b>label</b>, not position."; render(); }
  const keyOf = () => { const t = $(".dv-k").value.trim(); return /^-?\d+$/.test(t) ? +t : t; };
  const lit = (k) => (typeof k === "number" ? String(k) : `"${k}"`);
  const reprD = () => pyRepr({ ref: 1 }, { 1: { kind: "dict", entries } });
  function op(name) {
    if (name === "reset") return reset();
    const k = keyOf(), v = Math.trunc(+$(".dv-v").value || 0);
    const e = entries.find((x) => x[0] === k);
    const m = $(".dv-msg");
    hot = miss = null;
    if (name === "get") {
      log.push(`>>> purse[${lit(k)}]`);
      if (e) { log.push(pyRepr(e[1])); hot = k; m.className = "msg dv-msg good"; m.innerHTML = `Found the key ${esc(pyRepr(k))}: its value is ${e[1]}.`; }
      else { log.push("Traceback (most recent call last):", "  ...", `KeyError: ${pyRepr(k)}`); m.className = "msg dv-msg bad"; m.innerHTML = `<b>KeyError</b>: there is no key ${esc(pyRepr(k))}. Check with <code>in</code> first, or use <code>get()</code>.`; }
    } else if (name === "in") {
      log.push(`>>> ${lit(k)} in purse`, e ? "True" : "False"); if (e) hot = k;
      m.className = "msg dv-msg"; m.innerHTML = `<code>in</code> checks the <b>keys</b>. It never raises an error.`;
    } else if (name === "getd") {
      log.push(`>>> purse.get(${lit(k)}, 0)`, e ? pyRepr(e[1]) : "0"); if (e) hot = k;
      m.className = "msg dv-msg"; m.innerHTML = e ? `The key is there, so <code>get</code> returns its value.` : `The key is not there, so <code>get</code> returns the default, 0. It does <b>not</b> add the key.`;
    } else if (name === "set") {
      log.push(`>>> purse[${lit(k)}] = ${v}`);
      if (e) { e[1] = v; m.innerHTML = `Updated the value under ${esc(pyRepr(k))}. Updating does not move the key.`; }
      else { entries.push([k, v]); m.innerHTML = `New key ${esc(pyRepr(k))}: it goes on the <b>end</b>. Since Python 3.7 a dictionary keeps insertion order.`; }
      hot = k; m.className = "msg dv-msg good";
    } else if (name === "print") {
      log.push(">>> print(purse)", reprD()); m.className = "msg dv-msg"; m.innerHTML = "Keys come out in the order they were first added.";
    }
    render();
  }
  function render() {
    $(".dv-table").innerHTML = `<div class="counter" style="margin-bottom:4px">purse · ${entries.length} key${entries.length === 1 ? "" : "s"}, in insertion order</div>` + dictTableHTML(entries, { hot, miss });
    const o = $(".dv-out"); o.textContent = log.join("\n"); o.scrollTop = o.scrollHeight;
  }
  el.querySelectorAll("[data-op]").forEach((b) => { b.onclick = () => op(b.dataset.op); });
  el.querySelectorAll("[data-try]").forEach((b) => { b.onclick = () => { const [k, v, o] = b.dataset.try.split(","); $(".dv-k").value = k; $(".dv-v").value = v; op(o); }; });
  reset();
}

const NAMES5 = ["csev", "cwen", "csev", "zqian", "cwen"];
const NAMES13 = "csev zhen zhen marquard cwen csev zhen marquard marquard csev cwen zhen zhen".split(" ");

function traceCount(kind) {
  const names = kind === "if13" ? NAMES13 : NAMES5;
  const L = kind === "if13" ? { names: [1, 2], counts: 3, loop: 4, test: 5, first: 6, more: 8, print: [9, 10] }
    : kind === "if" ? { names: 1, counts: 2, loop: 3, test: 4, first: 5, more: 7, print: 8 }
      : { names: 1, counts: 2, loop: 3, get: 4, print: 5 };
  const entries = [];
  const snaps = [], out = [];
  const s = (lines, msg, st = {}, cls = "") => snaps.push({ lines, msg, msgCls: cls, out: out.slice(), entries: structuredClone(entries), ...st });
  s(L.names, `${names.length} names to count.`);
  s(L.counts, "Start with an empty dictionary.");
  names.forEach((n, k) => {
    s(L.loop, `Next name: <code>${pyRepr(n)}</code>.`, { cur: k });
    const e = entries.find((x) => x[0] === n);
    if (kind === "get") {
      const old = e ? e[1] : 0;
      if (e) e[1] += 1; else entries.push([n, 1]);
      s(L.get, `<code>counts.get(${pyRepr(n)}, 0)</code> is ${old}${e ? "" : " (not seen yet: the default)"}; add 1 and store <b>${old + 1}</b>.`, { cur: k, hot: n });
    } else {
      s(L.test, `Is <code>${pyRepr(n)}</code> not in <code>counts</code>? ${e ? "It is there: go to <code>else</code>." : "Not there yet."}`, { cur: k, hot: e ? n : null });
      if (e) { e[1] += 1; s(L.more, `Add 1: <code>counts[${pyRepr(n)}]</code> is now <b>${e[1]}</b>.`, { cur: k, hot: n }); }
      else { entries.push([n, 1]); s(L.first, `First time: store it with count 1. A new key goes on the end.`, { cur: k, hot: n }); }
    }
  });
  const rep = `{${entries.map(([k, v]) => `${pyRepr(k)}: ${v}`).join(", ")}}`;
  if (kind !== "if13") out.push(rep);
  const top = Math.max(...entries.map((e) => e[1]));
  const best = entries.filter((e) => e[1] === top).map((e) => `<code>${pyRepr(e[0])}</code>`);
  s(L.print, `Done. Keys appear in the order each name was first seen. Most common: ${best.join(" and ")} (${top}${best.length > 1 ? " each" : ""}).`, { hot: entries.find((e) => e[1] === top)[0] }, "good");
  return { snaps, names };
}

function demoCount(el, { mini = false } = {}) {
  let kind = mini ? "if13" : "if", names = [];
  const codes = { if: CODE.countIf, if13: CODE.countIf13, get: CODE.countGet };
  makePlayer(el, {
    mini, viewLabel: "names and counts", showConsole: true,
    kind: () => (kind === "if13" ? "repl" : "py"),
    code: () => codes[kind],
    build: () => { const r = traceCount(kind); names = r.names; return r.snaps; },
    view: (s) => `<div class="l5-chips">${names.map((n, k) => `<span class="tag${k === s.cur ? " on" : ""}${s.cur !== undefined && k < s.cur ? " past" : ""}">${n}</span>`).join("")}</div>` +
      `<div class="l5-lab">counts</div>` + dictTableHTML(s.entries, { hot: s.hot, bars: true }),
    extraControls: `<select class="ct-k"><option value="if">if / else · 5 names</option><option value="if13">if / else · the 13 names</option><option value="get">get() · 5 names</option></select>`,
    onMount(root, rebuild) { if (!mini) root.querySelector(".ct-k").onchange = (e) => { kind = e.target.value; rebuild(); }; },
  });
}

// ---------- chapter 7: tuples and sorting ----------

const CMP_CASES = [
  { a: [0, 1, 2], b: [5, 1, 2], op: "<", line: 1, block: "tupleCmp" },
  { a: [0, 1, 2000000], b: [0, 3, 4], op: "<", line: 3, block: "tupleCmp" },
  { a: ["Jones", "Sally"], b: ["Jones", "Fred"], op: "<", line: 5, block: "tupleCmp" },
  { a: ["Jones", "Sally"], b: ["Adams", "Sam"], op: ">", line: 7, block: "tupleCmp" },
  { a: ["Jones", "Sally"], b: ["Jones", "Sam"], op: "<", line: 1, block: "tupleCmpPredict" },
];

function traceCompare(c) {
  const snaps = [];
  const tup = (t) => pyRepr({ tuple: t });
  const s = (msg, st, cls = "") => snaps.push({ lines: [c.line], msg, msgCls: cls, ...st });
  s(`<code>${tup(c.a)} ${c.op} ${tup(c.b)}</code>: compare element by element, from the left.`, { k: -1 });
  for (let k = 0; k < Math.min(c.a.length, c.b.length); k++) {
    const x = c.a[k], y = c.b[k];
    if (x === y) { s(`Element ${k}: ${pyRepr(x)} and ${pyRepr(y)} are equal, so they can't decide. Go on to the next element.`, { k, eq: true }); continue; }
    const less = pyLess(x, y);
    const res = c.op === "<" ? less : !less;
    let why = `${pyRepr(x)} ${less ? "<" : ">"} ${pyRepr(y)}`;
    if (typeof x === "string") {
      let j = 0; while (x[j] === y[j]) j++;
      why += ` (strings compare the same way, letter by letter: ${j ? x.slice(0, j).split("").map((ch) => `${ch} = ${ch}`).join(", ") + ", then " : ""}${x[j]} ${less ? "<" : ">"} ${y[j]})`;
    }
    s(`Element ${k}: ${why}. These two elements decide: the answer is <b>${res ? "True" : "False"}</b>.` + (k < c.a.length - 1 ? " The rest is never looked at." : ""), { k, decided: true }, res ? "good" : "bad");
    break;
  }
  return snaps;
}

function demoCompare(el) {
  let c = CMP_CASES[0];
  makePlayer(el, {
    kind: "repl", viewLabel: "element by element",
    code: () => CODE[c.block],
    build: () => traceCompare(c),
    view: (s) => {
      const row = (t) => rowHTML(t.map((x) => pyRepr(x)), { mark: (k) => k === s.k && !s.eq, good: (k) => k < s.k || (k === s.k && s.eq), out: (k) => s.decided && k > s.k });
      return `<div class="l5-lab">left</div>${row(c.a)}<div class="l5-op">${c.op}</div><div class="l5-lab">right</div>${row(c.b)}`;
    },
    extraControls: `<select class="cm-k">${CMP_CASES.map((x, k) => `<option value="${k}">${esc(`${pyRepr({ tuple: x.a })} ${x.op} ${pyRepr({ tuple: x.b })}`)}</option>`).join("")}</select>`,
    onMount(root, rebuild) { root.querySelector(".cm-k").onchange = (e) => { c = CMP_CASES[+e.target.value]; rebuild(); }; },
  });
}

const TOP_TEXT = [
  "the clown ran after the car",
  "and the car ran into the tent",
  "and the tent fell down on the clown and the car",
];

// Python sorts tuples element by element; reverse=True reverses that order.
function cmpTuple(a, b) {
  for (let k = 0; k < Math.min(a.length, b.length); k++) {
    if (a[k] < b[k]) return -1;
    if (a[k] > b[k]) return 1;
  }
  return a.length - b.length;
}

function traceTopWords(n) {
  const snaps = [], out = [];
  const counts = [];
  let pairs = null, top = null, stage = 0, cur = null;
  const s = (lines, msg, st = {}, cls = "") => snaps.push({
    lines, msg, msgCls: cls, out: out.slice(), counts: structuredClone(counts),
    pairs: pairs && structuredClone(pairs), top: top && structuredClone(top), stage, cur, ...st,
  });
  s(1, "<code>def</code> makes the function. Its body runs when it is called.");
  s([16, 17, 18, 19, 20], "Three lines of text, as a list of strings.");
  s(21, `Call <code>top_words(text, ${n})</code>.`);
  stage = 1;
  s(3, "Step 1 · count the words, with the counting pattern.");
  TOP_TEXT.forEach((line, li) => {
    pySplit(line).forEach((w, wi) => {
      cur = [li, wi];
      const e = counts.find((x) => x[0] === w);
      if (e) e[1]++; else counts.push([w, 1]);
      s([5, 6], `<code>${pyRepr(w)}</code>: count is now ${e ? e[1] : 1}.`, { hot: w });
    });
  });
  cur = null;
  stage = 2; pairs = [];
  s(8, "Step 2 · decorate: build (count, word) tuples, count first.");
  counts.forEach(([w, c]) => {
    pairs.push([c, w]);
    s([9, 10], `<code>(${c}, ${pyRepr(w)})</code>`, { hot: w, hp: pairs.length - 1 });
  });
  stage = 3;
  pairs.sort((a, b) => -cmpTuple(a, b));
  s(12, "Step 3 · sort the tuples, largest first. Tuples compare count first; ties are decided by the word.", { sorted: true });
  stage = 4; top = pairs.slice(0, n);
  s(13, `Step 4 · undecorate later; first slice off the top ${n}. <code>pairs[:${n}]</code> is returned.`, { sorted: true });
  top.forEach(([c, w], k) => {
    out.push(`${w} ${c}`);
    s([21, 22], `Tuple assignment unpacks <code>(${c}, ${pyRepr(w)})</code> into <code>count</code> and <code>word</code>.`, { sorted: true, ht: k });
  });
  snaps[snaps.length - 1].msg += " <code>car</code> and <code>and</code> tie on 3; with <code>reverse=True</code> the later word, <code>car</code>, comes first.";
  snaps[snaps.length - 1].msgCls = "good";
  return snaps;
}

function demoTopWords(el) {
  let n = 3;
  const words = TOP_TEXT.map((l) => pySplit(l));
  const tup = ([c, w]) => `(${c}, ${pyRepr(w)})`;
  makePlayer(el, {
    code: CODE.topWords, showConsole: true, viewLabel: "lines → counts → pairs → top",
    build: () => traceTopWords(n),
    view: (s) => {
      let h = `<div class="l5-lab">text</div><div class="l5-lines">${words.map((ws, li) => `<div>${ws.map((w, wi) => `<span class="${s.cur && s.cur[0] === li && s.cur[1] === wi ? "on" : ""}">${w}</span>`).join(" ")}</div>`).join("")}</div>`;
      if (s.stage >= 1) h += `<div class="l5-lab">counts</div>` + dictTableHTML(s.counts, { hot: s.hot, bars: true });
      if (s.stage >= 2) h += `<div class="l5-lab">pairs${s.sorted ? " · sorted, reverse=True" : ""}</div><div class="l5-chips">${s.pairs.map((p, k) => `<span class="tag mono${k === s.hp ? " on" : ""}${s.stage >= 4 && k < n ? " top" : ""}">${tup(p)}</span>`).join("")}</div>`;
      return h;
    },
    extraControls: `<label>n <input type="range" class="tw-n" min="1" max="11" value="${n}"> <b class="tw-nv mono">${n}</b></label>`,
    onMount(root, rebuild) { root.querySelector(".tw-n").oninput = (e) => { n = +e.target.value; root.querySelector(".tw-nv").textContent = n; rebuild(); }; },
  });
}

// ---------- quiz ----------

function demoQuiz(el, questions) {
  el.innerHTML = `<div class="quiz">` + questions.map((q, k) => `<div class="card q" data-k="${k}">
      <p><b>Q${k + 1}.</b> ${q.q}</p>${q.code ? codeBlock(q.code) : ""}
      <div class="opts">${q.opts.map((o, j) => `<button class="opt" data-j="${j}">${o}</button>`).join("")}</div>
      <div class="explain">${q.why}</div></div>`).join("") +
    `<p class="score"></p></div>`;
  let right = 0, done = 0;
  el.querySelectorAll(".q").forEach((qe) => {
    const q = questions[+qe.dataset.k];
    qe.querySelectorAll(".opt").forEach((b) => {
      b.onclick = () => {
        const j = +b.dataset.j;
        qe.querySelectorAll(".opt").forEach((x) => { x.disabled = true; });
        qe.querySelectorAll(".opt")[q.a].classList.add("right");
        if (j !== q.a) b.classList.add("wrong"); else right++;
        qe.classList.add("done");
        done++;
        el.querySelector(".score").textContent = `${right} / ${done} correct` + (done === questions.length ? (right === questions.length ? " — all right!" : " — reread the sections you missed.") : "");
      };
    });
  });
}

// Demo registry: data-demo="name" in chapters.js mounts DEMOS[name].
const DEMOS = {
  index: (el) => demoIndex(el),
  range: (el) => demoRange(el),
  twoLoops: (el) => demoTwoLoops(el),
  slice: (el) => demoSlice(el),
  methods: (el) => demoMethods(el),
  methodsMini: (el) => demoMethods(el, { mini: true }),
  alias: (el) => demoAlias(el),
  aliasMini: (el) => demoAlias(el, { mini: true }),
  split: (el) => demoSplit(el),
  doubleSplit: (el) => demoDoubleSplit(el),
  dictViewer: (el) => demoDictViewer(el),
  count: (el) => demoCount(el),
  countMini: (el) => demoCount(el, { mini: true }),
  compare: (el) => demoCompare(el),
  topWords: (el) => demoTopWords(el),
  quiz: (el) => demoQuiz(el, QUIZ),
};
