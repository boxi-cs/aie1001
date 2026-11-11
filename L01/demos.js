// Interactive demos. Every code panel is copied from notes/L01-computers-and-numbers.md
// (checked by tools/check.py); the JS twins below replay what the Python code does, step by
// step, with the same arithmetic (IEEE doubles), so their results match the note.

const CODE = {
  machine: `address  content
   0     LOAD  A, [100]    ; copy memory cell 100 into register A
   1     ADD   A, [101]    ; add memory cell 101 to A
   2     STORE A, [102]    ; copy A into memory cell 102
   3     HALT              ; stop
 100     2
 101     3
 102     0`,
  addPy: `result = 2 + 3
print(result)`,
  ladder: `Python         result = 2 + 3
C              int result = 2 + 3;
assembly       add 2, 3, result
machine code   1101101010011010`,
  assembler: `assembly source          assembler          machine code
add 2, 3, result   ─────────────────────>   1101101010011010`,
  dance: `1. Right hand around your head
2. Left hand around your belly
3. Straighten out right hand
4. Left hand rests on your hip
5. One step to the right while straightening out left hand
6. Keep down and swing
...`,
  toDecimal: `DIGITS = "0123456789abcdef"


def to_decimal(number, base):
    """Return the value of a digit string such as "1101.01" in the given base."""
    whole, _, fraction = number.lower().partition(".")
    total = 0
    power = len(whole) - 1                # weight of the first digit: base ** power
    for digit in whole + fraction:
        total = total + DIGITS.index(digit) * base ** power
        power = power - 1
    return total`,
  showDivision: `def show_division(n, base):
    """Print each step of converting n to the given base by repeated division."""
    while n > 0:
        print(f"{n} = {base} × {n // base} + {n % base}")
        n = n // base


show_division(57, 2)`,
  fromDecimal: `def from_decimal(n, base):
    """Return the digits of a whole number n >= 0 in the given base."""
    if n == 0:
        return "0"
    digits = ""
    while n > 0:
        digits = DIGITS[n % base] + digits    # the new digit goes on the LEFT
        n = n // base
    return digits`,
  showFraction: `def show_fraction(x, base):
    """Print each step of converting a fraction 0 <= x < 1 by repeated multiplication."""
    while x > 0:
        product = x * base
        digit = int(product)
        print(f"{x} × {base} = {product}   digit {digit}")
        x = product - digit


show_fraction(0.875, 2)`,
  fractionToBinary: `def fraction_to_binary(x, max_digits):
    """Return up to max_digits binary digits of a fraction 0 <= x < 1."""
    digits = ""
    while x > 0 and len(digits) < max_digits:
        x = x * 2
        digit = int(x)
        digits = digits + str(digit)
        x = x - digit
    return "0." + digits`,
  binaryToHex: `def binary_to_hex(bits):
    """Return the hexadecimal digits of a whole binary number such as "11101"."""
    while len(bits) % 4 != 0:
        bits = "0" + bits                 # pad on the LEFT of the integer part
    result = ""
    for i in range(0, len(bits), 4):
        group = bits[i:i + 4]
        result = result + DIGITS[int(group, 2)]
    return result`,
};

const DIGITS = "0123456789abcdef";
const fmt = (n) => n.toLocaleString("en-US", { maximumFractionDigits: 4 });
// Python prints a float that happens to be whole as "1.0"; JS prints "1".
const pyFloat = (x) => (Number.isInteger(x) && !/e/.test(String(x)) ? `${x}.0` : String(x));
const sup = (k) => `<sup>${k < 0 ? "−" + -k : k}</sup>`;
const sub = (b) => `<sub>${b}</sub>`;

// Demo-only styles (the shared stylesheet is not edited from a lecture folder).
(function addStyles() {
  const css = `
  .l1-row { display: flex; flex-wrap: wrap; gap: 14px; align-items: flex-start; }
  .l1-row > * { flex: 1 1 260px; min-width: 0; }
  .l1-digits { display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; margin: 10px 0; }
  .l1-dig { display: flex; flex-direction: column; align-items: center; gap: 3px; min-width: 40px; }
  .l1-dig .cell { width: auto; min-width: 40px; padding: 0 6px; }
  .l1-dig small { font: 11px var(--mono); color: var(--stone); white-space: nowrap; }
  .l1-dig.point .cell { min-width: 14px; width: 14px; border: none; background: none; font-size: 22px; }
  .cell.pad { color: var(--amber); border-style: dashed; }
  .cell.flip { background: var(--teal-soft); border-color: var(--teal); }
  .cell.carry { background: var(--mark); border-color: var(--amber); }
  .l1-expr { font: 14px/1.9 var(--mono); background: var(--paper-2); border-radius: 8px; padding: 8px 12px; overflow-wrap: anywhere; }
  .l1-expr .now { background: var(--mark); border-radius: 4px; padding: 0 2px; }
  .l1-groups { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: flex-end; margin: 10px 0; }
  .l1-group { display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .l1-group .bits { display: flex; gap: 2px; }
  .l1-group .bits span { font: 600 15px var(--mono); padding: 4px 3px; border-bottom: 2px solid var(--line); }
  .l1-group .bits span.pad { color: var(--amber); }
  .l1-group.now .bits span { border-bottom-color: var(--amber); }
  .l1-group .to { font: 700 18px var(--mono); color: var(--teal); min-height: 24px; }
  .l1-group.dot .bits span { border: none; font-size: 20px; }
  .l1-cpu { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
  .l1-cpu .full { grid-column: 1 / -1; }
  .l1-box { border: 1px solid var(--line); border-radius: 8px; padding: 6px 8px; background: var(--card); min-width: 0; }
  .l1-box small { display: block; font: 500 10px var(--mono); color: var(--stone); text-transform: uppercase; letter-spacing: 0.05em; }
  .l1-box b { font: 600 15px var(--mono); overflow-wrap: anywhere; }
  .l1-box.on { border-color: var(--amber); background: var(--mark); }
  .l1-phase { display: flex; gap: 6px; margin: 8px 0; }
  .l1-phase span { flex: 1; text-align: center; font: 600 12px var(--mono); padding: 5px 0; border-radius: 6px; background: var(--paper-2); color: var(--stone); }
  .l1-phase span.on { background: var(--teal); color: #fff; }
  .l1-mem { width: 100%; border-collapse: collapse; font: 13px var(--mono); margin-top: 8px; }
  .l1-mem td, .l1-mem th { border: 1px solid var(--line); padding: 4px 8px; text-align: left; }
  .l1-mem th { background: var(--card-2); font-weight: 600; }
  .l1-mem tr.on td { background: var(--mark); }
  .l1-mem tr.done td { color: var(--ink-2); }
  .l1-scroll { overflow-x: auto; }
  .l1-ladder { display: grid; gap: 6px; }
  .l1-rung { display: grid; grid-template-columns: 110px minmax(0, 1fr); gap: 10px; align-items: center; border: 1px solid var(--line); border-radius: 8px; padding: 8px 10px; background: var(--card); opacity: 0.45; transition: opacity 0.2s; }
  .l1-rung.seen { opacity: 1; }
  .l1-rung.on { border-color: var(--amber); background: var(--mark); opacity: 1; }
  .l1-rung b { font: 600 12px var(--mono); color: var(--teal); }
  .l1-rung code { overflow-wrap: anywhere; }
  .l1-map { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .l1-map .l1-box { transition: opacity 0.25s; }
  .l1-map .hide { opacity: 0.12; }
  .l1-map .wide { grid-column: 1 / -1; text-align: center; }
  .l1-map ul { margin: 4px 0 0; padding-left: 16px; font-size: 13px; }
  .l1-big { font: 700 26px var(--mono); color: var(--teal); overflow-wrap: anywhere; }
  @media (max-width: 600px) {
    .l1-rung { grid-template-columns: 1fr; gap: 2px; }
    .l1-dig { min-width: 32px; }
    .l1-dig .cell { min-width: 32px; }
  }`;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);
})();

// ---------- a generic step player (same controls as the L06 stepper) ----------
// opts: build() -> snaps, view(snap, i, snaps) -> html, extraControls, onMount(el, rebuild), mini
function makePlayer(el, opts) {
  const mini = !!opts.mini;
  el.innerHTML = `<div class="pl-view"></div>` + (mini ? "" : `<div class="msg pl-msg"></div>
    <div class="controls">
      <button class="cbtn pl-reset" title="Back to the start">⟲ Reset</button>
      <button class="cbtn pl-back" title="Step back (←)">◀ Back</button>
      <button class="cbtn pl-step on" title="Step (→)">Step ▶</button>
      <button class="cbtn pl-play">Play</button>
      ${opts.extraControls || ""}
      <span class="spacer"></span><span class="counter pl-count"></span>
    </div>`);
  const $ = (q) => el.querySelector(q);
  let snaps = [], i = 0, timer = null;
  function render() {
    const s = snaps[i];
    $(".pl-view").innerHTML = opts.view(s, i, snaps);
    if (mini) return;
    const m = $(".pl-msg");
    m.innerHTML = s.msg || "";
    m.className = "msg pl-msg " + (s.cls || "");
    $(".pl-count").textContent = `step ${i + 1} / ${snaps.length}`;
    $(".pl-back").disabled = $(".pl-reset").disabled = i === 0;
    $(".pl-step").disabled = i === snaps.length - 1;
  }
  function stop() { clearInterval(timer); timer = null; if (!mini) $(".pl-play").textContent = "Play"; }
  function play() {
    if (timer) return stop();
    if (i === snaps.length - 1) i = 0;
    if (!mini) $(".pl-play").textContent = "Pause";
    timer = setInterval(() => {
      if (i < snaps.length - 1) i++; else if (mini) i = 0; else return stop();
      render();
    }, opts.interval || (mini ? 1100 : 900));
  }
  function rebuild() { stop(); snaps = opts.build(); i = 0; render(); }
  if (!mini) {
    $(".pl-reset").onclick = () => { stop(); i = 0; render(); };
    $(".pl-back").onclick = () => { stop(); if (i > 0) i--; render(); };
    $(".pl-step").onclick = () => { stop(); if (i < snaps.length - 1) i++; render(); };
    $(".pl-play").onclick = play;
    el.tabIndex = 0;
    el.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
      if (e.key === "ArrowRight") { e.preventDefault(); $(".pl-step").click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); $(".pl-back").click(); }
    });
  }
  if (opts.onMount) opts.onMount(el, rebuild);
  rebuild();
  if (mini) play();
  return { rebuild };
}

const presetSelect = (cls, items) =>
  `<label>example <select class="${cls}">${items.map(([v, label]) => `<option value="${esc(v)}">${label}</option>`).join("")}</select></label>`;

// ---------- Chapter 1: the big picture ----------

function demoBigPicture(el, { mini = false } = {}) {
  const stages = [
    "Computer science stands on <b>mathematics</b>: probability and statistics, linear algebra, calculus, discrete mathematics.",
    "On top of it, two halves: <b>making computers better and easier to use</b> (systems), and <b>using computers to solve real-world problems</b> (applications).",
    "<b>Machine learning</b> sits between the two halves.",
    "<b>AI</b> now runs through all of it, in both directions: <b>AI for X</b> uses AI to do another field's work better; <b>X for AI</b> uses another field to build AI better.",
  ];
  makePlayer(el, {
    mini,
    build: () => stages.map((msg, k) => ({ k, msg })),
    view: (s) => {
      const h = (k) => (s.k >= k ? "" : " hide");
      return `<div class="l1-map">
        <div class="l1-box wide${h(3)}" style="border-color:var(--amber)"><b>AI</b> &nbsp;<small style="display:inline">AI for X ↓ · ↑ X for AI</small></div>
        <div class="l1-box${h(1)}"><small>make computers better</small><ul><li>architecture</li><li>operating systems</li><li>databases</li><li>networks</li><li>languages &amp; compilers</li><li>software engineering</li></ul></div>
        <div class="l1-box${h(1)}"><small>solve real-world problems</small><ul><li>natural language</li><li>computer vision</li><li>robotics</li><li>security</li><li>information retrieval</li><li>…</li></ul></div>
        <div class="l1-box wide${h(2)}"><b>machine learning</b></div>
        <div class="l1-box wide${h(0)}"><small>mathematics</small>probability &amp; statistics · linear algebra · calculus · discrete math</div>
      </div>`;
    },
  });
}

// ---------- Chapter 2: the machine cycle ----------

function buildMachine(a, b) {
  const prog = [["LOAD", 100], ["ADD", 101], ["STORE", 102], ["HALT"]];
  const mem = { 100: a, 101: b, 102: 0 };
  let pc = 0, A = 0, ir = "—";
  const snaps = [];
  const s = (phase, line, msg, extra = {}) => snaps.push({ phase, line, pc, A, ir, mem: { ...mem }, msg, ...extra });
  s("", 0, `The program is in memory cells 0–3, the data in cells 100–102. The program counter (PC) starts at 0.`);
  for (;;) {
    const [op, addr] = prog[pc];
    ir = op === "HALT" ? "HALT" : `${op} A, [${addr}]`;
    const at = pc;
    pc += 1;
    s("fetch", at + 1, `<b>Fetch.</b> The control unit reads the instruction at address ${at} into the instruction register, and adds 1 to the PC.`, { cu: true });
    const what = { LOAD: `copy cell ${addr} into A`, ADD: `add cell ${addr} to A`, STORE: `copy A into cell ${addr}`, HALT: "stop the machine" }[op];
    s("decode", at + 1, `<b>Decode.</b> <code>${ir}</code> means: ${what}.`, { cu: true });
    if (op === "HALT") { s("execute", at + 1, `<b>Execute.</b> The machine stops. Cell 102 holds <b>${mem[102]}</b>: four instructions, four fetches.`, { cls: "good", halted: true }); break; }
    if (op === "LOAD") { A = mem[addr]; s("execute", at + 1, `<b>Execute.</b> Memory sends cell ${addr} (${A}) to register A.`, { memOn: addr }); }
    if (op === "ADD") { const old = A; A = A + mem[addr]; s("execute", at + 1, `<b>Execute.</b> The ALU adds: ${old} + ${mem[addr]} = <b>${A}</b>.`, { alu: true, memOn: addr }); }
    if (op === "STORE") { mem[addr] = A; s("execute", at + 1, `<b>Execute.</b> Register A (${A}) is written into memory cell ${addr}.`, { memOn: addr }); }
  }
  return snaps;
}

function demoMachine(el, { mini = false } = {}) {
  let a = 2, b = 3;
  makePlayer(el, {
    mini,
    interval: mini ? 1000 : 900,
    extraControls: `<label>cell 100 <input type="number" class="m-a" value="2" min="0" max="999"></label><label>cell 101 <input type="number" class="m-b" value="3" min="0" max="999"></label>`,
    build: () => buildMachine(a, b),
    view: (s) => {
      const code = mini ? CODE.machine.replace(/\s+;.*$/gm, "") : CODE.machine;
      const codeHtml = codeBlock(code, "out", s.line ? [s.line + 1] : []);
      const ph = ["fetch", "decode", "execute"].map((p) => `<span class="${s.phase === p ? "on" : ""}">${p}</span>`).join("");
      const memRows = [100, 101, 102].map((k) => `<tr class="${s.memOn === k ? "on" : ""}"><td>${k}</td><td>${s.mem[k]}</td></tr>`).join("");
      return `<div class="l1-row">
        <div>${codeHtml}</div>
        <div><div class="l1-phase">${ph}</div>
          <div class="l1-cpu">
            <div class="l1-box ${s.phase === "fetch" ? "on" : ""}"><small>PC</small><b>${s.pc}</b></div>
            <div class="l1-box ${s.alu ? "on" : ""}"><small>ALU</small><b>${s.alu ? "+" : "·"}</b></div>
            <div class="l1-box full ${s.cu ? "on" : ""}"><small>CU · instruction</small><b>${esc(s.ir)}</b></div>
            <div class="l1-box full ${s.phase === "execute" && !s.halted ? "on" : ""}"><small>register A</small><b>${s.A}</b></div>
          </div>
          <table class="l1-mem"><tr><th>address</th><th>data</th></tr>${memRows}</table></div>
      </div>`;
    },
    onMount(root, rebuild) {
      if (mini) return;
      const clamp = (v, d) => (Number.isFinite(+v) ? Math.max(0, Math.min(999, Math.trunc(+v))) : d);
      root.querySelector(".m-a").onchange = (e) => { a = clamp(e.target.value, 2); e.target.value = a; rebuild(); };
      root.querySelector(".m-b").onchange = (e) => { b = clamp(e.target.value, 3); e.target.value = b; rebuild(); };
    },
  });
}

// ---------- Chapter 3: ladders of abstraction ----------

const LADDERS = {
  languages: {
    label: "languages",
    rungs: [["Python", "result = 2 + 3"], ["C", "int result = 2 + 3;"], ["assembly", "add 2, 3, result"], ["machine code", "1101101010011010"]],
    notes: [
      "<b>Python</b>: one line says what you want. Highest <b>development efficiency</b>: quick to write, read and fix. An interpreter translates it as it runs.",
      "<b>C</b>: still high-level, but you declare the type and manage memory yourself. A compiler translates it ahead of time; it runs fast.",
      "<b>Assembly</b>: one name per machine instruction. An <b>assembler</b> turns it into machine code. Tied to one CPU architecture.",
      "<b>Machine code</b>: the only thing the CPU runs. Highest <b>language efficiency</b>; nobody writes it by hand. (This bit pattern is the slide's illustration.)",
    ],
  },
  systems: {
    label: "systems",
    rungs: [["apps", "applications: browser, editor, your Python program"], ["OS", "operating system: Windows, macOS, Linux, iOS, Android"], ["hardware", "CPU, memory, storage, input/output devices"]],
    notes: [
      "<b>Applications</b> are programs built on top of the OS. When your program opens a file or prints, it asks the OS.",
      "The <b>operating system</b> controls and monitors the system, allocates resources (memory, CPU time, files, devices) and schedules which program runs when.",
      "The <b>hardware</b> does the actual work, one fetch–decode–execute cycle at a time.",
    ],
  },
  data: {
    label: "data",
    rungs: [["data structures", "lists, dictionaries (Lecture 5)"], ["primitive types", "numbers, text (Lecture 2)"], ["binary digits", "0 and 1"]],
    notes: [
      "<b>Data structures</b> organise many values: a list of marks, a dictionary of names to phone numbers.",
      "<b>Primitive data types</b>: a whole number, a fraction, a piece of text.",
      "Underneath it all: <b>bits</b>. Chapters 4–8 show how numbers and text become 0s and 1s.",
    ],
  },
};

function demoLadder(el, { mini = false } = {}) {
  let which = "languages";
  makePlayer(el, {
    mini,
    extraControls: `<label>ladder <select class="ld-which"><option value="languages">languages</option><option value="systems">systems</option><option value="data">data</option></select></label>`,
    build: () => {
      const L = LADDERS[which];
      const snaps = L.rungs.map((r, k) => ({ k, msg: L.notes[k] }));
      snaps.push({ k: -1, msg: "Each rung hides the details of the rung below it. You write Python at the top of all three ladders.", cls: "good" });
      return snaps;
    },
    view: (s) => {
      const L = LADDERS[which];
      const rungs = L.rungs.map(([name, txt], k) => {
        const cls = s.k === k ? " on" : (s.k === -1 || k < s.k ? " seen" : "");
        return `<div class="l1-rung${cls}"><b>${name}</b><code>${esc(txt)}</code></div>`;
      }).join("");
      let bars = "";
      if (which === "languages" && !mini) {
        const lvl = s.k === -1 ? null : s.k;
        const dev = [95, 70, 25, 5], run = [35, 90, 97, 100];
        const w = (arr) => (lvl == null ? 0 : arr[lvl]);
        bars = `<div class="bars" style="margin-top:12px">
          <div class="bar"><span>development efficiency</span><div class="track"><div class="fill" style="width:${w(dev)}%"></div></div><span class="v">${lvl == null ? "" : ["highest", "medium", "low", "lowest"][lvl]}</span></div>
          <div class="bar"><span>language efficiency</span><div class="track"><div class="fill amber" style="width:${w(run)}%"></div></div><span class="v">${lvl == null ? "" : ["lower", "high", "higher", "highest"][lvl]}</span></div></div>`;
      }
      return `<div class="l1-ladder">${rungs}</div>${bars}${mini && s.k >= 0 ? `<p class="hint" style="margin:8px 0 0">${L.notes[s.k].replace(/<[^>]+>/g, "").split(".")[0]}.</p>` : ""}`;
    },
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".ld-which").onchange = (e) => { which = e.target.value; rebuild(); };
    },
  });
}

// ---------- Chapter 4: counting in a base (an odometer) ----------

const COUNTER_WIDTH = { 2: 8, 8: 4, 10: 4, 16: 4 };

function digitsOf(v, base, width) {
  const ds = [];
  for (let k = 0; k < width; k++) { ds.unshift(v % base); v = Math.floor(v / base); }
  return ds;
}

function demoCounter(el, { mini = false } = {}) {
  let base = 2, v = 0, prev = null, msg = "";
  const width = () => (mini ? 5 : COUNTER_WIDTH[base]);
  const max = () => base ** width() - 1;
  el.innerHTML = `<div class="ct-view"></div>${mini ? "" : `<div class="msg ct-msg"></div>
    <div class="controls">
      <button class="cbtn ct-reset">⟲ 0</button><button class="cbtn ct-dn">− 1</button>
      <button class="cbtn ct-up on">+ 1 ▶</button><button class="cbtn ct-play">Play</button>
      <label>base <select class="ct-base"><option>2</option><option>8</option><option>10</option><option>16</option></select></label>
      <label>jump to <input type="number" class="ct-to" min="0" value="0"></label>
    </div>`}`;
  const $ = (q) => el.querySelector(q);
  let timer = null;
  function explain(oldV, newV) {
    if (newV === 0 && oldV === max()) return `Every digit was the last symbol, so every position carried and the counter <b>overflowed</b> back to 0: with ${width()} digits the largest number is ${fmt(max())}.`;
    const d = digitsOf(oldV, base, width());
    let k = width() - 1, carries = 0;
    while (k >= 0 && d[k] === base - 1) { carries++; k--; }
    const last = DIGITS[base - 1].toUpperCase();
    if (!carries) return `The last digit just goes up by one. No carry.`;
    return `The last ${carries > 1 ? carries + " digits were" : "digit was"} <b>${last}</b>, the last symbol of base ${base}. ${last} + 1 = "10": write 0 and <b>carry 1</b> (逢${{ 2: "二", 8: "八", 10: "十", 16: "十六" }[base]}进一)${carries > 1 ? ", again and again" : ""}.`;
  }
  function render() {
    const W = width(), ds = digitsOf(v, base, W), pds = prev == null ? ds : digitsOf(prev, base, W);
    const cells = ds.map((d, k) => {
      const changed = d !== pds[k];
      const cls = changed ? (d === 0 ? "carry" : "flip") : "";
      const p = W - 1 - k;
      return `<div class="l1-dig"><div class="cell ${cls}">${DIGITS[d].toUpperCase()}</div><small>${base}${sup(p)}</small>${mini ? "" : `<small>${fmt(base ** p)}</small>`}</div>`;
    }).join("");
    const terms = ds.map((d, k) => [d, W - 1 - k]).filter(([d]) => d).map(([d, p]) => `${d}×${base}${sup(p)}`);
    $(".ct-view").innerHTML = `<div class="l1-digits">${cells}</div>
      <div class="l1-expr" style="text-align:center">(${ds.map((d) => DIGITS[d].toUpperCase()).join("").replace(/^0+(?=.)/, "")})${sub(base)} = ${terms.length ? terms.join(" + ") : "0"} = <b>${fmt(v)}</b>${sub(10)}</div>`;
    if (mini) return;
    $(".ct-msg").innerHTML = msg || `Base ${base}: symbols ${DIGITS.slice(0, base).toUpperCase().split("").join(", ")}. Press <b>+ 1</b> (or →) and watch the carries.`;
    $(".ct-dn").disabled = v === 0;
  }
  function step(dir) {
    prev = v;
    if (dir > 0) { v = v === max() ? 0 : v + 1; msg = explain(prev, v); }
    else if (v > 0) { v -= 1; msg = "Counting down: the reverse of the carry is a <b>borrow</b>."; }
    render();
  }
  function stop() { clearInterval(timer); timer = null; if (!mini) $(".ct-play").textContent = "Play"; }
  function play() {
    if (timer) return stop();
    if (!mini) $(".ct-play").textContent = "Pause";
    timer = setInterval(() => step(1), mini ? 800 : 650);
  }
  if (!mini) {
    $(".ct-up").onclick = () => { stop(); step(1); };
    $(".ct-dn").onclick = () => { stop(); step(-1); };
    $(".ct-reset").onclick = () => { stop(); prev = null; v = 0; msg = ""; render(); };
    $(".ct-play").onclick = play;
    $(".ct-base").onchange = (e) => { stop(); base = +e.target.value; prev = null; v = Math.min(v, max()); msg = ""; render(); };
    $(".ct-to").onchange = (e) => {
      stop();
      const t = Math.trunc(+e.target.value);
      prev = null; v = Number.isFinite(t) ? Math.max(0, Math.min(max(), t)) : 0; e.target.value = v;
      msg = `Jumped to ${fmt(v)}. With ${width()} base-${base} digits the counter goes up to ${fmt(max())}.`;
      render();
    };
    el.tabIndex = 0;
    el.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
      if (e.key === "ArrowRight") { e.preventDefault(); $(".ct-up").click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); $(".ct-dn").click(); }
    });
  }
  render();
  if (mini) play();
}

// ---------- Chapter 5: to_decimal, digit by digit ----------

// Split a digit string the way to_decimal does (str.partition), or explain what is wrong.
function parseNumber(text, base) {
  const t = String(text).trim().toLowerCase();
  if (!t || t === "." || (t.match(/\./g) || []).length > 1) return { err: "Type a number such as 1101.01 (at most one point)." };
  const bad = [...t.replace(".", "")].find((c) => DIGITS.indexOf(c) < 0 || DIGITS.indexOf(c) >= base);
  if (bad !== undefined) return { err: `"${esc(bad)}" is not a digit in base ${base}: the symbols are ${DIGITS.slice(0, base).toUpperCase().split("").join(", ")}.` };
  const k = t.indexOf(".");
  const whole = k < 0 ? t : t.slice(0, k), fraction = k < 0 ? "" : t.slice(k + 1);
  if (whole.length + fraction.length > 16) return { err: "Please use at most 16 digits." };
  return { whole, fraction, isFloat: k >= 0 && fraction.length > 0 };
}

function toDecimal(text, base) {
  const p = parseNumber(text, base);
  if (p.err) return p;
  let total = 0, power = p.whole.length - 1;
  for (const d of p.whole + p.fraction) { total = total + DIGITS.indexOf(d) * base ** power; power -= 1; }
  return { ...p, value: total };
}

const pyNum = (x, isFloat) => (isFloat ? pyFloat(x) : String(x));

function buildToDecimal(text, base) {
  const p = parseNumber(text, base);
  if (p.err) return [{ err: true, msg: p.err, cls: "bad" }];
  const all = [...p.whole, ...p.fraction];
  const digits = all.map((d, k) => ({ d, val: DIGITS.indexOf(d), power: p.whole.length - 1 - k }));
  const snaps = [];
  const shown = `(${p.whole.toUpperCase()}${p.fraction ? "." + p.fraction.toUpperCase() : ""})${sub(base)}`;
  snaps.push({ p, digits, upto: -1, total: 0, isFloat: false, msg: `${shown}: <code>power</code> starts at len(whole) − 1 = ${p.whole.length - 1}, so the first digit's weight is ${base}${sup(p.whole.length - 1)}.` });
  let total = 0, isFloat = false;
  digits.forEach((g, k) => {
    const term = g.val * base ** g.power;
    total = total + term;
    if (g.power < 0) isFloat = true;
    const name = /[a-f]/.test(g.d) ? `<b>${g.d.toUpperCase()}</b> is ${g.val}, so ` : "";
    snaps.push({ p, digits, upto: k, total, isFloat, msg: `${name}${g.val} × ${base}${sup(g.power)} = ${pyNum(term, g.power < 0)}. Running total: <b>${pyNum(total, isFloat)}</b>.` });
  });
  snaps.push({ p, digits, upto: digits.length, total, isFloat, cls: "good",
    msg: `<code>to_decimal("${esc(String(text).trim())}", ${base})</code> returns <b>${pyNum(total, isFloat)}</b>.` });
  return snaps;
}

function demoToDecimal(el, { mini = false } = {}) {
  const presets = [["1101.01|2", "(1101.01)₂"], ["10110.11|2", "(10110.11)₂"], ["24.67|8", "(24.67)₈"], ["35.7|8", "(35.7)₈"], ["2AB.C|16", "(2AB.C)₁₆"], ["A7D.E|16", "(A7D.E)₁₆"], ["1001|2", "(1001)₂"]];
  let text = "1101.01", base = 2;
  makePlayer(el, {
    mini,
    interval: mini ? 1000 : 900,
    extraControls: `${presetSelect("td-pre", presets)}<label>number <input type="text" class="td-num" value="1101.01" style="width:120px"></label>
      <label>base <select class="td-base"><option>2</option><option>3</option><option>8</option><option>10</option><option>16</option></select></label>`,
    build: () => buildToDecimal(text, base),
    view: (s) => {
      if (s.err) return `<div class="l1-expr">—</div>`;
      const cells = [];
      s.digits.forEach((g, k) => {
        if (k === s.p.whole.length) cells.push(`<div class="l1-dig point"><div class="cell">.</div></div>`);
        const cls = k === s.upto ? "mid" : k < s.upto ? "found" : "";
        cells.push(`<div class="l1-dig"><div class="cell ${cls}">${g.d.toUpperCase()}</div><small>${base}${sup(g.power)}</small></div>`);
      });
      if (!s.p.whole.length) cells.unshift(`<div class="l1-dig point"><div class="cell">.</div></div>`);
      const terms = s.digits.map((g, k) => {
        if (k > s.upto) return "";
        return `<span class="${k === s.upto ? "now" : ""}">${g.val}×${base}${sup(g.power)}</span>`;
      }).filter(Boolean);
      return `<div class="l1-digits">${cells.join("")}</div>
        <div class="l1-expr">${terms.length ? terms.join(" + ") : "&nbsp;"}${s.upto >= 0 ? ` = <b>${pyNum(s.total, s.isFloat)}</b>` : ""}</div>`;
    },
    onMount(root, rebuild) {
      if (mini) return;
      const $ = (q) => root.querySelector(q);
      $(".td-pre").onchange = (e) => { [text, base] = e.target.value.split("|"); base = +base; $(".td-num").value = text; $(".td-base").value = base; rebuild(); };
      $(".td-num").onchange = (e) => { text = e.target.value; rebuild(); };
      $(".td-base").onchange = (e) => { base = +e.target.value; rebuild(); };
    },
  });
}

// ---------- Chapter 6: divide down, multiply up ----------

function buildDivision(n, base) {
  if (!Number.isInteger(n) || n < 0 || n > 1e12) return [{ err: true, msg: "Type a whole number from 0 to 1,000,000,000,000.", cls: "bad" }];
  const rows = [], snaps = [];
  snaps.push({ rows: [], out: [], done: false, msg: `Divide ${fmt(n)} by ${base} again and again, keeping the remainders, until the quotient is 0.` });
  if (n === 0) {
    snaps.push({ rows: [], out: [], done: true, digits: "0", cls: "good", msg: `<code>show_division(0, ${base})</code> prints nothing: the loop never runs. <code>from_decimal(0, ${base})</code> returns <b>'0'</b> by its first <code>if</code>.` });
    return snaps;
  }
  let m = n;
  while (m > 0) {
    const q = Math.floor(m / base), r = m % base;
    rows.push({ n: m, q, r });
    const line = `${m} = ${base} × ${q} + ${r}`;
    const digitNote = r >= 10 ? ` A remainder of ${r} is the digit <b>${DIGITS[r].toUpperCase()}</b>.` : "";
    snaps.push({ rows: rows.slice(), out: rows.map((x) => `${x.n} = ${base} × ${x.q} + ${x.r}`), done: false,
      msg: `<code>${line}</code>: remainder <b>${r}</b>${rows.length === 1 ? ", the <b>lowest</b> digit (低位)" : ""}.${digitNote}${q === 0 ? " The quotient is 0, so we stop." : ""}` });
    m = q;
  }
  const digits = rows.map((x) => DIGITS[x.r]).reverse().join("");
  snaps.push({ rows, out: rows.map((x) => `${x.n} = ${base} × ${x.q} + ${x.r}`), done: true, digits, cls: "good",
    msg: `Read the remainders from the <b>bottom up</b> (高位 first): (${fmt(n)})${sub(10)} = (${digits.toUpperCase()})${sub(base)}. <code>from_decimal(${n}, ${base})</code> returns <b>'${digits}'</b>.` });
  return snaps;
}

function demoDivision(el, { mini = false } = {}) {
  let n = 57, base = 2;
  makePlayer(el, {
    mini,
    interval: mini ? 1000 : 900,
    extraControls: `${presetSelect("dv-pre", [["57|2", "57 → base 2"], ["215|2", "215 → base 2"], ["215|8", "215 → base 8"], ["215|16", "215 → base 16"], ["13|2", "13 → base 2"], ["100|2", "100 → base 2"]])}
      <label>n <input type="number" class="dv-n" value="57" min="0" style="width:110px"></label>
      <label>base <select class="dv-base"><option>2</option><option>3</option><option>8</option><option>16</option></select></label>`,
    build: () => buildDivision(n, base),
    view: (s) => {
      if (s.err) return `<div class="l1-expr">—</div>`;
      const last = s.rows.length - 1;
      const rows = s.rows.map((x, k) => `<tr class="${!s.done && k === last ? "on" : ""}"><td>${base}</td><td>${x.n}</td><td>…</td><td><b>${x.r}${x.r >= 10 ? " → " + DIGITS[x.r].toUpperCase() : ""}</b></td><td>${k === 0 ? "低位 lowest" : ""}${s.done && k === last ? "高位 highest ↑" : ""}</td></tr>`).join("");
      const res = s.done ? `<p class="l1-big" style="text-align:center;margin:8px 0">${s.digits.toUpperCase()}<sub style="font-size:14px">${base}</sub></p>` : "";
      if (mini) return `<table class="l1-mem"><tr><th>÷</th><th>n</th><th></th><th>rem.</th><th></th></tr>${rows}</table>${res}`;
      return `<div class="l1-row"><div><table class="l1-mem"><tr><th>÷</th><th>n</th><th></th><th>remainder</th><th></th></tr>${rows}</table>${res}</div>
        <div><small class="mono" style="color:var(--stone)">show_division(${n}, ${base}) prints</small><div class="console">${esc(s.out.join("\n"))}</div></div></div>`;
    },
    onMount(root, rebuild) {
      if (mini) return;
      const $ = (q) => root.querySelector(q);
      $(".dv-pre").onchange = (e) => { [n, base] = e.target.value.split("|").map(Number); $(".dv-n").value = n; $(".dv-base").value = base; rebuild(); };
      $(".dv-n").onchange = (e) => { n = Math.trunc(+e.target.value); rebuild(); };
      $(".dv-base").onchange = (e) => { base = +e.target.value; rebuild(); };
    },
  });
}

const MAX_FRACTION_DIGITS = 20;
// About 20 bits' worth of digits in every base: 20 binary, 7 octal, 5 hex digits. A double
// holds 53 bits, so with more hex digits a repeating fraction such as 0.2 would seem to end.
const maxDigits = (base) => (base === 2 ? MAX_FRACTION_DIGITS : Math.ceil(MAX_FRACTION_DIGITS / Math.log2(base)));

function buildFraction(x0, base) {
  if (!(x0 >= 0 && x0 < 1)) return [{ err: true, msg: "Type a fraction x with 0 ≤ x < 1, such as 0.6875.", cls: "bad" }];
  const snaps = [], lines = [];
  let x = x0, digits = "";
  snaps.push({ lines: [], digits, msg: `Multiply by ${base}; the integer part of the product is the next digit, the fractional part goes round again.` });
  while (x > 0 && digits.length < maxDigits(base)) {
    const product = x * base, digit = Math.trunc(product);
    lines.push(`${pyFloat(x)} × ${base} = ${pyFloat(product)}   digit ${digit}`);
    digits += DIGITS[digit];
    snaps.push({ lines: lines.slice(), digits, msg: `${pyFloat(x)} × ${base} = ${pyFloat(product)}: digit <b>${DIGITS[digit].toUpperCase()}</b>${digits.length === 1 ? ", the <b>highest</b> digit, just after the point" : ""}. Keep ${pyFloat(product - digit)}.` });
    x = product - digit;
  }
  const result = `0.${digits || ""}`;
  const fin = x === 0
    ? `The fraction reached 0, so the expansion ends: (${pyFloat(x0)})${sub(10)} = (${result.toUpperCase()})${sub(base)}. Read the digits <b>top-down</b>.`
    : `Stopped after ${maxDigits(base)} digits and it has not ended: (${pyFloat(x0)})${sub(10)} ≈ (${result.toUpperCase()}…)${sub(base)}. Like 1/3 in decimal, it goes on forever${base === 2 ? `. <code>fraction_to_binary(${pyFloat(x0)}, 20)</code> returns <b>'${result}'</b>` : ""}.`;
  snaps.push({ lines, digits, cls: x === 0 ? "good" : "bad", msg: fin, done: true, ended: x === 0 });
  return snaps;
}

function demoFraction(el, { mini = false } = {}) {
  let x = 0.875, base = 2;
  makePlayer(el, {
    mini,
    extraControls: `${presetSelect("fr-pre", [["0.875", "0.875"], ["0.6875", "0.6875"], ["0.375", "0.375"], ["0.625", "0.625"], ["0.1", "0.1 (never ends)"], ["0.2", "0.2"]])}
      <label>x <input type="text" class="fr-x" value="0.875" style="width:90px"></label>
      <label>base <select class="fr-base"><option>2</option><option>8</option><option>16</option></select></label>`,
    build: () => buildFraction(x, base),
    view: (s) => {
      if (s.err) return `<div class="l1-expr">—</div>`;
      const ds = [...s.digits].map((d, k) => `<div class="l1-dig"><div class="cell ${k === s.digits.length - 1 && !s.done ? "mid" : s.done ? "found" : ""}">${d.toUpperCase()}</div><small>${base}${sup(-(k + 1))}</small></div>`).join("");
      return `<div class="l1-digits"><div class="l1-dig"><div class="cell">0</div><small>${base}${sup(0)}</small></div><div class="l1-dig point"><div class="cell">.</div></div>${ds}${s.done && !s.ended ? `<div class="l1-dig point"><div class="cell">…</div></div>` : ""}</div>
        <small class="mono" style="color:var(--stone)">show_fraction(${pyFloat(x)}, ${base}) prints</small><div class="console">${esc(s.lines.join("\n"))}</div>`;
    },
    onMount(root, rebuild) {
      if (mini) return;
      const $ = (q) => root.querySelector(q);
      $(".fr-pre").onchange = (e) => { x = +e.target.value; $(".fr-x").value = e.target.value; rebuild(); };
      $(".fr-x").onchange = (e) => { x = e.target.value.trim() === "" ? NaN : +e.target.value; rebuild(); };
      $(".fr-base").onchange = (e) => { base = +e.target.value; rebuild(); };
    },
  });
}

// ---------- Chapter 7: grouping bits ----------

function buildGrouping(text, mode) {
  const [from, to] = mode.split("-").map(Number);       // e.g. "2-16", "8-2"
  const p = parseNumber(text, from);
  if (p.err) return [{ err: true, msg: p.err, cls: "bad" }];
  const size = from === 2 ? Math.log2(to) : Math.log2(from);
  const snaps = [];
  const pretty = (w, f) => `${w || "0"}${f ? "." + f : ""}`;
  if (from === 2) {
    const g = (w, f) => {
      const groups = [];
      for (let k = 0; k < w.length; k += size) groups.push({ bits: w.slice(k, k + size) });
      return groups;
    };
    let w = p.whole, f = p.fraction;
    snaps.push({ w, f, wPad: 0, fPad: 0, groups: null, msg: `Start at the point. Groups of <b>${size}</b> bits: the integer part goes <b>left</b> from the point, the fraction goes <b>right</b>.` });
    const wPad = (size - (w.length % size)) % size, fPad = f ? (size - (f.length % size)) % size : 0;
    const W = "0".repeat(wPad) + w, F = f + "0".repeat(fPad);
    snaps.push({ w: W, f: F, wPad, fPad: 0, groups: null, msg: wPad ? `Pad the integer part with ${wPad} zero${wPad > 1 ? "s" : ""} on the <b>left</b>, where zeros don't change the value.` : "The integer part already splits into whole groups." });
    snaps.push({ w: W, f: F, wPad, fPad, groups: null, msg: f ? (fPad ? `Pad the fraction with ${fPad} zero${fPad > 1 ? "s" : ""} on the <b>right</b>.` : "The fraction already splits into whole groups.") : "No fractional part." });
    const groups = [...g(W, ""), "dot", ...(F ? g(F, "") : [])].filter((x) => x !== "dot" || F);
    const map = [];
    groups.forEach((gr, k) => {
      if (gr === "dot") return;
      map.push(k);
    });
    let doneK = -1;
    for (const k of map) {
      doneK = k;
      const gr = groups[k], d = DIGITS[parseInt(gr.bits, 2)];
      snaps.push({ w: W, f: F, wPad, fPad, groups, nW: W.length / size, doneK, msg: `${gr.bits} = ${parseInt(gr.bits, 2)} → <b>${d.toUpperCase()}</b>` });
    }
    const digit = (gr) => DIGITS[parseInt(gr.bits, 2)].toUpperCase();
    const wi = groups.slice(0, groups.indexOf("dot") < 0 ? groups.length : groups.indexOf("dot")).map(digit).join("").replace(/^0+(?=.)/, "");
    const fi = groups.indexOf("dot") < 0 ? "" : groups.slice(groups.indexOf("dot") + 1).map(digit).join("");
    snaps.push({ w: W, f: F, wPad, fPad, groups, nW: W.length / size, doneK: groups.length, cls: "good", done: true, result: pretty(wi, fi),
      msg: `(${pretty(p.whole, p.fraction)})${sub(2)} = (<b>${pretty(wi, fi)}</b>)${sub(to)}.${to === 16 ? " Python's <code>hex</code> writes the same digits in lower case." : ""}` });
    return snaps;
  }
  // octal/hex -> binary: each digit becomes `size` bits.
  const all = [...p.whole, "dot", ...p.fraction].filter((x) => x !== "dot" || p.fraction);
  const groups = all.map((d) => (d === "dot" ? "dot" : { d, bits: DIGITS.indexOf(d).toString(2).padStart(size, "0") }));
  snaps.push({ groups, doneK: -1, rev: true, msg: `Replace each base-${from} digit with its <b>${size}</b> bits, keeping the order.` });
  groups.forEach((gr, k) => {
    if (gr === "dot") return;
    snaps.push({ groups, doneK: k, rev: true, msg: `${gr.d.toUpperCase()} = ${DIGITS.indexOf(gr.d)} → <b>${gr.bits}</b>` });
  });
  const bitsW = groups.slice(0, p.whole.length).map((x) => x.bits).join("").replace(/^0+(?=.)/, "");
  const bitsF = p.fraction ? groups.slice(p.whole.length + 1).map((x) => x.bits).join("").replace(/0+$/, "") : "";
  const res = pretty(bitsW, bitsF);
  snaps.push({ groups, doneK: groups.length, rev: true, done: true, cls: "good", result: res,
    msg: `Drop the zeros at the front of the integer part and at the end of the fraction: (${pretty(p.whole, p.fraction).toUpperCase()})${sub(from)} = (<b>${res}</b>)${sub(2)}.` });
  return snaps;
}

function demoGrouping(el, { mini = false } = {}) {
  const presets = [["1101101.011|2-8", "(1101101.011)₂ → octal"], ["0.10111|2-8", "(0.10111)₂ → octal"], ["11101.01|2-8", "(11101.01)₂ → octal"], ["11101.01|2-16", "(11101.01)₂ → hex"], ["11010111|2-16", "(11010111)₂ → hex"],
    ["0.754|8-2", "(0.754)₈ → binary"], ["16.327|8-2", "(16.327)₈ → binary"], ["4C.2E|16-2", "(4C.2E)₁₆ → binary"], ["AD.7F|16-2", "(AD.7F)₁₆ → binary"]];
  let text = "11101.01", mode = "2-16";
  makePlayer(el, {
    mini,
    interval: mini ? 1000 : 900,
    extraControls: `${presetSelect("gr-pre", presets.map(([v, l]) => [v, l]))}
      <label>number <input type="text" class="gr-num" value="11101.01" style="width:130px"></label>
      <label><select class="gr-mode"><option value="2-8">binary → octal</option><option value="2-16" selected>binary → hex</option><option value="8-2">octal → binary</option><option value="16-2">hex → binary</option></select></label>`,
    build: () => buildGrouping(text, mode),
    view: (s) => {
      if (s.err) return `<div class="l1-expr">—</div>`;
      let html;
      if (s.rev) {
        html = s.groups.map((gr, k) => (gr === "dot" ? `<div class="l1-group dot"><div class="to">&nbsp;</div><div class="bits"><span>.</span></div></div>`
          : `<div class="l1-group ${k === s.doneK ? "now" : ""}"><div class="to">${gr.d.toUpperCase()}</div><div class="bits">${k <= s.doneK ? [...gr.bits].map((b) => `<span>${b}</span>`).join("") : "<span>&nbsp;?&nbsp;</span>"}</div></div>`)).join("");
      } else if (!s.groups) {
        const span = (str, padN, left) => [...str].map((b, k) => `<span class="${(left ? k < padN : k >= str.length - padN) ? "pad" : ""}">${b}</span>`).join("");
        html = `<div class="l1-group"><div class="bits">${span(s.w, s.wPad, true)}</div></div>${s.f ? `<div class="l1-group dot"><div class="bits"><span>.</span></div></div><div class="l1-group"><div class="bits">${span(s.f, s.fPad, false)}</div></div>` : ""}`;
      } else {
        const nW = s.nW;
        let wSeen = 0;
        html = s.groups.map((gr, k) => {
          if (gr === "dot") return `<div class="l1-group dot"><div class="bits"><span>.</span></div><div class="to">.</div></div>`;
          const inWhole = k < nW;
          const start = inWhole ? wSeen : 0;
          if (inWhole) wSeen += gr.bits.length;
          const bits = [...gr.bits].map((b, j) => {
            const pad = inWhole ? start + j < s.wPad : (k === s.groups.length - 1 && j >= gr.bits.length - s.fPad);
            return `<span class="${pad ? "pad" : ""}">${b}</span>`;
          }).join("");
          return `<div class="l1-group ${k === s.doneK && !s.done ? "now" : ""}"><div class="bits">${bits}</div><div class="to">${k <= s.doneK ? DIGITS[parseInt(gr.bits, 2)].toUpperCase() : ""}</div></div>`;
        }).join("");
      }
      return `<div class="l1-groups">${html}</div>${s.done ? `<p class="l1-big" style="text-align:center;margin:6px 0">${s.result}</p>` : ""}`;
    },
    onMount(root, rebuild) {
      if (mini) return;
      const $ = (q) => root.querySelector(q);
      $(".gr-pre").value = "11101.01|2-16";
      $(".gr-pre").onchange = (e) => { [text, mode] = e.target.value.split("|"); $(".gr-num").value = text; $(".gr-mode").value = mode; rebuild(); };
      $(".gr-num").onchange = (e) => { text = e.target.value; rebuild(); };
      $(".gr-mode").onchange = (e) => { mode = e.target.value; rebuild(); };
    },
  });
}

// A converter that chains the two methods: to_decimal, then divide / multiply.
function convertAll(text, base) {
  const r = toDecimal(text, base);
  if (r.err) return r;
  const whole = Math.trunc(r.value);
  let frac = r.value - whole;
  const out = {};
  for (const b of [2, 8, 10, 16]) {
    let w = "", n = whole;
    if (n === 0) w = "0";
    while (n > 0) { w = DIGITS[n % b] + w; n = Math.floor(n / b); }
    let f = "", x = frac;
    while (b !== 10 && x > 0 && f.length < maxDigits(b)) { x = x * b; const d = Math.trunc(x); f += DIGITS[d]; x -= d; }
    if (b === base) { out[b] = { text: String(text).trim().toUpperCase(), cut: false }; continue; }
    out[b] = b === 10 ? { text: String(r.value), cut: false } : { text: (w + (f ? "." + f : "")).toUpperCase(), cut: x > 0 };
  }
  return { value: r.value, isFloat: r.isFloat, out };
}

function demoConverter(el) {
  el.innerHTML = `<div class="controls" style="margin-top:0">
      <label>number <input type="text" class="cv-num" value="A7D.E" style="width:150px"></label>
      <label>in base <select class="cv-base"><option>2</option><option>8</option><option>10</option><option selected>16</option></select></label></div>
    <div class="cv-out"></div>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    const base = +$(".cv-base").value, r = convertAll($(".cv-num").value, base);
    if (r.err) { $(".cv-out").innerHTML = `<div class="msg bad">${r.err}</div>`; return; }
    const name = { 2: "binary", 8: "octal", 10: "decimal", 16: "hexadecimal" };
    $(".cv-out").innerHTML = `<table class="l1-mem" style="margin-top:12px">${[2, 8, 10, 16].map((b) => `<tr class="${b === base ? "on" : ""}"><th>${name[b]}</th><td style="overflow-wrap:anywhere">${r.out[b].text}${r.out[b].cut ? "…" : ""}</td></tr>`).join("")}</table>
      <p class="hint">Value: <code>to_decimal</code> gives ${pyNum(r.value, r.isFloat)}. A trailing … means the fraction does not end in that base; about 20 bits' worth of digits are shown (20 binary, 7 octal, 5 hex).</p>`;
  }
  $(".cv-num").oninput = render;
  $(".cv-base").onchange = render;
  render();
}

// ---------- Chapter 8: bits, bytes, units and memory ----------

function demoBits(el) {
  el.innerHTML = `<div class="bt-view"></div><div class="controls">
    <label>bits <input type="range" class="bt-n" min="1" max="32" value="8"> <b class="bt-nv mono">8</b></label>
    <button class="cbtn bt-8">1 byte</button><button class="cbtn bt-16">2 bytes</button><button class="cbtn bt-32">4 bytes</button></div>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    const n = +$(".bt-n").value;
    $(".bt-nv").textContent = n;
    const cells = Array.from({ length: n }, (_, k) => `<div class="l1-dig"><div class="cell flip">1</div>${n <= 16 ? `<small>2${sup(n - 1 - k)}</small>` : ""}</div>`).join("");
    $(".bt-view").innerHTML = `<div class="l1-digits">${cells}</div>
      <div class="stats">
        <div class="stat"><small>bits</small><b>${n}</b></div>
        <div class="stat"><small>bytes</small><b>${n % 8 ? (n / 8).toFixed(3).replace(/0+$/, "") : n / 8}</b></div>
        <div class="stat good"><small>patterns 2<sup>n</sup></small><b>${fmt(2 ** n)}</b></div>
        <div class="stat"><small>largest 2<sup>n</sup> − 1</small><b>${fmt(2 ** n - 1)}</b></div></div>`;
  }
  $(".bt-n").oninput = render;
  for (const k of [8, 16, 32]) $(`.bt-${k}`).onclick = () => { $(".bt-n").value = k; render(); };
  render();
}

const UNITS = [["B", 0], ["KB", 1], ["MB", 2], ["GB", 3], ["TB", 4]];

function demoUnits(el) {
  el.innerHTML = `<div class="controls" style="margin-top:0">
      ${presetSelect("un-pre", [["1|4|1000", "a \"1 TB\" disk (10¹² B)"], ["3|1|1024", "a 3 KB file"], ["64|3|1024", "64 GB of storage"], ["2|4|1000", "a \"2 TB\" disk"]])}
      <label>amount <input type="number" class="un-v" value="1" min="0" step="any" style="width:90px"></label>
      <label><select class="un-u">${UNITS.map(([u], k) => `<option value="${k}" ${k === 4 ? "selected" : ""}>${u}</option>`).join("")}</select></label>
      <label><select class="un-c"><option value="1000" selected>counted in 1000s (disk label)</option><option value="1024">counted in 1024s</option></select></label></div>
    <div class="un-out"></div>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    const v = +$(".un-v").value, u = +$(".un-u").value, c = +$(".un-c").value;
    if (!(v >= 0) || v > 1e6) { $(".un-out").innerHTML = `<div class="msg bad">Type an amount from 0 to 1,000,000.</div>`; return; }
    const bytes = v * c ** u;
    const iec = ["B", "KiB", "MiB", "GiB", "TiB"], si = ["B", "kB", "MB", "GB", "TB"];
    const rows = UNITS.map(([, p], k) => `<tr><th>${k ? iec[k] + " (2<sup>" + 10 * p + "</sup> B)" : "bytes"}</th><td>${fmt(bytes / 1024 ** p)}</td><td>${k ? si[k] + " (10<sup>" + 3 * p + "</sup> B)" : "bits"}</td><td>${k ? fmt(bytes / 1000 ** p) : fmt(bytes * 8)}</td></tr>`).join("");
    $(".un-out").innerHTML = `<div class="l1-scroll"><table class="l1-mem" style="margin-top:12px"><tr><th>powers of 1024 (slides, Windows)</th><th></th><th>powers of 1000 (disk makers)</th><th></th></tr>${rows}</table></div>
      <p class="hint">${fmt(v)} ${UNITS[u][0]} counted in ${c}s is <b>${fmt(bytes)}</b> bytes${u ? ` = ${fmt(bytes / 1024 ** u)} ${iec[u]}` : ""}.</p>`;
  }
  $(".un-pre").onchange = (e) => { const [v, u, c] = e.target.value.split("|"); $(".un-v").value = v; $(".un-u").value = u; $(".un-c").value = c; render(); };
  for (const q of [".un-v", ".un-u", ".un-c"]) $(q).oninput = render;
  render();
}

function buildMemory(text) {
  const chars = [...text];
  if (!chars.length) return [{ err: true, msg: "Type some text.", cls: "bad" }];
  if (chars.length > 12) return [{ err: true, msg: "Please use at most 12 characters.", cls: "bad" }];
  const enc = new TextEncoder();
  const rows = [];
  chars.forEach((ch) => {
    const bytes = [...enc.encode(ch)];
    bytes.forEach((b, j) => rows.push({ ch, b, j, of: bytes.length }));
  });
  const snaps = [{ rows, k: -1, msg: `<code>"${esc(text)}"</code> has ${chars.length} character${chars.length > 1 ? "s" : ""}. Encode it with UTF-8 and store the bytes from address 2000 on.` }];
  rows.forEach((r, k) => {
    const what = r.of === 1 ? `the character <code>${esc(r.ch)}</code> is the number ${r.b}` : `byte ${r.j + 1} of ${r.of} for <code>${esc(r.ch)}</code>`;
    snaps.push({ rows, k, msg: `Address ${2000 + k}: ${what}, stored as <code>${r.b.toString(2).padStart(8, "0")}</code>.` });
  });
  snaps.push({ rows, k: rows.length, cls: rows.length === chars.length ? "good" : "", msg: `<code>len(text)</code> is ${chars.length} (characters); <code>len(text.encode())</code> is <b>${rows.length}</b> (bytes).${rows.length > chars.length ? " Not every character is one byte." : ""}` });
  return snaps;
}

function demoMemory(el, { mini = false } = {}) {
  let text = "Crew";
  makePlayer(el, {
    mini,
    interval: mini ? 1000 : 900,
    extraControls: `${presetSelect("me-pre", [["Crew", "Crew"], ["AI 101", "AI 101"], ["人工智能", "人工智能"], ["Hi 🙂", "Hi 🙂"]])}<label>text <input type="text" class="me-t" value="Crew" style="width:120px"></label>`,
    build: () => buildMemory(text),
    view: (s) => {
      if (s.err) return `<div class="l1-expr">—</div>`;
      const rows = s.rows.map((r, k) => `<tr class="${k === s.k ? "on" : k < s.k ? "" : "done"}"><td>${2000 + k}</td><td>${k <= s.k ? r.b.toString(2).padStart(8, "0") : "········"}</td>${mini ? "" : `<td>${k <= s.k ? r.b : ""}</td>`}<td>${k <= s.k ? (r.of === 1 ? `'${esc(r.ch)}'` : `${esc(r.ch)} (${r.j + 1}/${r.of})`) : ""}</td></tr>`).join("");
      return `<div class="l1-scroll"><table class="l1-mem"><tr><th>address</th><th>content</th>${mini ? "" : "<th>number</th>"}<th>meaning</th></tr>${rows}</table></div>`;
    },
    onMount(root, rebuild) {
      if (mini) return;
      const $ = (q) => root.querySelector(q);
      $(".me-pre").onchange = (e) => { text = e.target.value; $(".me-t").value = text; rebuild(); };
      $(".me-t").onchange = (e) => { text = e.target.value; rebuild(); };
    },
  });
}

// ---------- quiz (same widget as L06) ----------

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
  bigPicture: (el) => demoBigPicture(el),
  bigPictureMini: (el) => demoBigPicture(el, { mini: true }),
  machine: (el) => demoMachine(el),
  machineMini: (el) => demoMachine(el, { mini: true }),
  ladder: (el) => demoLadder(el),
  ladderMini: (el) => demoLadder(el, { mini: true }),
  counter: (el) => demoCounter(el),
  counterMini: (el) => demoCounter(el, { mini: true }),
  toDecimal: (el) => demoToDecimal(el),
  toDecimalMini: (el) => demoToDecimal(el, { mini: true }),
  division: (el) => demoDivision(el),
  divisionMini: (el) => demoDivision(el, { mini: true }),
  fraction: (el) => demoFraction(el),
  grouping: (el) => demoGrouping(el),
  groupingMini: (el) => demoGrouping(el, { mini: true }),
  converter: (el) => demoConverter(el),
  bits: (el) => demoBits(el),
  units: (el) => demoUnits(el),
  memory: (el) => demoMemory(el),
  memoryMini: (el) => demoMemory(el, { mini: true }),
  quiz: (el) => demoQuiz(el, QUIZ),
};
